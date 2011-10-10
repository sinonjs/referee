/*jslint eqeqeq: false, onevar: false, plusplus: false*/
/*global buster, require, module*/
(function () {
    var isCommonJS = typeof require == "function" && typeof module == "object";
    if (isCommonJS) buster = require("buster-core");
    var toString = Object.prototype.toString;
    var slice = Array.prototype.slice;
    var assert, refute, ba = buster.assertions = buster.eventEmitter.create();

    if (isCommonJS) {
        module.exports = buster.assertions;
    }

    function countAssertion() {
        if (typeof ba.count != "number") {
            ba.count = 0;
        }

        ba.count += 1;
    }

    ba.count = countAssertion;

    function prepareAssertionMessage(name, args, num) {
        if (args.length < num) {
            ba.fail("[" + name + "] Expected to receive at least " +
                        num + " argument" + (num > 1 ? "s" : ""));

            return null;
        }

        if (args.length > num) {
            var msg = args[num];

            if (typeof msg == "string") {
                msg += !/[\?\!\.\:\;\,]$/.test(msg) ? ": " : " ";
            }

            return msg;
        }

        return "";
    }

    function defineAssertion(type, name, func, assertionArgs, messageValues) {
        assertionArgs = assertionArgs || func.length;

        ba[type][name] = function () {
            var fullName = type + "." + name;
            countAssertion();
            var message = prepareAssertionMessage(fullName, arguments, assertionArgs);
            if (message === null) return;

            var failed = false;

            var ctx = {
                fail: function () {
                    failed = true;
                    var failArgs = [type, name, arguments[0], message];
                    fail.apply(this, failArgs.concat(slice.call(arguments, 1)));
                    return true;
                }
            };

            var args = slice.call(arguments, 0, assertionArgs);

            if (typeof messageValues == "function") {
                args = messageValues.apply(this, args);
            }

            if (!func.apply(ctx, arguments)) {
                return fail.apply(this, [type, name, "msgFail", message].concat(args));
            }

            if (!failed) {
                ba.emit.apply(ba, ["pass", fullName, message].concat(args));
            }
        };
    }

    ba.add = function (name, func, options) {
        var al, rl;

        if (typeof func == "function") {
            options.assert = func;
            options.refute = function () {
                return !func.apply(this, arguments);
            };

            al = func.length;
            rl = func.length;
        } else {
            options = func;
            al = options.assert.length;
            rl = options.refute.length;
        }

        var values = options && options.values;
        defineAssertion("assert", name, options.assert, al, values);
        defineAssertion("refute", name, options.refute, rl, values);

        options = options || {};
        assert[name].msgFail = "${0}" + options.assertFail;
        refute[name].msgFail = "${0}" + options.refuteFail;

        if (options.expect) {
            if (ba.expect && ba.expect.wrapAssertion) {
                ba.expect.wrapAssertion(name, options.expect);
            } else {
                assert[name].expectationName = options.expect;
                refute[name].expectationName = options.expect;
            }
        }
    };

    function formatMessage(message, values, offset) {
        var value;
        values = values || [];
        offset = typeof offset == "number" ? offset : 0;

        for (var i = offset, l = values.length; i < l; i++) {
            value = i == offset ? values[i] : ba.format(values[i]);
            message = message.replace("${" + (i - offset) + "}", value);
        }

        return message;
    }

    function fail(type, assertion, msg) {
        var message = formatMessage(ba[type][assertion][msg], arguments, 3);
        ba.fail("[" + type + "." + assertion + "] " + message);
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

    assert = ba.assert = function assert(actual, message) {
        countAssertion();
        prepareAssertionMessage("assert", arguments, 1);

        if (!actual) {
            var val = ba.format(actual)
            ba.fail(message || "[assert] Expected " + val + " to be truthy");
        } else {
            ba.emit("pass", "assert", message || "", actual);
        }
    };

    assert.toString = function () {
        return "buster.assert";
    };

    refute = ba.refute = function (actual, message) {
        countAssertion();
        prepareAssertionMessage("refute", arguments, 1);

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

    ba.add("isTrue", function (actual) {
        return actual === true;
    }, {
        assertFail: "Expected ${1} to be true",
        refuteFail: "Expected ${1} to not be true",
        expect: "toBeTrue"
    });

    ba.add("isFalse", function (actual) {
        return actual === false;
    }, {
        assertFail: "Expected ${1} to be false",
        refuteFail: "Expected ${1} to not be false",
        expect: "toBeFalse"
    });

    ba.add("same", function (actual, expected) {
        return actual === expected;
    }, {
        assertFail: "Expected ${1} to be the same object as ${2}",
        refuteFail: "Expected ${1} not to be the same object as ${2}",
        expect: "toBeSameAs"
    });

    function multiLineStringDiff(actual, expected) {
        if (actual == expected) return true;

        var message = formatMessage(assert.equals.msgMultiLineStringHeading),
            actualLines = actual.split("\n"),
            expectedLines = expected.split("\n"),
            lineCount = Math.max(expectedLines.length, actualLines.length),
            lines = [];

        for (var i = 0; i < lineCount; ++i) {
            if (expectedLines[i] != actualLines[i]) {
                lines.push("line " + (i + 1) + ": " + (expectedLines[i] || "") + "\n" +
                           "was:    " + (actualLines[i] || ""));
            }
        }

        ba.fail("[assert.equals] " + message + lines.join("\n\n"));
        return false;
    }

    ba.add("equals", {
        assert: function (actual, expected) {
            if (typeof actual == "string" && typeof expected == "string" &&
                (actual.indexOf("\n") >= 0 || expected.split("\n").length >= 0)) {
                return multiLineStringDiff.call(this, actual, expected);
            }

            return areEqual(actual, expected);
        },

        refute: function (actual, expected) {
            return !areEqual(actual, expected);
        },

        assertFail: "Expected ${1} to be equal to ${2}",
        refuteFail: "Expected ${1} not to be equal to ${2}",
        expect: "toEqual"
    });

    assert.equals.msgMultiLineStringHeading = "Expected multi-line strings to be equal:\n";

    ba.add("typeOf", function (actual, expected) {
        return typeof actual == expected;
    }, {
        assertFail: "Expected typeof ${1} (${3}) to be ${2}",
        refuteFail: "Expected typeof ${1} not to be ${2}",
        expect: "toBeType",

        values: function (actual, expected) {
            return [actual, expected, typeof actual];
        }
    });

    function actualAndTypeOfMessageValues(actual) {
        return [actual, typeof actual];
    }

    ba.add("isString", function (actual) {
        return typeof actual == "string";
    }, {
        assertFail: "Expected ${1} (${2}) to be string",
        refuteFail: "Expected ${1} not to be string",
        expect: "toBeString",
        values: actualAndTypeOfMessageValues
    });

    ba.add("isObject", function (actual) {
        return typeof actual == "object" && !!actual;
    }, {
        assertFail: "Expected ${1} (${2}) to be object and not null",
        refuteFail: "Expected ${1} to be null or not an object",
        expect: "toBeObject",
        values: actualAndTypeOfMessageValues
    });

    ba.add("isFunction", function (actual) {
        return typeof actual == "function";
    }, {
        assertFail: "Expected ${1} (${2}) to be function",
        refuteFail: "Expected ${1} not to be function",
        expect: "toBeFunction",
        values: function (actual) {
            return [("" + actual).replace("\n", ""), typeof actual];
        }
    });

    ba.add("isBoolean", function (actual) {
        return typeof actual == "boolean";
    }, {
        assertFail: "Expected ${1} (${2}) to be boolean",
        refuteFail: "Expected ${1} not to be boolean",
        expect: "toBeBoolean",
        values: actualAndTypeOfMessageValues
    });

    ba.add("isNumber", function (actual) {
        return typeof actual == "number" && !isNaN(actual);
    }, {
        assertFail: "Expected ${1} (${2}) to be a non-NaN number",
        refuteFail: "Expected ${1} to be NaN or another non-number value",
        expect: "toBeNumber",
        values: actualAndTypeOfMessageValues
    });

    ba.add("defined", function (actual) {
        return typeof actual != "undefined";
    }, {
        assertFail: "Expected to be defined",
        refuteFail: "Expected ${1} (${2}) not to be defined",
        expect: "toBeDefined",
        values: actualAndTypeOfMessageValues
    });

    ba.add("isNull", function (actual) {
        return actual === null;
    }, {
        assertFail: "Expected ${1} to be null",
        refuteFail: "Expected not to be null",
        expect: "toBeNull"
    });

    ba.add("isNaN", function (actual) {
        return typeof actual == "number" && isNaN(actual);
    }, {
        assertFail: "Expected ${1} to be NaN",
        refuteFail: "Expected not to be NaN",
        expect: "toBeNaN"
    });

    ba.add("isArray", function (actual) {
        return toString.call(actual) == "[object Array]";
    }, {
        assertFail: "Expected ${1} to be array",
        refuteFail: "Expected ${1} not to be array",
        expect: "toBeArray"
    });

    function isArrayLike(object) {
        return toString.call(object) == "[object Array]" ||
            (!!object && typeof object.length == "number" &&
            typeof object.splice == "function") ||
            isArguments(object);
    }

    ba.add("isArrayLike", function (actual) {
        return isArrayLike(actual);
    }, {
        assertFail: "Expected ${1} to be array like",
        refuteFail: "Expected ${1} not to be array like",
        expect: "toBeArrayLike"
    });

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

    ba.add("match", {
        assert: function (actual, matcher) {
            var passed;

            try {
                passed = match(actual, matcher);
            } catch (e) {
                return this.fail("msgException", e.message);
            }

            return passed;
        },

        refute: function (actual, matcher) {
            var passed;

            try {
                passed = match(actual, matcher);
            } catch (e) {
                return this.fail("msgException", e.message);
            }

            return !passed;
        },

        assertFail: "Expected ${1} to match ${2}",
        refuteFail: "Expected ${1} not to match ${2}",
        expect: "toMatch"
    });

    assert.match.msgException = "${0}${1}";
    refute.match.msgException = "${0}${1}";

    function captureException(callback) {
        try {
            callback();
        } catch (e) {
            return e;
        }

        return null;
    }

    assert.exception = function (callback, exception, message) {
        countAssertion();
        prepareAssertionMessage("assert.exception", arguments, 1);

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
            if (typeof window != "undefined" && typeof console != "undefined") console.log(err);
            return fail("assert", "exception", "msgTypeFail", message, exception, err.name, err.message);
        }

        ba.emit("pass", "assert.exception", message, callback, exception);
    };

    assert.exception.msgTypeNoException = "${0}Expected ${1} but no exception was thrown";
    assert.exception.msgFail = "${0}Expected exception";
    assert.exception.msgTypeFail = "${0}Expected ${1} but threw ${2} (${3})";
    assert.exception.expectationName = "toThrow";

    refute.exception = function (callback, message) {
        countAssertion();
        message = prepareAssertionMessage("refute.exception", arguments, 1);

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
    refute.exception.expectationName = "toThrow";

    ba.add("tagName", function (element, tagName) {
        if (!element.tagName) {
            return this.fail("msgNoTagName", tagName, element);
        }

        return tagName.toLowerCase &&
            tagName.toLowerCase() == element.tagName.toLowerCase();
    }, {
        assertFail: "Expected tagName to be ${1} but was ${2}",
        refuteFail: "Expected tagName not to be ${1}",
        expect: "toHaveTagName",
        values: function (element, tagName) {
            return [tagName, element.tagName];
        }
    });

    assert.tagName.msgNoTagName = "${0}Expected ${2} to have tagName property";
    refute.tagName.msgNoTagName = "${0}Expected ${2} to have tagName property";

    function indexOf(arr, item) {
        for (var i = 0, l = arr.length; i < l; i++) {
            if (arr[i] == item) {
                return i;
            }
        }

        return -1;
    }

    ba.add("className", function (element, className) {
        if (typeof element.className == "undefined") {
            return this.fail("msgNoClassName", className, element);
        }

        var expected = typeof className == "string" ? className.split(" ") : className;
        var actual = element.className.split(" ");

        for (var i = 0, l = expected.length; i < l; i++) {
            if (indexOf(actual, expected[i]) < 0) {
                return false;
            }
        }

        return true;
    }, {
        assertFail: "Expected object's className to include ${1} but was ${2}",
        refuteFail: "Expected object's className not to include ${1}",
        expect: "toHaveClassName",
        values: function (element, className) {
            return [className, element.className];
        }
    });

    assert.className.msgNoClassName = "${0}Expected object to have className property";
    refute.className.msgNoClassName = "${0}Expected object to have className property";

    ba.add("inDelta", function (actual, expected, delta) {
        return Math.abs(actual - expected) <= delta;
    }, {
        assertFail: "Expected ${1} to be equal to ${2} +/- ${3}",
        refuteFail: "Expected ${1} not to be equal to ${2} +/- ${3}",
        expect: "toBeInDelta"
    });

    ba.add("hasPrototype", function (actual, protoObj) {
        return protoObj.isPrototypeOf(actual);
    }, {
        assertFail: "Expected ${1} to have ${2} on its prototype chain",
        refuteFail: "Expected ${1} not to have ${2} on its prototype chain",
        expect: "toHavePrototype"
    });

    if (typeof module != "undefined") {
        ba.expect = function () {
            ba.expect = require("./buster-assertions/expect");
            return ba.expect.apply(exports, arguments);
        };
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
}());
