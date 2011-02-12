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

    function indexOf(arr, item) {
        for (var i = 0, l = arr.length; i < l; i++) {
            if (arr[i] == item) {
                return i;
            }
        }

        return -1;
    }

    function prepareAssertion(name, args, num) {
        if (typeof assert.count != "number") {
            assert.count = 0;
        }

        assert.count += 1;
        var processed = slice.call(args);

        if (args.length < num) {
            assert.fail("[" + name + "] Expected to receive at least " +
                        num + " argument" + (num > 1 ? "s" : ""));
        }

        if (args.length >= num + 1) {
            if (typeof processed[0] == "string") {
                processed[0] += !/[\?\!\.\:\;\,]$/.test(processed[0]) ? ": " : " ";
            }

            return processed;
        }

        processed.unshift("");
        return processed;
    }

    function fail(assertion, msg) {
        msg = assert[assertion][msg];

        for (var i = 2, l = arguments.length; i < l; i++) {
            if (i == 2) {
                msg = msg.replace("${" + (i-2) + "}", arguments[i]);
            } else {
                msg = msg.replace("${" + (i-2) + "}", assert.format(arguments[i]));
            }
        }

        assert.fail("[assert." + assertion + "] " + msg);
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
        /*jsl: ignore*/
        if (expected == null || actual == null) {
            return actual === expected;
        }
        /*jsl: end*/

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

    assert = buster.assert = function (/*message, value*/) {
        var args = prepareAssertion("assert", arguments, 1);

        if (!args[1]) {
            assert.fail(
                arguments.length > 1 && arguments[0] ||
                "[assert] Expected " + assert.format(args[1]) + " to be truthy"
            );
        }

        assert.pass("assert", arguments.length > 1 ? args[0] : "", arguments.length > 1 ? args[1] : args[0]);
    };

    assert.msgFail = "[assert] Expected ${1} to be thruthy";
    assert.count = 0;

    assert.fail = function (message) {
        var exception = new Error(message);
        exception.name = "AssertionError";
        throw exception;
    };

    assert.pass = function () {};

    assert.format = function (object) {
        return object;
    };

    assert.isTrue = function (/*message, value*/) {
        var args = prepareAssertion("assert.isTrue", arguments, 1);

        if (args[1] !== true) {
            fail("isTrue", "msgFail", args[0], args[1]);
        }

        assert.pass("isTrue", args[0], args[1]);
    };

    assert.isTrue.msgFail = "${0}Expected ${1} to be true";

    assert.isFalse = function (/*message, value*/) {
        var args = prepareAssertion("assert.isFalse", arguments, 1);

        if (args[1] !== false) {
            fail("isFalse", "msgFail", args[0], args[1]);
        }

        assert.pass("isFalse", args[0], args[1]);
    };

    assert.isFalse.msgFail = "${0}Expected ${1} to be false";

    assert.same = function (/*message, obj1, obj2*/) {
        var args = prepareAssertion("assert.same", arguments, 2);

        if (args[1] !== args[2]) {
            fail("same", "msgFail", args[0], args[1], args[2]);
        }

        assert.pass("same", args[0], args[1], args[2]);
    };

    assert.same.msgFail = "${0}Expected ${1} to be the same object as ${2}";

    assert.notSame = function (/*message, obj1, obj2*/) {
        var args = prepareAssertion("assert.notSame", arguments, 2);

        if (args[1] === args[2]) {
            fail("notSame", "msgFail", args[0], args[1], args[2]);
        }

        assert.pass("notSame", args[0], args[1], args[2]);
    };

    assert.notSame.msgFail = "${0}Expected ${1} not to be the same object as ${2}";

    assert.equals = function (/*message, obj1, obj2*/) {
        var args = prepareAssertion("assert.equals", arguments, 2);

        if (!areEqual(args[1], args[2])) {
            fail("equals", "msgFail", args[0], args[1], args[2]);
        }

        assert.pass("equals", args[0], args[1], args[2]);
    };

    assert.equals.msgFail = "${0}Expected ${1} to be equal to ${2}";

    assert.notEquals = function (/*message, obj1, obj2*/) {
        var args = prepareAssertion("assert.notEquals", arguments, 2);

        if (areEqual(args[1], args[2])) {
            fail("notEquals", "msgFail", args[0], args[1], args[2]);
        }

        assert.pass("notEquals", args[0], args[1], args[2]);
    };

    assert.notEquals.msgFail = "${0}Expected ${1} not to be equal to ${2}";

    assert.typeOf = function (/*message, expected, object*/) {
        var args = prepareAssertion("assert.typeOf", arguments, 2);

        if (typeof args[2] != args[1]) {
            fail("typeOf", "msgFail", args[0], args[1], args[2], typeof args[2]);
        }

        assert.pass("typeOf", args[0], args[1], args[2]);
    };

    assert.typeOf.msgFail = "${0}Expected typeof ${2} (${3}) to be ${1}";

    assert.notTypeOf = function (/*message, expected, object*/) {
        var args = prepareAssertion("assert.notTypeOf", arguments, 2);

        if (typeof args[2] == args[1]) {
            fail("notTypeOf", "msgFail", args[0], args[1], args[2]);
        }

        assert.pass("notTypeOf", args[0], args[1], args[2]);
    };

    assert.notTypeOf.msgFail = "${0}Expected typeof ${2} not to be ${1}";

    assert.isString = function (/*message, actual*/) {
        var args = prepareAssertion("assert.isString", arguments, 1);

        if (typeof args[1] != "string") {
            fail("isString", "msgFail", args[0], args[1], typeof args[1]);
        }

        assert.pass("isString", args[0], args[1]);
    };

    assert.isString.msgFail = "${0}Expected typeof ${1} (${2}) to be string";

    assert.isObject = function (/*message, actual*/) {
        var args = prepareAssertion("assert.isObject", arguments, 1);

        if (typeof args[1] != "object" || !args[1]) {
            fail("isObject", "msgFail", args[0], args[1], typeof args[1]);
        }

        assert.pass("isObject", args[0], args[1]);
    };

    assert.isObject.msgFail = "${0}Expected typeof ${1} (${2}) to be object and not null";

    assert.isFunction = function (/*message, actual*/) {
        var args = prepareAssertion("assert.isFunction", arguments, 1);

        if (typeof args[1] != "function") {
            fail("isFunction", "msgFail", args[0], args[1], typeof args[1]);
        }

        assert.pass("isFunction", args[0], args[1]);
    };

    assert.isFunction.msgFail = "${0}Expected typeof ${1} (${2}) to be function";

    assert.isBoolean = function (/*message, actual*/) {
        var args = prepareAssertion("assert.isBoolean", arguments, 1);

        if (typeof args[1] != "boolean") {
            fail("isBoolean", "msgFail", args[0], args[1], typeof args[1]);
        }

        assert.pass("isBoolean", args[0], args[1]);
    };

    assert.isBoolean.msgFail = "${0}Expected typeof ${1} (${2}) to be boolean";

    assert.isNumber = function (/*message, actual*/) {
        var args = prepareAssertion("assert.isNumber", arguments, 1);

        if (typeof args[1] != "number") {
            fail("isNumber", "msgFail", args[0], args[1], typeof args[1]);
        }

        assert.pass("isNumber", args[0], args[1]);
    };

    assert.isNumber.msgFail = "${0}Expected typeof ${1} (${2}) to be number";

    assert.isUndefined = function (/*message, actual*/) {
        var args = prepareAssertion("assert.isUndefined", arguments, 1);

        if (typeof args[1] != "undefined") {
            fail("isUndefined", "msgFail", args[0], args[1], typeof args[1]);
        }

        assert.pass("isUndefined", args[0], args[1]);
    };

    assert.isUndefined.msgFail = "${0}Expected typeof ${1} (${2}) to be undefined";

    assert.isNotUndefined = function (/*message, actual*/) {
        var args = prepareAssertion("assert.isNotUndefined", arguments, 1);

        if (typeof args[1] == "undefined") {
            fail("isNotUndefined", "msgFail", args[0], args[1]);
        }

        assert.pass("isNotUndefined", args[0], args[1]);
    };

    assert.isNotUndefined.msgFail = "${0}Expected not to be undefined";

    assert.isNull = function (/*message, actual*/) {
        var args = prepareAssertion("assert.isNull", arguments, 1);

        if (args[1] !== null) {
            fail("isNull", "msgFail", args[0], args[1]);
        }

        assert.pass("isNull", args[0], args[1]);
    };

    assert.isNull.msgFail = "${0}Expected ${1} to be null";

    assert.isNotNull = function (/*message, actual*/) {
        var args = prepareAssertion("assert.isNotNull", arguments, 1);

        if (args[1] === null) {
            fail("isNotNull", "msgFail", args[0]);
        }

        assert.pass("isNotNull", args[0], args[1]);
    };

    assert.isNotNull.msgFail = "${0}Expected not to be null";

    assert.isNaN = function (/*message, actual*/) {
        var args = prepareAssertion("assert.isNaN", arguments, 1);

        if (!isNaN(args[1])) {
            fail("isNaN", "msgFail", args[0], args[1]);
        }

        assert.pass("isNaN", args[0], args[1]);
    };

    assert.isNaN.msgFail = "${0}Expected ${1} to be NaN";

    assert.isNotNaN = function (/*message, actual*/) {
        var args = prepareAssertion("assert.isNotNaN", arguments, 1);

        if (isNaN(args[1])) {
            fail("isNotNaN", "msgFail", args[0], args[1]);
        }

        assert.pass("isNotNaN", args[0], args[1]);
    };

    assert.isNotNaN.msgFail = "${0}Expected not to be NaN";

    assert.isArray = function (/*message, actual*/) {
        var args = prepareAssertion("assert.isArray", arguments, 1);

        if (toString.call(args[1]) != "[object Array]") {
            fail("isArray", "msgFail", args[0], args[1]);
        }

        assert.pass("isArray", args[0], args[1]);
    };

    assert.isArray.msgFail = "${0}Expected ${1} to be array";

    assert.isNotArray = function (/*message, actual*/) {
        var args = prepareAssertion("assert.isNotArray", arguments, 1);

        if (toString.call(args[1]) == "[object Array]") {
            fail("isNotArray", "msgFail", args[0], args[1]);
        }

        assert.pass("isNotArray", args[0], args[1]);
    };

    assert.isNotArray.msgFail = "${0}Expected ${1} not to be array";

    function isArrayLike(object) {
        return toString.call(object) == "[object Array]" ||
            (!!object && typeof object.length == "number" &&
            typeof object.splice == "function") ||
            buster.util.isArguments(object);
    }

    assert.isArrayLike = function (/*message, actual*/) {
        var args = prepareAssertion("assert.isArrayLike", arguments, 1);

        if (!isArrayLike(args[1])) {
            fail("isArrayLike", "msgFail", args[0], args[1]);
        }

        assert.pass("isArrayLike", args[0], args[1]);
    };

    assert.isArrayLike.msgFail = "${0}Expected ${1} to be array like";

    assert.isNotArrayLike = function (/*message, actual*/) {
        var args = prepareAssertion("assert.isNotArrayLike", arguments, 1);

        if (isArrayLike(args[1])) {
            fail("isNotArrayLike", "msgFail", args[0], args[1]);
        }

        assert.pass("isNotArrayLike", args[0], args[1]);
    };

    assert.isNotArrayLike.msgFail = "${0}Expected ${1} not to be array like";

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

    assert.match = function (/*message, pattern, actual*/) {
        var args = prepareAssertion("assert.match", arguments, 2), passed;

        try {
            passed = match(args[2], args[1]);
        } catch (e) {
            fail("match", "msgException", args[0], e.message);
        }

        if (!passed) {
            fail("match", "msgFail", args[0], args[1], args[2]);
        }

        assert.pass("match", args[0], args[1], args[2]);
    };

    assert.match.msgException = "${0}${1}";
    assert.match.msgFail = "${0}Expected ${2} to match ${1}";

    assert.noMatch = function (/*message, pattern, actual*/) {
        var args = prepareAssertion("assert.noMatch", arguments, 2), passed;

        try {
            passed = match(args[2], args[1]);
        } catch (e) {
            fail("noMatch", "msgException", args[0], e.message);
        }

        if (passed) {
            fail("noMatch", "msgFail", args[0], args[1], args[2]);
        }

        assert.pass("noMatch", args[0], args[1], args[2]);
    };

    assert.noMatch.msgException = "${0}${1}";
    assert.noMatch.msgFail = "${0}Expected ${2} not to match ${1}";

    function captureException(callback) {
        try {
            callback();
        } catch (e) {
            return e;
        }

        return null;
    }

    assert.exception = function (/*message, callback, type*/) {
        var args = prepareAssertion("assert.exception", arguments, 1);

        if (typeof args[0] != "string") {
            args.unshift("");
        }

        var err = captureException(args[1]);

        if (!err) {
            if (args[2]) {
                fail("exception", "msgTypeNoException", args[0], args[2]);
            } else {
                fail("exception", "msgFail", args[0], args[2]);
            }
        }

        if (args[2] && err.name != args[2]) {
            fail("exception", "msgTypeFail", args[0], args[2], err.name);
        }

        assert.pass("exception", args[0], args[1], args[2]);
    };

    assert.exception.msgTypeNoException = "${0}Expected ${1} but no exception was thrown";
    assert.exception.msgFail = "${0}Expected exception";
    assert.exception.msgTypeFail = "${0}Expected ${1} but threw ${2}";

    assert.noException = function (/*message, callback*/) {
        var args = prepareAssertion("assert.noException", arguments, 1);
        var err = captureException(args[1]);

        if (err) {
            fail("noException", "msgFail", args[0], err.name);
        }

        assert.pass("noException", args[0], args[1]);
    };

    assert.noException.msgFail = "${0}Expected not to throw but threw ${1}";

    assert.tagName = function (/*message, tagName, object*/) {
        var args = prepareAssertion("assert.tagName", arguments, 2);

        if (!args[2].tagName) {
            fail("tagName", "msgNoTagName", args[0], args[1], args[2]);
        }

        if (!args[1].toLowerCase ||
            args[1].toLowerCase() != args[2].tagName.toLowerCase()) {
            fail("tagName", "msgFail", args[0], args[1], args[2].tagName);
        }

        assert.pass("tagName", args[0], args[1], args[2]);
    };

    assert.tagName.msgNoTagName = "${0}Expected ${2} to have tagName property";
    assert.tagName.msgFail = "${0}Expected tagName to be ${1} but was ${2}";

    assert.notTagName = function (/*message, tagName, object*/) {
        var args = prepareAssertion("assert.notTagName", arguments, 2);

        if (!args[2].tagName) {
            fail("notTagName", "msgNoTagName", args[0], args[1], args[2]);
        }

        if (args[1].toLowerCase &&
            args[1].toLowerCase() == args[2].tagName.toLowerCase()) {
            fail("notTagName", "msgFail", args[0], args[1]);
        }

        assert.pass("notTagName", args[0], args[1], args[2]);
    };

    assert.notTagName.msgNoTagName = "${0}Expected ${2} to have tagName property";
    assert.notTagName.msgFail = "${0}Expected tagName not to be ${1}";

    assert.className = function (/*message, classNames, object*/) {
        var args = prepareAssertion("assert.className", arguments, 2);

        if (typeof args[2].className == "undefined") {
            fail("className", "msgNoClassName", args[0], args[1], args[2]);
        }

        var expected = typeof args[1] == "string" ? args[1].split(" ") : args[1];
        var actual = args[2].className.split(" ");

        for (var i = 0, l = expected.length; i < l; i++) {
            if (indexOf(actual, expected[i]) < 0) {
                fail("className", "msgFail", args[0], args[1], args[2].className);
            }
        }

        assert.pass("className", args[0], args[1], args[2]);
    };

    assert.className.msgNoClassName = "${0}Expected object to have className property";
    assert.className.msgFail = "${0}Expected object's className to include ${1} but was ${2}";

    assert.notClassName = function (/*message, classNames, object*/) {
        var args = prepareAssertion("assert.notClassName", arguments, 2);

        if (typeof args[2].className == "undefined") {
            fail("notClassName", "msgNoClassName", args[0], args[1], args[2]);
        }

        var expected = typeof args[1] == "string" ? args[1].split(" ") : args[1];
        var actual = args[2].className.split(" ");

        for (var i = 0, l = expected.length; i < l; i++) {
            if (indexOf(actual, expected[i]) < 0) {
                return assert.pass("notClassName", args[0], args[1], args[2]);;
            }
        }

        fail("notClassName", "msgFail", args[0], args[1], args[2].className);
    };

    assert.notClassName.msgNoClassName = "${0}Expected object to have className property";
    assert.notClassName.msgFail = "${0}Expected object's className not to include ${1}";

    if (typeof module != "undefined") {
        module.exports = buster.assert;
    }
}());
