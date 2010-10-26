/*jslint eqeqeq: false, onevar: false, plusplus: false*/
/*global buster, require, module*/
if (typeof buster == "undefined") {
    var buster = {};
}

if (typeof require == "function") {
    buster.util = require("buster-util");
}

(function () {
    var slice = Array.prototype.slice;
    var toString = Object.prototype.toString;
    var assert;

    function prepareAssertion(args, num) {
        if (typeof buster.assert.count != "number") {
            buster.assert.count = 0;
        }

        buster.assert.count += 1;
        var processed = slice.call(args);

        if (args.length < num) {
            assert.fail("Expected to receive at least " + num + " argument");
        }

        if (args.length == num + 1) {
            return processed;
        }

        processed.unshift("");
        return processed;
    }

    function format(msgArray) {
        var prefix = "[assert." + msgArray[0] + "] ";
        var msg = msgArray[1];
        var text = msgArray[2];

        if (msg) {
            msg += !/[\?\!\.\:\;\,]$/.test(msg) ? ": " : " ";
        }

        return prefix + msg + text;
    }

    function areEqual(expected, actual) {
        if (expected === actual) {
            return true;
        }

        // Elements are only equal if expected === actual
        if (buster.util.isElement(expected) || buster.util.isElement(actual)) {
            return false;
        }

        // null and undefined only pass for null === null and
        // undefined === undefined
        if (expected == null || actual == null) {
            return actual === expected;
        }

        if (expected instanceof Date || actual instanceof Date) {
            return expected instanceof Date && actual instanceof Date &&
                expected.getTime() == actual.getTime();
        }

        var useCoercingEquality = typeof expected != "object" || typeof actual != "object";

        if (expected instanceof RegExp && actual instanceof RegExp) {
            if (expected.toString() != actual.toString()) {
                return false;
            }

            useCoercingEquality = false;
        }

        // Coerce and compare when primitives are involved
        if (useCoercingEquality) {
            return expected == actual;
        }

        var expectedKeys = buster.util.keys(expected);
        var actualKeys = buster.util.keys(actual);

        if (buster.util.isArguments(expected) || buster.util.isArguments(actual)) {
            if (expected.length != actual.length) {
                return false;
            }
        } else {
            if (typeof expected != typeof actual ||
                toString.call(expected) != toString.call(actual) ||
                expectedKeys.length != actualKeys.length) {
                return false;
            }
        }

        var key;

        for (var i = 0, l = expectedKeys.length; i < l; i++) {
            key = expectedKeys[i];

            if (!Object.prototype.hasOwnProperty.call(actual, key) ||
                !areEqual(expected[key], actual[key])) {
                return false;
            }
        }

        return true;
    }

    assert = buster.assert = function (message, value) {
        var args = prepareAssertion(arguments, 1);

        if (!args[1]) {
            buster.assert.fail(
                args[0] ||
                "[assert] Expected " + assert.format(args[1]) + " to be truthy"
            );
        }
    };

    function AssertionError(opt) {
        this.message = opt && opt.message;
    }

    AssertionError.prototype = buster.util.create(Error.prototype);
    AssertionError.prototype.type = "AssertionError";
    buster.assert.AssertionError = AssertionError;

    buster.assert.count = 0;

    buster.assert.fail = function (message) {
        throw new AssertionError({ message: message });
    };

    buster.assert.format = function (object) {
        return object;
    };

    buster.assert.isTrue = function (message, value) {
        var args = prepareAssertion(arguments, 1);

        if (args[1] !== true) {
            assert.fail(format([
                "isTrue", args[0],
                "Expected " + assert.format(args[1]) + " to be true"
            ]));
        }
    };

    buster.assert.isFalse = function (message, value) {
        var args = prepareAssertion(arguments, 1);

        if (args[1] !== false) {
            assert.fail(format([
                "isFalse", args[0],
                "Expected " + assert.format(args[1]) + " to be false"
            ]));
        }
    };

    buster.assert.same = function (message, obj1, obj2) {
        var args = prepareAssertion(arguments, 2);

        if (args[1] !== args[2]) {
            assert.fail(format([
                "same", args[0],
                "Expected " + assert.format(args[1]) +
                    " to be the same object as " + assert.format(args[2])
            ]));
        }
    };

    buster.assert.notSame = function (message, obj1, obj2) {
        var args = prepareAssertion(arguments, 2);

        if (args[1] === args[2]) {
            assert.fail(format([
                "notSame", args[0],
                "Expected " + assert.format(args[1]) +
                    " not to be the same object as " + assert.format(args[2])
            ]));
        }
    };

    buster.assert.equals = function (message, obj1, obj2) {
        var args = prepareAssertion(arguments, 2);

        if (!areEqual(args[1], args[2])) {
            assert.fail(format([
                "equals", args[0],
                "Expected " + assert.format(args[1]) +
                    " to be equal to " + assert.format(args[2])
            ]));
        }
    };

    buster.assert.notEquals = function (message, obj1, obj2) {
        var args = prepareAssertion(arguments, 2);

        if (areEqual(args[1], args[2])) {
            assert.fail(format([
                "notEquals", args[0],
                "Expected " + assert.format(args[1]) +
                    " not to be equal to " + assert.format(args[2])
            ]));
        }
    };

    buster.assert.typeOf = function (message, expected, object) {
        var args = prepareAssertion(arguments, 2);

        if (typeof args[2] != args[1]) {
            assert.fail(format([
                "typeOf", args[0],
                "Expected typeof " + assert.format(args[2]) + " (" +
                    (typeof args[2]) + ") to be " + assert.format(args[1])
            ]));
        }
    };

    buster.assert.notTypeOf = function (message, expected, object) {
        var args = prepareAssertion(arguments, 2);

        if (typeof args[2] == args[1]) {
            assert.fail(format([
                "notTypeOf", args[0],
                "Expected typeof " + assert.format(args[2]) + " not to be " +
                    assert.format(args[1])
            ]));
        }
    };

    buster.assert.isString = function (message, actual) {
        var args = prepareAssertion(arguments, 1);

        if (typeof args[1] != "string") {
            assert.fail(format([
                "isString", args[0],
                "Expected typeof " + assert.format(args[1]) + " (" +
                    (typeof args[1]) + ") to be string"
            ]));
        }
    };

    buster.assert.isObject = function (message, actual) {
        var args = prepareAssertion(arguments, 1);

        if (typeof args[1] != "object" || !args[1]) {
            assert.fail(format([
                "isObject", args[0],
                "Expected typeof " + assert.format(args[1]) + " (" +
                    (typeof args[1]) + ") to be object and not null"
            ]));
        }
    };

    if (typeof module != "undefined") {
        module.exports = buster.assert;
    }
}());
