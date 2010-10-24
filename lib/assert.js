if (typeof buster == "undefined") {
    var buster = {};
}

(function () {
    var slice = Array.prototype.slice;

    function F() {}
    F.prototype = Error.prototype;

    function prepareArgs(args, num) {
        var processed = slice.call(args);

        if (args.length == num + 1) {
            processed[0] += ": ";
            return processed;
        }

        processed.unshift("");
        return processed;
    }

    function format(obj) {
        return typeof obj == "object" ? "{}" : obj;
    }

    function AssertionError(opt) {
        this.message = opt && opt.message;
    }

    AssertionError.prototype = new F();
    AssertionError.prototype.type = "AssertionError";

    buster.assert = function (message, value) {
        upCount();
        var args = prepareArgs(arguments, 1);

        if (!args[1]) {
            buster.assert.fail(args[0] + "Expected truthy value but was false");
        }
    };

    buster.assert.count = 0;

    function upCount() {
        if (typeof buster.assert.count != "number") {
            buster.assert.count = 0;
        }

        buster.assert.count += 1;
    }

    buster.assert.fail = function (message) {
        throw new AssertionError({ message: message });
    };

    buster.assert.isTrue = function (message, value) {
        upCount();
        var args = prepareArgs(arguments, 1);

        if (args[1] !== true) {
            buster.assert.fail(args[0] + "Expected true but was " + format(args[1]));
        }
    };

    buster.assert.isFalse = function (message, value) {
        upCount();
        var args = prepareArgs(arguments, 1);

        if (args[1] !== false) {
            buster.assert.fail(args[0] + "Expected false but was " + format(args[1]));
        }
    };

    buster.assert.same = function (message, obj1, obj2) {
        upCount();
        var args = prepareArgs(arguments, 2);

        if (args[1] !== args[2]) {
            buster.assert.fail(args[0] + "Expected " + format(args[1]) +
                               " to be the same object as " + format(args[2]));
        }
    };

    buster.assert.notSame = function (message, obj1, obj2) {
        upCount();
        var args = prepareArgs(arguments, 2);

        if (args[1] === args[2]) {
            buster.assert.fail(args[0] + "Expected " + format(args[1]) +
                               " not to be the same object as " + format(args[2]));
        }
    };

    function keys(object) {
        var okeys = [];

        for (var prop in object) {
            if (Object.prototype.hasOwnProperty.call(object, prop)) {
                okeys.push(prop);
            }
        }

        return okeys;
    }

    function areEqual(expected, actual) {
        if (expected === actual) {
            return true;
        }

        if (expected instanceof Date && actual instanceof Date) {
            return expected.getTime() == actual.getTime();
        }

        var useCoercingEquality = typeof expected != "object";

        if (expected instanceof RegExp && actual instanceof RegExp) {
            if (expected.toString() != actual.toString()) {
                return false;
            }

            useCoercingEquality = false;
        }

        if (useCoercingEquality) {
            return expected == actual;
        }

        var expectedKeys = keys(expected);
        var actualKeys = keys(actual);

        if (expectedKeys.length != actualKeys.length) {
            return false;
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

    buster.assert.equals = function (message, obj1, obj2) {
        upCount();
        var args = prepareArgs(arguments, 2);

        if (!areEqual(args[1], args[2])) {
            buster.assert.fail();
        }
    };

    buster.assert.AssertionError = AssertionError;

    if (typeof module != "undefined") {
        module.exports = buster.assert;
    }
}());
