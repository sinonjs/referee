((typeof define === "function" && define.amd && function (m) {
    define("referee", ["lodash", "samsam", "bane"], m);
}) || (typeof module === "object" && function (m) {
    module.exports = m(require("lodash"), require("samsam"), require("bane"));
}) || function (m) { this.referee = m(this._, this.samsam, this.bane); }
)(function (_, samsam, bane) {
    "use strict";

    var toString = Object.prototype.toString;
    var slice = Array.prototype.slice;
    var assert, refute, referee = bane.createEventEmitter();

    referee.countAssertion = function countAssertion() {
        if (typeof referee.count !== "number") { referee.count = 0; }
        referee.count += 1;
    };

    function interpolate(string, prop, value) {
        return string.replace(new RegExp("\\$\\{" + prop + "\\}", "g"), value);
    }

    // Interpolate positional arguments. Replaces occurences of ${<index>} in
    // the string with the corresponding entry in values[<index>]
    function interpolatePosArg(message, values) {
        return _.reduce(values, function (msg, value, index) {
            return interpolate(msg, index, referee.format(value));
        }, message);
    }

    function interpolateProperties(message, properties) {
        return _.reduce(_.keys(properties), function (msg, name) {
            return interpolate(msg, name, referee.format(properties[name]));
        }, message || "");
    }

    // Fail an assertion. Interpolates message before calling referee.fail
    function fail(type, assertion, msg) {
        delete this.fail;
        var message = interpolateProperties(interpolatePosArg(
            referee[type][assertion][msg] || msg,
            [].slice.call(arguments, 3)
        ), this);
        referee.fail("[" + type + "." + assertion + "] " + message);
    }

    // Internal helper. Used throughout to fail assertions if they receive
    // too few arguments. The name is provided for a helpful error message.
    function assertArgNum(name, args, num) {
        if (args.length < num) {
            referee.fail("[" + name + "] Expected to receive at least " +
                        num + " argument" + (num > 1 ? "s" : ""));
            return false;
        }
        return true;
    }

    // Internal helper. Not the most elegant of functions, but it takes
    // care of all the nitty-gritty of assertion functions: counting,
    // verifying parameter count, interpolating messages with actual
    // values and so on.
    function defineAssertion(type, name, func, minArgs, messageValues) {
        referee[type][name] = function () {
            referee.countAssertion();
            var fullName = type + "." + name, failed = false;

            if (!assertArgNum(fullName, arguments, minArgs || func.length)) {
                return;
            }

            var ctx = {
                fail: function () {
                    failed = true;
                    var failArgs = [type, name].concat(slice.call(arguments));
                    fail.apply(this, failArgs);
                    return true;
                }
            };

            var args = slice.call(arguments, 0);

            if (typeof messageValues === "function") {
                args = messageValues.apply(this, args);
            }

            if (!func.apply(ctx, arguments)) {
                return fail.apply(ctx, [type, name, "message"].concat(args));
            }

            if (!failed) {
                referee.emit.apply(referee, ["pass", fullName].concat(args));
            }
        };
    }

    referee.add = function (name, opt) {
        var refuteArgs;

        if (opt.refute) {
            refuteArgs = opt.refute.length;
        } else {
            refuteArgs = opt.assert.length;
            opt.refute = function () {
                return !opt.assert.apply(this, arguments);
            };
        }

        var values = opt.values;
        defineAssertion("assert", name, opt.assert, opt.assert.length, values);
        defineAssertion("refute", name, opt.refute, refuteArgs, values);

        assert[name].message = opt.assertMessage;
        refute[name].message = opt.refuteMessage;

        if (opt.expectation) {
            if (referee.expect && referee.expect.wrapAssertion) {
                referee.expect.wrapAssertion(name, opt.expectation);
            } else {
                assert[name].expectationName = opt.expectation;
                refute[name].expectationName = opt.expectation;
            }
        }
    };

    assert = referee.assert = function assert(actual, message) {
        referee.countAssertion();
        if (!assertArgNum("assert", arguments, 1)) { return; }

        if (!actual) {
            var v = referee.format(actual);
            referee.fail(message || "[assert] Expected " + v + " to be truthy");
        } else {
            referee.emit("pass", "assert", message || "", actual);
        }
    };

    assert.toString = function () {
        return "referee.assert()";
    };

    refute = referee.refute = function (actual, message) {
        referee.countAssertion();
        if (!assertArgNum("refute", arguments, 1)) { return; }

        if (actual) {
            var v = referee.format(actual);
            referee.fail(message || "[refute] Expected " + v + " to be falsy");
        } else {
            referee.emit("pass", "refute", message || "", actual);
        }
    };

    assert.message = "[assert] Expected ${0} to be truthy";
    referee.count = 0;

    referee.fail = function (message) {
        var exception = new Error(message);
        exception.name = "AssertionError";

        try {
            throw exception;
        } catch (e) {
            referee.emit("failure", e);
        }

        if (typeof referee.throwOnFailure !== "boolean" ||
                referee.throwOnFailure) {
            throw exception;
        }
    };

    referee.format = function (object) { return String(object); };

    function msg(message) {
        if (!message) { return ""; }
        return message + (/[.:!?]$/.test(message) ? " " : ": ");
    }

    referee.prepareMessage = msg;

    function actualAndExpectedMessageValues(actual, expected, message) {
        return [actual, expected, msg(message)];
    }

    function actualMessageValues(actual, message) {
        return [actual, msg(message)];
    }

    function actualAndTypeOfMessageValues(actual, message) {
        return [actual, typeof actual, msg(message)];
    }

    referee.add("same", {
        assert: function (actual, expected) {
            return samsam.identical(actual, expected);
        },
        refute: function (actual, expected) {
            return !samsam.identical(actual, expected);
        },
        assertMessage: "${2}${0} expected to be the same object as ${1}",
        refuteMessage: "${2}${0} expected not to be the same object as ${1}",
        expectation: "toBe",
        values: actualAndExpectedMessageValues
    });

    // Extract/replace with separate module that does a more detailed
    // visualization of multi-line strings
    function multiLineStringDiff(actual, expected, message) {
        if (actual === expected) { return true; }

        var heading = assert.equals.multiLineStringHeading;
        message = interpolatePosArg(heading, [message]);
        var actualLines = actual.split("\n");
        var expectedLines = expected.split("\n");
        var lineCount = Math.max(expectedLines.length, actualLines.length);
        var i, lines = [];

        for (i = 0; i < lineCount; ++i) {
            if (expectedLines[i] !== actualLines[i]) {
                lines.push("line " + (i + 1) + ": " + (expectedLines[i] || "") +
                           "\nwas:    " + (actualLines[i] || ""));
            }
        }

        referee.fail("[assert.equals] " + message + lines.join("\n\n"));
        return false;
    }

    referee.add("equals", {
        // Uses arguments[2] because the function's .length is used to determine
        // the minimum required number of arguments.
        assert: function (actual, expected) {
            if (typeof actual === "string" && typeof expected === "string" &&
                    (actual.indexOf("\n") >= 0 ||
                     expected.indexOf("\n") >= 0)) {
                var message = msg(arguments[2]);
                return multiLineStringDiff(actual, expected, message);
            }

            return samsam.deepEqual(actual, expected);
        },

        refute: function (actual, expected) {
            return !samsam.deepEqual(actual, expected);
        },

        assertMessage: "${2}${0} expected to be equal to ${1}",
        refuteMessage: "${2}${0} expected not to be equal to ${1}",
        expectation: "toEqual",
        values: actualAndExpectedMessageValues
    });

    assert.equals.multiLineStringHeading = "${0}Expected multi-line strings " +
        "to be equal:\n";

    referee.add("greater", {
        assert: function (actual, expected) {
            return actual > expected;
        },

        assertMessage: "${2}Expected ${0} to be greater than ${1}",
        refuteMessage: "${2}Expected ${0} to be less than or equal to ${1}",
        expectation: "toBeGreaterThan",
        values: actualAndExpectedMessageValues
    });

    referee.add("less", {
        assert: function (actual, expected) {
            return actual < expected;
        },

        assertMessage: "${2}Expected ${0} to be less than ${1}",
        refuteMessage: "${2}Expected ${0} to be greater than or equal to ${1}",
        expectation: "toBeLessThan",
        values: actualAndExpectedMessageValues
    });

    referee.add("defined", {
        assert: function (actual) {
            return typeof actual !== "undefined";
        },
        assertMessage: "${2}Expected to be defined",
        refuteMessage: "${2}Expected ${0} (${1}) not to be defined",
        expectation: "toBeDefined",
        values: actualAndTypeOfMessageValues
    });

    referee.add("isNull", {
        assert: function (actual) {
            return actual === null;
        },
        assertMessage: "${1}Expected ${0} to be null",
        refuteMessage: "${1}Expected not to be null",
        expectation: "toBeNull",
        values: actualMessageValues
    });


    referee.match = function (actual, matcher) {
        try {
            return samsam.match(actual, matcher);
        } catch (e) {
            throw new Error("Matcher (" + referee.format(matcher) +
                            ") was not a string, a number, a function, " +
                            "a boolean or an object");
        }
    };

    referee.add("match", {
        assert: function (actual, matcher) {
            var passed;

            try {
                passed = referee.match(actual, matcher);
            } catch (e) {
                // Uses arguments[2] because the function's .length is used
                // to determine the minimum required number of arguments.
                var message = msg(arguments[2]);
                return this.fail("exceptionMessage", e.message, message);
            }

            return passed;
        },

        refute: function (actual, matcher) {
            var passed;

            try {
                passed = referee.match(actual, matcher);
            } catch (e) {
                return this.fail("exceptionMessage", e.message);
            }

            return !passed;
        },

        assertMessage: "${2}${0} expected to match ${1}",
        refuteMessage: "${2}${0} expected not to match ${1}",
        expectation: "toMatch",
        values: actualAndExpectedMessageValues
    });

    assert.match.exceptionMessage = "${1}${0}";
    refute.match.exceptionMessage = "${1}${0}";

    referee.add("isObject", {
        assert: function (actual) {
            return typeof actual === "object" && !!actual;
        },
        assertMessage: "${2}${0} (${1}) expected to be object and not null",
        refuteMessage: "${2}${0} expected to be null or not an object",
        expectation: "toBeObject",
        values: actualAndTypeOfMessageValues
    });

    referee.add("isFunction", {
        assert: function (actual) {
            return typeof actual === "function";
        },
        assertMessage: "${2}${0} (${1}) expected to be function",
        refuteMessage: "${2}${0} expected not to be function",
        expectation: "toBeFunction",
        values: function (actual) {
            // Uses arguments[1] because the function's .length is used to
            // determine the minimum required number of arguments.
            var message = msg(arguments[1]);
            return [String(actual).replace("\n", ""), typeof actual, message];
        }
    });

    referee.add("isTrue", {
        assert: function (actual) {
            return actual === true;
        },
        assertMessage: "${1}Expected ${0} to be true",
        refuteMessage: "${1}Expected ${0} to not be true",
        expectation: "toBeTrue",
        values: actualMessageValues
    });

    referee.add("isFalse", {
        assert: function (actual) {
            return actual === false;
        },
        assertMessage: "${1}Expected ${0} to be false",
        refuteMessage: "${1}Expected ${0} to not be false",
        expectation: "toBeFalse",
        values: actualMessageValues
    });

    referee.add("isString", {
        assert: function (actual) {
            return typeof actual === "string";
        },
        assertMessage: "${2}Expected ${0} (${1}) to be string",
        refuteMessage: "${2}Expected ${0} not to be string",
        expectation: "toBeString",
        values: actualAndTypeOfMessageValues
    });

    referee.add("isBoolean", {
        assert: function (actual) {
            return typeof actual === "boolean";
        },
        assertMessage: "${2}Expected ${0} (${1}) to be boolean",
        refuteMessage: "${2}Expected ${0} not to be boolean",
        expectation: "toBeBoolean",
        values: actualAndTypeOfMessageValues
    });

    referee.add("isNumber", {
        assert: function (actual) {
            return typeof actual === "number" && !isNaN(actual);
        },
        assertMessage: "${2}Expected ${0} (${1}) to be a non-NaN number",
        refuteMessage: "${2}Expected ${0} to be NaN or a non-number value",
        expectation: "toBeNumber",
        values: actualAndTypeOfMessageValues
    });

    referee.add("isNaN", {
        assert: function (actual) {
            return typeof actual === "number" && isNaN(actual);
        },
        assertMessage: "${2}Expected ${0} to be NaN",
        refuteMessage: "${2}Expected not to be NaN",
        expectation: "toBeNaN",
        values: actualAndTypeOfMessageValues
    });

    referee.add("isArray", {
        assert: function (actual) {
            return toString.call(actual) === "[object Array]";
        },
        assertMessage: "${2}Expected ${0} to be array",
        refuteMessage: "${2}Expected ${0} not to be array",
        expectation: "toBeArray",
        values: actualAndTypeOfMessageValues
    });

    function isArrayLike(object) {
        return _.isArray(object) ||
            (!!object && typeof object.length === "number" &&
            typeof object.splice === "function") ||
            _.isArguments(object);
    }

    referee.isArrayLike = isArrayLike;

    referee.add("isArrayLike", {
        assert: function (actual) {
            return isArrayLike(actual);
        },
        assertMessage: "${2}Expected ${0} to be array like",
        refuteMessage: "${2}Expected ${0} not to be array like",
        expectation: "toBeArrayLike",
        values: actualAndTypeOfMessageValues
    });

    function exactKeys(object, keys) {
        var keyMap = {};
        var keyCnt = 0;
        for (var i=0; i < keys.length; i++) {
            keyMap[keys[i]] = true;
            keyCnt += 1;
        }
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                if (! keyMap[key]) {
                    return false;
                }
                keyCnt -= 1;
            }
        }
        return keyCnt === 0;
    }

    referee.add('keys', {
        assert: function (actual, keys) {
            return exactKeys(actual, keys);
        },
        assertMessage: "Expected ${0} to have exact keys ${1}!",
        refuteMessage: "Expected ${0} not to have exact keys ${1}!",
        expectation: "toHaveKeys"
    });

    function captureException(callback) {
        try { callback(); } catch (e) { return e; }
        return null;
    }

    referee.captureException = captureException;

    assert.exception = function (callback, matcher, message) {
        referee.countAssertion();
        if (!assertArgNum("assert.exception", arguments, 1)) { return; }
        if (!callback) { return; }

        if (typeof matcher === "string") {
            message = matcher;
            matcher = undefined;
        }

        var err = captureException(callback);
        message = msg(message);

        if (!err) {
            if (typeof matcher === "object") {
                return fail.call(
                    {},
                    "assert",
                    "exception",
                    "typeNoExceptionMessage",
                    message,
                    referee.format(matcher)
                );
            } else {
                return fail.call({}, "assert", "exception", "message", message);
            }
        }

        if (typeof matcher === "object" && !referee.match(err, matcher)) {
            return fail.call(
                {},
                "assert",
                "exception",
                "typeFailMessage",
                message,
                referee.format(matcher),
                err.name,
                err.message,
                err.stack
            );
        }

        if (typeof matcher === "function" && matcher(err) !== true) {
            return fail.call({}, "assert", "exception", "matchFailMessage",
                             message, err.name, err.message);
        }

        referee.emit("pass", "assert.exception", message, callback, matcher);
    };

    assert.exception.typeNoExceptionMessage = "${0}Expected ${1} but no " +
        "exception was thrown";
    assert.exception.message = "${0}Expected exception";
    assert.exception.typeFailMessage = "${0}Expected ${1} but threw ${2} " +
        "(${3})\n${4}";
    assert.exception.matchFailMessage = "${0}Expected thrown ${1} (${2}) to " +
        "pass matcher function";
    assert.exception.expectationName = "toThrow";

    refute.exception = function (callback) {
        referee.countAssertion();
        if (!assertArgNum("refute.exception", arguments, 1)) { return; }
        var err = captureException(callback);

        if (err) {
            // Uses arguments[1] because the function's .length is used to
            // determine the minimum required number of arguments.
            fail.call({}, "refute", "exception", "message",
                      msg(arguments[1]), err.name, err.message, callback);
        } else {
            referee.emit("pass", "refute.exception", callback);
        }
    };

    refute.exception.message = "${0}Expected not to throw but " +
        "threw ${1} (${2})";
    refute.exception.expectationName = "toThrow";

    referee.add("near", {
        assert: function (actual, expected, delta) {
            return Math.abs(actual - expected) <= delta;
        },
        assertMessage: "${3}Expected ${0} to be equal to ${1} +/- ${2}",
        refuteMessage: "${3}Expected ${0} not to be equal to ${1} +/- ${2}",
        expectation: "toBeNear",
        values: function (actual, expected, delta, message) {
            return [actual, expected, delta, msg(message)];
        }
    });

    referee.add("hasPrototype", {
        assert: function (actual, protoObj) {
            return protoObj.isPrototypeOf(actual);
        },
        assertMessage: "${2}Expected ${0} to have ${1} on its prototype chain",
        refuteMessage: "${2}Expected ${0} not to have ${1} on its " +
            "prototype chain",
        expectation: "toHavePrototype",
        values: actualAndExpectedMessageValues
    });

    referee.add("contains", {
        assert: function (haystack, needle) {
            return _.include(haystack, needle);
        },
        assertMessage: "${2}Expected [${0}] to contain ${1}",
        refuteMessage: "${2}Expected [${0}] not to contain ${1}",
        expectation: "toContain",
        values: actualAndExpectedMessageValues
    });

    referee.add("tagName", {
        assert: function (element, tagName) {
            // Uses arguments[2] because the function's .length is used to
            // determine the minimum required number of arguments.
            if (!element.tagName) {
                return this.fail(
                    "noTagNameMessage",
                    tagName,
                    element,
                    msg(arguments[2])
                );
            }

            return tagName.toLowerCase &&
                tagName.toLowerCase() === element.tagName.toLowerCase();
        },
        assertMessage: "${2}Expected tagName to be ${0} but was ${1}",
        refuteMessage: "${2}Expected tagName not to be ${0}",
        expectation: "toHaveTagName",
        values: function (element, tagName, message) {
            return [tagName, element.tagName, msg(message)];
        }
    });

    assert.tagName.noTagNameMessage = "${2}Expected ${1} to have tagName " +
        "property";
    refute.tagName.noTagNameMessage = "${2}Expected ${1} to have tagName " +
        "property";

    referee.add("className", {
        assert: function (element, name) {
            if (typeof element.className === "undefined") {
                // Uses arguments[2] because the function's .length is used to
                // determine the minimum required number of arguments.
                return this.fail(
                    "noClassNameMessage",
                    name,
                    element,
                    msg(arguments[2])
                );
            }

            var expected = typeof name === "string" ? name.split(" ") : name;
            var actual = element.className.split(" ");
            var i, l;
            for (i = 0, l = expected.length; i < l; i++) {
                if (!_.include(actual, expected[i])) { return false; }
            }

            return true;
        },
        assertMessage: "${2}Expected object's className to include ${0} " +
            "but was ${1}",
        refuteMessage: "${2}Expected object's className not to include ${0}",
        expectation: "toHaveClassName",
        values: function (element, className, message) {
            return [className, element.className, msg(message)];
        }
    });

    assert.className.noClassNameMessage = "${2}Expected object to have " +
        "className property";
    refute.className.noClassNameMessage = "${2}Expected object to have " +
        "className property";

    if (typeof module !== "undefined" && typeof require === "function") {
        referee.expect = function () {
            referee.expect = require("./expect");
            return referee.expect.apply(referee, arguments);
        };
    }

    return referee;
});
