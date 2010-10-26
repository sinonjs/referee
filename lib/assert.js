if (typeof buster == "undefined") {
    var buster = {};
}

if (typeof require == "function") {
    buster.util = require("buster-util");
}

(function () {
    var slice = Array.prototype.slice;

    function prepareArgs(args, num) {
        var processed = slice.call(args);

        if (args.length < num) {
            assert.fail("Expected to receive at least " + num + " argument");
        }

        if (args.length == num + 1) {
            processed[0] += !/[\?\!\.\:\;\,]$/.test(processed[0]) ? ":" : "";
            processed[0] += " ";
            return processed;
        }

        processed.unshift("");
        return processed;
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
                expectedKeys.length != actualKeys.length ||
                expected.constructor != actual.constructor) {
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

    var assert = buster.assert = function (message, value) {
        if (typeof buster.assert.count != "number") {
            buster.assert.count = 0;
        }

        buster.assert.count += 1;
        var args = prepareArgs(arguments, 1);

        if (!args[1]) {
            buster.assert.fail(
                args[0].replace(/: $/, "") ||
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
        var args = prepareArgs(arguments, 1);
        assert("[assert.isTrue] " + args[0] + "Expected " + assert.format(args[1]) +
               " to be true", args[1] === true);
    };

    buster.assert.isFalse = function (message, value) {
        var args = prepareArgs(arguments, 1);
        assert("[assert.isFalse] " + args[0] + "Expected " +
               assert.format(args[1]) + " to be false", args[1] === false);
    };

    buster.assert.same = function (message, obj1, obj2) {
        var args = prepareArgs(arguments, 2);
        assert("[assert.same] " + args[0] + "Expected " + assert.format(args[1]) +
               " to be the same object as " + assert.format(args[2]),
               args[1] === args[2]);
    };

    buster.assert.notSame = function (message, obj1, obj2) {
        var args = prepareArgs(arguments, 2);
        assert("[assert.notSame] " + args[0] + "Expected " + assert.format(args[1]) +
               " not to be the same object as " + assert.format(args[2]),
               args[1] !== args[2]);
    };

    buster.assert.equals = function (message, obj1, obj2) {
        var args = prepareArgs(arguments, 2);
        assert("[assert.equals] " + args[0] + "Expected " + assert.format(args[1]) +
               " to be equal to " + assert.format(args[2]),
               areEqual(args[1], args[2]));
    };

    buster.assert.notEquals = function (message, obj1, obj2) {
        var args = prepareArgs(arguments, 2);
        assert("[assert.notEquals] " + args[0] + "Expected " +
               assert.format(args[1]) + " not to be equal to " +
               assert.format(args[2]), !areEqual(args[1], args[2]));
    };

    if (typeof module != "undefined") {
        module.exports = buster.assert;
    }
}());
