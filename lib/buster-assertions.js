/*jslint eqeqeq: false, onevar: false, plusplus: false*/
/*global buster, require, module*/
(function () {
    var isCommonJS = typeof require == "function" && typeof module == "object";
    if (isCommonJS) var buster = require("buster-core");

    var toString = Object.prototype.toString;
    var assert, refute;

    function indexOf(arr, item) {
        for (var i = 0, l = arr.length; i < l; i++) {
            if (arr[i] == item) {
                return i;
            }
        }

        return -1;
    }

    function isArguments(obj) {
        if (typeof obj != "object" || typeof obj.length != "number" ||
            toString.call(obj) == "[object Array]") {
            return false;
        }

        if (typeof obj.callee == "function") {
            return true;
        }

        try {
            obj[obj.length] = 6;
            delete obj[obj.length];
        } catch (e) {
            return true;
        }

        return false;
    }

    var ba = buster.assertions = buster.eventEmitter.create();
    ba.isArguments = isArguments;

    if (Object.keys) {
        ba.keys = function (obj) {
            return Object.keys(obj)
        };
    } else {
        ba.keys = function (object) {
            var keys = [];

            for (var prop in object) {
                if (Object.prototype.hasOwnProperty.call(object, prop)) {
                    keys.push(prop);
                }
            }

            return keys;
        }
    }

    if (isCommonJS) {
        module.exports = buster.assertions;
    }

    function prepareAssertion(name, args, num) {
        if (typeof ba.count != "number") {
            ba.count = 0;
        }

        ba.count += 1;

        if (args.length < num) {
            ba.fail("[" + name + "] Expected to receive at least " +
                        num + " argument" + (num > 1 ? "s" : ""));

            return null;
        }

        if (args.length >= num + 1) {
            var msg = args[num];

            if (typeof msg == "string") {
                msg += !/[\?\!\.\:\;\,]$/.test(msg) ? ": " : " ";
            }

            return msg;
        }

        return "";
    }

    function fail(type, assertion, msg) {
        msg = ba[type][assertion][msg];

        for (var i = 3, l = arguments.length; i < l; i++) {
            if (i == 3) {
                msg = msg.replace("${" + (i-3) + "}", arguments[i]);
            } else {
                msg = msg.replace("${" + (i-3) + "}", ba.format(arguments[i]));
            }
        }

        ba.fail("[" + type + "." + assertion + "] " + msg);
    }

    function isDate(value) {
        // Duck typed dates, allows objects to take on the role of dates
        // without actually being dates
        return typeof value.getTime == "function" &&
            value.getTime() == value.valueOf();
    }

    function areEqual(expected, actual) {
        if (expected === actual) {
            return true;
        }

        // Elements are only equal if expected === actual
        if (buster.isElement(expected) || buster.isElement(actual)) {
            return false;
        }

        // null and undefined only pass for null === null and
        // undefined === undefined
        /*jsl: ignore*/
        if (expected == null || actual == null) {
            return actual === expected;
        }
        /*jsl: end*/

        if (isDate(expected) || isDate(actual)) {
            return isDate(expected) && isDate(actual) &&
                expected.getTime() == actual.getTime();
        }

        var useCoercingEquality = typeof expected != "object" || typeof actual != "object";

        if (expected instanceof RegExp && actual instanceof RegExp) {
            if (expected.toString() != actual.toString()) {
                return false;
            }

            useCoercingEquality = false;
        }

        // Arrays can only be equal to arrays
        var expectedStr = toString.call(expected);
        var actualStr = toString.call(actual);

        // Coerce and compare when primitives are involved
        if (useCoercingEquality) {
            return expectedStr != "[object Array]" && actualStr != "[object Array]" &&
                expected == actual;
        }

        var expectedKeys = ba.keys(expected);
        var actualKeys = ba.keys(actual);

        if (isArguments(expected) || isArguments(actual)) {
            if (expected.length != actual.length) {
                return false;
            }
        } else {
            if (typeof expected != typeof actual || expectedStr != actualStr ||
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

    assert = ba.assert = function (actual, message) {
        prepareAssertion("assert", arguments, 1);

        if (!actual) {
            var val = ba.format(actual)
            ba.fail(message || "[assert] Expected " + val + " to be truthy");
        } else {
            ba.emit("pass", "assert", message || "", actual);
        }
    };

    refute = ba.refute = function (actual, message) {
        prepareAssertion("refute", arguments, 1);

        if (actual) {
            var val = ba.format(actual)
            ba.fail(message || "[refute] Expected " + val + " to be falsy");
        } else {
            ba.emit("pass", "refute", message || "", actual);
        }
    };

    assert.msgFail = "[assert] Expected ${1} to be thruthy";
    ba.count = 0;

    ba.fail = function (message) {
        var exception = new Error(message);
        exception.name = "AssertionError";

        try {
            throw exception;
        } catch (e) {
            ba.emit("failure", e);
        }

        if (typeof ba.throwOnFailure != "boolean" || ba.throwOnFailure) {
            throw exception;
        }
    };

    ba.format = function (object) {
        return "" + object;
    };

    assert.isTrue = function (actual, message) {
        message = prepareAssertion("assert.isTrue", arguments, 1);

        if (message === null) {
            return;
        }

        if (actual !== true) {
            fail("assert", "isTrue", "msgFail", message, actual);
        } else {
            ba.emit("pass", "assert.isTrue", message, actual);
        }
    };

    assert.isTrue.msgFail = "${0}Expected ${1} to be true";

    assert.isFalse = function (actual, message) {
        message = prepareAssertion("assert.isFalse", arguments, 1);

        if (message === null) {
            return;
        }

        if (actual !== false) {
            fail("assert", "isFalse", "msgFail", message, actual);
        } else {
            ba.emit("pass", "assert.isFalse", message, actual);
        }
    };

    assert.isFalse.msgFail = "${0}Expected ${1} to be false";

    assert.same = function (actual, expected, message) {
        message = prepareAssertion("assert.same", arguments, 2);

        if (message === null) {
            return;
        }

        if (actual !== expected) {
            fail("assert", "same", "msgFail", message, actual, expected);
        } else {
            ba.emit("pass", "assert.same", message, actual, expected);
        }
    };

    assert.same.msgFail = "${0}Expected ${1} to be the same object as ${2}";

    refute.same = function (actual, expected, message) {
        message = prepareAssertion("refute.same", arguments, 2);

        if (message === null) {
            return;
        }

        if (actual === expected) {
            fail("refute", "same", "msgFail", message, actual, expected);
        } else {
            ba.emit("pass", "refute.same", message, actual, expected);
        }
    };

    refute.same.msgFail = "${0}Expected ${1} not to be the same object as ${2}";

    assert.equals = function (actual, expected, message) {
        message = prepareAssertion("assert.equals", arguments, 2);

        if (message === null) {
            return;
        }

        if (!areEqual(actual, expected)) {
            fail("assert", "equals", "msgFail", message, actual, expected);
        } else {
            ba.emit("pass", "assert.equals", message, actual, expected);
        }
    };

    assert.equals.msgFail = "${0}Expected ${1} to be equal to ${2}";

    refute.equals = function (actual, expected, message) {
        message = prepareAssertion("refute.equals", arguments, 2);

        if (message === null) {
            return;
        }

        if (areEqual(actual, expected)) {
            fail("refute", "equals", "msgFail", message, actual, expected);
        } else {
            ba.emit("pass", "refute.equals", message, actual, expected);
        }
    };

    refute.equals.msgFail = "${0}Expected ${1} not to be equal to ${2}";

    assert.typeOf = function (actual, expected, message) {
        message = prepareAssertion("assert.typeOf", arguments, 2);

        if (message === null) {
            return;
        }

        if (typeof actual != expected) {
            fail("assert", "typeOf", "msgFail", message, actual, expected, typeof actual);
        } else {
            ba.emit("pass", "assert.typeOf", message, actual, expected);
        }
    };

    assert.typeOf.msgFail = "${0}Expected typeof ${1} (${3}) to be ${2}";

    refute.typeOf = function (actual, expected, message) {
        message = prepareAssertion("refute.typeOf", arguments, 2);

        if (message === null) {
            return;
        }

        if (typeof actual == expected) {
            fail("refute", "typeOf", "msgFail", message, actual, expected);
        } else {
            ba.emit("pass", "refute.typeOf", message, actual, expected);
        }
    };

    refute.typeOf.msgFail = "${0}Expected typeof ${1} not to be ${2}";

    assert.isString = function (actual, message) {
        message = prepareAssertion("assert.isString", arguments, 1);

        if (message === null) {
            return;
        }

        if (typeof actual != "string") {
            fail("assert", "isString", "msgFail", message, actual, typeof actual);
        } else {
            ba.emit("pass", "assert.isString", message, actual);
        }
    };

    assert.isString.msgFail = "${0}Expected typeof ${1} (${2}) to be string";

    assert.isObject = function (actual, message) {
        message = prepareAssertion("assert.isObject", arguments, 1);

        if (message === null) {
            return;
        }

        if (typeof actual != "object" || !actual) {
            fail("assert", "isObject", "msgFail", message, actual, typeof actual);
        } else {
            ba.emit("pass", "assert.isObject", message, actual);
        }
    };

    assert.isObject.msgFail = "${0}Expected typeof ${1} (${2}) to be object and not null";

    assert.isFunction = function (actual, message) {
        message = prepareAssertion("assert.isFunction", arguments, 1);

        if (message === null) {
            return;
        }

        if (typeof actual != "function") {
            fail("assert", "isFunction", "msgFail", message, actual, typeof actual);
        } else {
            ba.emit("pass", "assert.isFunction", message, actual);
        }
    };

    assert.isFunction.msgFail = "${0}Expected typeof ${1} (${2}) to be function";

    assert.isBoolean = function (actual, message) {
        message = prepareAssertion("assert.isBoolean", arguments, 1);

        if (message === null) {
            return;
        }

        if (typeof actual != "boolean") {
            fail("assert", "isBoolean", "msgFail", message, actual, typeof actual);
        } else {
            ba.emit("pass", "assert.isBoolean", message, actual);
        }
    };

    assert.isBoolean.msgFail = "${0}Expected typeof ${1} (${2}) to be boolean";

    assert.isNumber = function (actual, message) {
        message = prepareAssertion("assert.isNumber", arguments, 1);

        if (message === null) {
            return;
        }

        if (typeof actual != "number" || isNaN(actual)) {
            fail("assert", "isNumber", "msgFail", message, actual, typeof actual);
        } else {
            ba.emit("pass", "assert.isNumber", message, actual);
        }
    };

    assert.isNumber.msgFail = "${0}Expected ${1} (${2}) to be a non-NaN number";

    assert.isUndefined = function (actual, message) {
        message = prepareAssertion("assert.isUndefined", arguments, 1);

        if (message === null) {
            return;
        }

        if (typeof actual != "undefined") {
            fail("assert", "isUndefined", "msgFail", message, actual, typeof actual);
        } else {
            ba.emit("pass", "assert.isUndefined", message, actual);
        }
    };

    assert.isUndefined.msgFail = "${0}Expected typeof ${1} (${2}) to be undefined";

    refute.isUndefined = function (actual, message) {
        message = prepareAssertion("refute.isUndefined", arguments, 1);

        if (message === null) {
            return;
        }

        if (typeof actual == "undefined") {
            fail("refute", "isUndefined", "msgFail", message, actual);
        } else {
            ba.emit("pass", "refute.isUndefined", message, actual);
        }
    };

    refute.isUndefined.msgFail = "${0}Expected not to be undefined";

    assert.isNull = function (actual, message) {
        message = prepareAssertion("assert.isNull", arguments, 1);

        if (message === null) {
            return;
        }

        if (actual !== null) {
            fail("assert", "isNull", "msgFail", message, actual);
        } else {
            ba.emit("pass", "assert.isNull", message, actual);
        }
    };

    assert.isNull.msgFail = "${0}Expected ${1} to be null";

    refute.isNull = function (actual, message) {
        message = prepareAssertion("refute.isNull", arguments, 1);

        if (message === null) {
            return;
        }

        if (actual === null) {
            fail("refute", "isNull", "msgFail", message);
        } else {
            ba.emit("pass", "refute.isNull", message);
        }
    };

    refute.isNull.msgFail = "${0}Expected not to be null";

    assert.isNaN = function (actual, message) {
        message = prepareAssertion("assert.isNaN", arguments, 1);

        if (message === null) {
            return;
        }

        if (typeof actual != "number" || !isNaN(actual)) {
            fail("assert", "isNaN", "msgFail", message, actual);
        } else {
            ba.emit("pass", "assert.isNaN", message, actual);
        }
    };

    assert.isNaN.msgFail = "${0}Expected ${1} to be NaN";

    refute.isNaN = function (actual, message) {
        message = prepareAssertion("refute.isNaN", arguments, 1);

        if (message === null) {
            return;
        }

        if (typeof actual == "number" && isNaN(actual)) {
            fail("refute", "isNaN", "msgFail", message, actual);
        } else {
            ba.emit("pass", "refute.isNaN", message, actual);
        }
    };

    refute.isNaN.msgFail = "${0}Expected not to be NaN";

    assert.isArray = function (actual, message) {
        message = prepareAssertion("assert.isArray", arguments, 1);

        if (message === null) {
            return;
        }

        if (toString.call(actual) != "[object Array]") {
            fail("assert", "isArray", "msgFail", message, actual);
        } else {
            ba.emit("pass", "assert.isArray", message, actual);
        }
    };

    assert.isArray.msgFail = "${0}Expected ${1} to be array";

    refute.isArray = function (actual, message) {
        message = prepareAssertion("refute.isArray", arguments, 1);

        if (message === null) {
            return;
        }

        if (toString.call(actual) == "[object Array]") {
            fail("refute", "isArray", "msgFail", message, actual);
        } else {
            ba.emit("pass", "refute.isArray", message, actual);
        }
    };

    refute.isArray.msgFail = "${0}Expected ${1} not to be array";

    function isArrayLike(object) {
        return toString.call(object) == "[object Array]" ||
            (!!object && typeof object.length == "number" &&
            typeof object.splice == "function") ||
            isArguments(object);
    }

    assert.isArrayLike = function (actual, message) {
        message = prepareAssertion("assert.isArrayLike", arguments, 1);

        if (message === null) {
            return;
        }

        if (!isArrayLike(actual)) {
            fail("assert", "isArrayLike", "msgFail", message, actual);
        } else {
            ba.emit("pass", "assert.isArrayLike", message, actual);
        }
    };

    assert.isArrayLike.msgFail = "${0}Expected ${1} to be array like";

    refute.isArrayLike = function (actual, message) {
        message = prepareAssertion("refute.isArrayLike", arguments, 1);

        if (message === null) {
            return;
        }

        if (isArrayLike(actual)) {
            fail("refute", "isArrayLike", "msgFail", message, actual);
        } else {
            ba.emit("pass", "refute.isArrayLike", message, actual);
        }
    };

    refute.isArrayLike.msgFail = "${0}Expected ${1} not to be array like";

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

        if (typeof matcher == "boolean") {
            return matcher === object;
        }

        if (matcher && typeof matcher == "object") {
            for (var prop in matcher) {
                if (!match(object[prop], matcher[prop])) {
                    return false;
                }
            }

            return true;
        }

        throw new Error("Matcher (" + ba.format(matcher) + ") was not a " +
                        "string, a number, a function, a boolean or an object");
    }

    assert.match = function (actual, matcher, message) {
        message = prepareAssertion("assert.match", arguments, 2);
        var passed;

        if (message === null) {
            return;
        }

        try {
            passed = match(actual, matcher);
        } catch (e) {
            return fail("assert", "match", "msgException", message, e.message);
        }

        if (!passed) {
            return fail("assert", "match", "msgFail", message, actual, matcher);
        }

        ba.emit("pass", "assert.match", message, actual, matcher);
    };

    assert.match.msgException = "${0}${1}";
    assert.match.msgFail = "${0}Expected ${1} to match ${2}";

    refute.match = function (actual, matcher, message) {
        message = prepareAssertion("refute.match", arguments, 2);
        var passed;

        if (message === null) {
            return;
        }

        try {
            passed = match(actual, matcher);
        } catch (e) {
            return fail("refute", "match", "msgException", message, e.message);
        }

        if (passed) {
            return fail("refute", "match", "msgFail", message, matcher, actual);
        }

        ba.emit("pass", "refute.match", message, matcher, actual);
    };

    refute.match.msgException = "${0}${1}";
    refute.match.msgFail = "${0}Expected ${2} not to match ${1}";

    function captureException(callback) {
        try {
            callback();
        } catch (e) {
            return e;
        }

        return null;
    }

    assert.exception = function (callback, exception, message) {
        prepareAssertion("assert.exception", arguments, 1);

        if (!callback) {
            return;
        }

        var err = captureException(callback);
        message = message ? message + ": " : "";

        if (!err) {
            if (exception) {
                return fail("assert", "exception", "msgTypeNoException", message, exception);
            } else {
                return fail("assert", "exception", "msgFail", message, exception);
            }
        }

        if (exception && err.name != exception) {
            return fail("assert", "exception", "msgTypeFail", message, exception, err.name, err.message);
        }

        ba.emit("pass", "assert.exception", message, callback, exception);
    };

    assert.exception.msgTypeNoException = "${0}Expected ${1} but no exception was thrown";
    assert.exception.msgFail = "${0}Expected exception";
    assert.exception.msgTypeFail = "${0}Expected ${1} but threw ${2} (${3})";

    refute.exception = function (callback, message) {
        message = prepareAssertion("refute.exception", arguments, 1);

        if (message === null) {
            return;
        }

        var err = captureException(callback);

        if (err) {
            fail("refute", "exception", "msgFail", message, err.name, err.message, callback);
        } else {
            ba.emit("pass", "refute.exception", message, callback);
        }
    };

    refute.exception.msgFail = "${0}Expected not to throw but threw ${1} (${2})";

    assert.tagName = function (element, tagName, message) {
        message = prepareAssertion("assert.tagName", arguments, 2);

        if (message === null) {
            return;
        }

        if (!element.tagName) {
            return fail("assert", "tagName", "msgNoTagName", message, tagName, element);
        }

        if (!tagName.toLowerCase ||
            tagName.toLowerCase() != element.tagName.toLowerCase()) {
            return fail("assert", "tagName", "msgFail", message, tagName, element.tagName);
        }

        ba.emit("pass", "assert.tagName", message, tagName, element);
    };

    assert.tagName.msgNoTagName = "${0}Expected ${2} to have tagName property";
    assert.tagName.msgFail = "${0}Expected tagName to be ${1} but was ${2}";

    refute.tagName = function (element, tagName, message) {
        message = prepareAssertion("refute.tagName", arguments, 2);

        if (message === null) {
            return;
        }

        if (!element.tagName) {
            return fail("refute", "tagName", "msgNoTagName", message, tagName, element);
        }

        if (tagName.toLowerCase &&
            tagName.toLowerCase() == element.tagName.toLowerCase()) {
            return fail("refute", "tagName", "msgFail", message, tagName);
        }

        ba.emit("pass", "refute.tagName", message, tagName, element);
    };

    refute.tagName.msgNoTagName = "${0}Expected ${2} to have tagName property";
    refute.tagName.msgFail = "${0}Expected tagName not to be ${1}";

    assert.className = function (element, tagName, message) {
        message = prepareAssertion("assert.className", arguments, 2);

        if (message === null) {
            return;
        }

        if (typeof element.className == "undefined") {
            return fail("assert", "className", "msgNoClassName", message, tagName, element);
        }

        var expected = typeof tagName == "string" ? tagName.split(" ") : tagName;
        var actual = element.className.split(" ");

        for (var i = 0, l = expected.length; i < l; i++) {
            if (indexOf(actual, expected[i]) < 0) {
                return fail("assert", "className", "msgFail", message, tagName, element.className);
            }
        }

        ba.emit("pass", "assert.className", message, tagName, element);
    };

    assert.className.msgNoClassName = "${0}Expected object to have className property";
    assert.className.msgFail = "${0}Expected object's className to include ${1} but was ${2}";

    refute.className = function (element, tagName, message) {
        message = prepareAssertion("refute.className", arguments, 2);

        if (message === null) {
            return;
        }

        if (typeof element.className == "undefined") {
            return fail("refute", "className", "msgNoClassName", message, tagName, element);
        }

        var expected = typeof tagName == "string" ? tagName.split(" ") : tagName;
        var actual = element.className.split(" ");

        for (var i = 0, l = expected.length; i < l; i++) {
            if (indexOf(actual, expected[i]) < 0) {
                return ba.emit("pass", "refute.className", message, tagName, element);
            }
        }

        fail("refute", "className", "msgFail", message, tagName, element.className);
    };

    refute.className.msgNoClassName = "${0}Expected object to have className property";
    refute.className.msgFail = "${0}Expected object's className not to include ${1}";

    assert.inDelta = function (actual, expected, delta, message) {
        message = prepareAssertion("assert.inDelta", arguments, 3);

        if (message === null) {
            return;
        }

        if (Math.abs(actual - expected) > delta) {
            return fail("assert", "inDelta", "msgFail", message, actual, expected, delta);
        }

        ba.emit("pass", "assert.inDelta", message, actual, expected, delta);
    };

    assert.inDelta.msgFail = "${0}Expected ${1} to be equal to ${2} +/- ${3}";

    refute.inDelta = function (actual, expected, delta, message) {
        message = prepareAssertion("refute.inDelta", arguments, 3);

        if (message === null) {
            return;
        }

        if (Math.abs(actual - expected) <= delta) {
            return fail("refute", "inDelta", "msgFail", message, actual, expected, delta);
        }

        ba.emit("pass", "refute.inDelta", message, actual, expected, delta);
    };

    refute.inDelta.msgFail = "${0}Expected ${1} not to be equal to ${2} +/- ${3}";

    if (typeof module != "undefined") {
        ba.assert.that = function () {
            ba.assert.that = require("./buster-assert/assert-that");
            return ba.assert.that.apply(exports, arguments);
        };

        ba.refute.that = function () {
            ba.refute.that = require("./buster-assert/refute-that");
            return ba.refute.that.apply(exports, arguments);
        };
    }
}());
