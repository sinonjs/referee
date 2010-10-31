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

    function format(assertion, msg, text) {
        var prefix = "[assert." + assertion + "] ";

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
            assert.fail(format(
                "isTrue", args[0],
                "Expected " + assert.format(args[1]) + " to be true"
            ));
        }
    };

    buster.assert.isFalse = function (message, value) {
        var args = prepareAssertion(arguments, 1);

        if (args[1] !== false) {
            assert.fail(format(
                "isFalse", args[0],
                "Expected " + assert.format(args[1]) + " to be false"
            ));
        }
    };

    buster.assert.same = function (message, obj1, obj2) {
        var args = prepareAssertion(arguments, 2);

        if (args[1] !== args[2]) {
            assert.fail(format(
                "same", args[0],
                "Expected " + assert.format(args[1]) +
                    " to be the same object as " + assert.format(args[2])
            ));
        }
    };

    buster.assert.notSame = function (message, obj1, obj2) {
        var args = prepareAssertion(arguments, 2);

        if (args[1] === args[2]) {
            assert.fail(format(
                "notSame", args[0],
                "Expected " + assert.format(args[1]) +
                    " not to be the same object as " + assert.format(args[2])
            ));
        }
    };

    buster.assert.equals = function (message, obj1, obj2) {
        var args = prepareAssertion(arguments, 2);

        if (!areEqual(args[1], args[2])) {
            assert.fail(format(
                "equals", args[0],
                "Expected " + assert.format(args[1]) +
                    " to be equal to " + assert.format(args[2])
            ));
        }
    };

    buster.assert.notEquals = function (message, obj1, obj2) {
        var args = prepareAssertion(arguments, 2);

        if (areEqual(args[1], args[2])) {
            assert.fail(format(
                "notEquals", args[0],
                "Expected " + assert.format(args[1]) +
                    " not to be equal to " + assert.format(args[2])
            ));
        }
    };

    buster.assert.typeOf = function (message, expected, object) {
        var args = prepareAssertion(arguments, 2);

        if (typeof args[2] != args[1]) {
            assert.fail(format(
                "typeOf", args[0],
                "Expected typeof " + assert.format(args[2]) + " (" +
                    (typeof args[2]) + ") to be " + assert.format(args[1])
            ));
        }
    };

    buster.assert.notTypeOf = function (message, expected, object) {
        var args = prepareAssertion(arguments, 2);

        if (typeof args[2] == args[1]) {
            assert.fail(format(
                "notTypeOf", args[0],
                "Expected typeof " + assert.format(args[2]) + " not to be " +
                    assert.format(args[1])
            ));
        }
    };

    buster.assert.isString = function (message, actual) {
        var args = prepareAssertion(arguments, 1);

        if (typeof args[1] != "string") {
            assert.fail(format(
                "isString", args[0],
                "Expected typeof " + assert.format(args[1]) + " (" +
                    (typeof args[1]) + ") to be string"
            ));
        }
    };

    buster.assert.isObject = function (message, actual) {
        var args = prepareAssertion(arguments, 1);

        if (typeof args[1] != "object" || !args[1]) {
            assert.fail(format(
                "isObject", args[0],
                "Expected typeof " + assert.format(args[1]) + " (" +
                    (typeof args[1]) + ") to be object and not null"
            ));
        }
    };

    buster.assert.isFunction = function (message, actual) {
        var args = prepareAssertion(arguments, 1);

        if (typeof args[1] != "function") {
            assert.fail(format(
                "isFunction", args[0],
                "Expected typeof " + assert.format(args[1]) + " (" +
                    (typeof args[1]) + ") to be function"
            ));
        }
    };

    buster.assert.isBoolean = function (message, actual) {
        var args = prepareAssertion(arguments, 1);

        if (typeof args[1] != "boolean") {
            assert.fail(format(
                "isBoolean", args[0],
                "Expected typeof " + assert.format(args[1]) + " (" +
                    (typeof args[1]) + ") to be boolean"
            ));
        }
    };

    buster.assert.isNumber = function (message, actual) {
        var args = prepareAssertion(arguments, 1);

        if (typeof args[1] != "number") {
            assert.fail(format(
                "isNumber", args[0],
                "Expected typeof " + assert.format(args[1]) + " (" +
                    (typeof args[1]) + ") to be number"
            ));
        }
    };

    buster.assert.isNaN = function (message, actual) {
        var args = prepareAssertion(arguments, 1);

        if (!isNaN(args[1])) {
            assert.fail(format(
                "isNaN", args[0],
                "Expected " + assert.format(args[1]) + " to be NaN"
            ));
        }
    };

    buster.assert.isNotNaN = function (message, actual) {
        var args = prepareAssertion(arguments, 1);

        if (isNaN(args[1])) {
            assert.fail(format(
                "isNotNaN", args[0],
                "Expected not to be NaN"
            ));
        }
    };

    buster.assert.isUndefined = function (message, actual) {
        var args = prepareAssertion(arguments, 1);

        if (typeof args[1] != "undefined") {
            assert.fail(format(
                "isUndefined", args[0],
                "Expected typeof " + assert.format(args[1]) + " (" +
                    (typeof args[1]) + ") to be undefined"
            ));
        }
    };

    buster.assert.isNull = function (message, actual) {
        var args = prepareAssertion(arguments, 1);

        if (args[1] !== null) {
            assert.fail(format(
                "isNull", args[0],
                "Expected " + assert.format(args[1]) + " to be null"
            ));
        }
    };

    buster.assert.isNotUndefined = function (message, actual) {
        var args = prepareAssertion(arguments, 1);

        if (typeof args[1] == "undefined") {
            assert.fail(format(
                "isNotUndefined", args[0],
                "Expected not to be undefined"
            ));
        }
    };

    buster.assert.isNotNull = function (message, actual) {
        var args = prepareAssertion(arguments, 1);

        if (args[1] === null) {
            assert.fail(format(
                "isNotNull", args[0],
                "Expected not to be null"
            ));
        }
    };

    function checkRegExp(assertion, regexp) {
        if (!regexp || typeof regexp.test != "function") {
            assert.fail(format(
                assertion, "",
                "Matcher (" + assert.format(regexp) + ") was not a string, " +
                    "function or an object"
            ));
        }
    }

    function match(object, matcher) {
        if (matcher && typeof matcher.test == "function") {
            return matcher.test(object);
        }

        if (typeof matcher == "function") {
            return matcher(object) === true;
        }

        if (typeof matcher == "string") {
            matcher = matcher.toLowerCase();
            return !!object && ("" + object).toLowerCase().indexOf(matcher) >= 0;
        }

        if (typeof matcher == "number") {
            return matcher == object;
        }

        if (matcher && typeof matcher == "object") {
            for (var prop in matcher) {
                if (!match(object[prop], matcher[prop])) {
                    return false;
                }
            }

            return true;
        }

        throw new Error("Matcher (" + assert.format(matcher) + ") was not a " +
                        "string, a number, a function or an object");
    }

    buster.assert.match = function (message, pattern, actual) {
        var args = prepareAssertion(arguments, 2), passed;

        try {
            passed = match(args[2], args[1]);
        } catch (e) {
            assert.fail(format("match", "", e.message));
        }

        if (!passed) {
            assert.fail(format(
                "match", args[0],
                "Expected " + assert.format(args[2]) + " to match " +
                    assert.format(args[1])
            ));
        }
    };

    buster.assert.noMatch = function (message, pattern, actual) {
        var args = prepareAssertion(arguments, 2), passed;

        try {
            passed = match(args[2], args[1]);
        } catch (e) {
            assert.fail(format("noMatch", "", e.message));
        }

        if (passed) {
            assert.fail(format(
                "noMatch", args[0],
                "Expected " + assert.format(args[2]) + " not to match " +
                    assert.format(args[1])
            ));
        }
    };

    if (typeof module != "undefined") {
        module.exports = buster.assert;
    }
}());
