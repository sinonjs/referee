"use strict";

var expect = require("./expect");
var _ = require("lodash");
var samsam = require("samsam");
var bane = require("bane");
var Promise = require("es6-promise").Promise;

var toString = Object.prototype.toString;
var slice = Array.prototype.slice;
var reduce = Array.prototype.reduce;
var referee = bane.createEventEmitter();

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
    return reduce.call(values, function (msg, value, index) {
        return interpolate(msg, index, referee.format(value));
    }, message);
}

function interpolateProperties(message, properties) {
    return reduce.call(Object.keys(properties), function (str, name) {
        var formattedValue = name === "customMessage"
            ? referee.prepareMessage(properties[name])
            : referee.format(properties[name]);
        return interpolate(str, name, formattedValue);
    }, message || "");
}

// Internal helper. Used throughout to fail assertions if they receive
// too few arguments. The name is provided for a helpful error message.
function assertArgNum(name, args, num, fail) {
    fail = fail || referee.fail;
    if (args.length < num) {
        fail("[" + name + "] Expected to receive at least " +
                    num + " argument" + (num > 1 ? "s" : ""));
        return false;
    }
    return true;
}

function createAssertion(type, name, func, minArgs, messageValues, pass, fail) {

    var assertion = function () {

        var fullName = type + "." + name;
        var failed = false;

        if (!assertArgNum(fullName, arguments, minArgs || func.length, fail)) {
            return;
        }

        var args = slice.call(arguments, 0);
        var namedValues = {};

        if (typeof messageValues === "function") {
            var replacedValues = messageValues.apply(this, args);
            if (typeof (replacedValues) === "object") {
                namedValues = replacedValues;
            } else {
                args = replacedValues;
            }
        }

        var ctx = {
            fail: function (msg) {
                failed = true;
                delete this.fail;
                var message = referee[type][name][msg] || msg;
                message = interpolatePosArg(message, args);
                message = interpolateProperties(message, this);
                message = interpolateProperties(message, namedValues);
                fail("[" + type + "." + name + "] " + message);
                return false;
            }
        };

        if (!func.apply(ctx, arguments) && !failed) {
            // when a function returns false and hasn't already failed with a custom message,
            // fail with default message
            ctx.fail("message");
        }

        if (!failed) {
            pass(["pass", fullName].concat(args));
        }
    };

    return assertion;
}

// Internal helper. Not the most elegant of functions, but it takes
// care of all the nitty-gritty of assertion functions: counting,
// verifying parameter count, interpolating messages with actual
// values and so on.
function defineAssertion(type, name, func, minArgs, messageValues) {

    referee[type][name] = function () {
        referee.countAssertion();
        var assertion = createAssertion(type, name, func, minArgs, messageValues, referee.pass, referee.fail);
        assertion.apply(null, arguments);
    };
    referee[type][name].test = function () {
        var args = arguments;
        return new Promise(function (resolve, reject) {
            var assertion = createAssertion(type, name, func, minArgs, messageValues, resolve, reject);
            assertion.apply(null, args);
        });
    };
}

function assert(actual, message) {
    referee.countAssertion();
    if (!assertArgNum("assert", arguments, 1)) { return; }

    if (!actual) {
        var v = referee.format(actual);
        referee.fail(message || "[assert] Expected " + v + " to be truthy");
    } else {
        referee.emit("pass", "assert", message || "", actual);
    }
}

referee.assert = assert;

assert.toString = function () {
    return "referee.assert()";
};

function refute(actual, message) {
    referee.countAssertion();
    if (!assertArgNum("refute", arguments, 1)) { return; }

    if (actual) {
        var v = referee.format(actual);
        referee.fail(message || "[refute] Expected " + v + " to be falsy");
    } else {
        referee.emit("pass", "refute", message || "", actual);
    }
}
referee.refute = refute;

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
            referee.expect.wrapAssertion(name, opt.expectation, referee);
        } else {
            assert[name].expectationName = opt.expectation;
            refute[name].expectationName = opt.expectation;
        }
    }
};

referee.count = 0;

referee.pass = function (message) {
    referee.emit.apply(referee, message);
};

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

referee.prepareMessage = function msg(message) {
    if (!message) {
        return "";
    }
    return message + (/[.:!?]$/.test(message) ? " " : ": ");
};

function actualAndExpectedMessageValues(actual, expected, message) {
    return {
        actual: actual,
        expected: expected,
        customMessage: message
    };
}

function actualMessageValues(actual, message) {
    return {
        actual: actual,
        customMessage: message
    };
}

function actualAndTypeOfMessageValues(actual, message) {
    return {
        actual: actual,
        actualType: typeof actual,
        customMessage: message
    };
}

referee.add("same", {
    assert: function (actual, expected) {
        return samsam.identical(actual, expected);
    },
    refute: function (actual, expected) {
        return !samsam.identical(actual, expected);
    },
    assertMessage: "${customMessage}${actual} expected to be the same object as ${expected}",
    refuteMessage: "${customMessage}${actual} expected not to be the same object as ${expected}",
    expectation: "toBe",
    values: actualAndExpectedMessageValues
});

// Extract/replace with separate module that does a more detailed
// visualization of multi-line strings
function multiLineStringDiff(actual, expected, message) {
    if (actual === expected) { return true; }

    var heading = assert.equals.multiLineStringHeading;
    var failureText = interpolateProperties(heading, { customMessage: message });
    var actualLines = actual.split("\n");
    var expectedLines = expected.split("\n");
    var lineCount = Math.max(expectedLines.length, actualLines.length);
    var lines = [];

    for (var i = 0; i < lineCount; ++i) {
        if (expectedLines[i] !== actualLines[i]) {
            lines.push("line " + (i + 1) + ": " + (expectedLines[i] || "") +
                       "\nwas:    " + (actualLines[i] || ""));
        }
    }

    referee.fail("[assert.equals] " + failureText + lines.join("\n\n"));
    return false;
}

referee.add("equals", {
    // Uses arguments[2] because the function's .length is used to determine
    // the minimum required number of arguments.
    assert: function (actual, expected) {
        if (typeof actual === "string" && typeof expected === "string" &&
                (actual.indexOf("\n") >= 0 ||
                 expected.indexOf("\n") >= 0)) {
            return multiLineStringDiff(actual, expected, arguments[2]);
        }

        return samsam.deepEqual(actual, expected);
    },

    refute: function (actual, expected) {
        return !samsam.deepEqual(actual, expected);
    },

    assertMessage: "${customMessage}${actual} expected to be equal to ${expected}",
    refuteMessage: "${customMessage}${actual} expected not to be equal to ${expected}",
    expectation: "toEqual",
    values: actualAndExpectedMessageValues
});

assert.equals.multiLineStringHeading = "${customMessage}Expected multi-line strings " +
    "to be equal:\n";

referee.add("greater", {
    assert: function (actual, expected) {
        return actual > expected;
    },

    assertMessage: "${customMessage}Expected ${actual} to be greater than ${expected}",
    refuteMessage: "${customMessage}Expected ${actual} to be less than or equal to ${expected}",
    expectation: "toBeGreaterThan",
    values: actualAndExpectedMessageValues
});

referee.add("less", {
    assert: function (actual, expected) {
        return actual < expected;
    },

    assertMessage: "${customMessage}Expected ${actual} to be less than ${expected}",
    refuteMessage: "${customMessage}Expected ${actual} to be greater than or equal to ${expected}",
    expectation: "toBeLessThan",
    values: actualAndExpectedMessageValues
});

referee.add("defined", {
    assert: function (actual) {
        return typeof actual !== "undefined";
    },
    assertMessage: "${customMessage}Expected to be defined",
    refuteMessage: "${customMessage}Expected ${actual} (${actualType}) not to be defined",
    expectation: "toBeDefined",
    values: actualAndTypeOfMessageValues
});

referee.add("isNull", {
    assert: function (actual) {
        return actual === null;
    },
    assertMessage: "${customMessage}Expected ${actual} to be null",
    refuteMessage: "${customMessage}Expected not to be null",
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
            this.exceptionMessage = e.message;
            return this.fail("exceptionMessage");
        }

        return passed;
    },

    refute: function (actual, matcher) {
        var passed;

        try {
            passed = referee.match(actual, matcher);
        } catch (e) {
            this.exceptionMessage = e.message;
            return this.fail("exceptionMessage");
        }

        return !passed;
    },

    assertMessage: "${customMessage}${actual} expected to match ${expected}",
    refuteMessage: "${customMessage}${actual} expected not to match ${expected}",
    expectation: "toMatch",
    values: actualAndExpectedMessageValues
});

assert.match.exceptionMessage = refute.match.exceptionMessage = "${customMessage}${exceptionMessage}";

referee.add("isObject", {
    assert: function (actual) {
        return typeof actual === "object" && !!actual;
    },
    assertMessage: "${customMessage}${actual} (${actualType}) expected to be object and not null",
    refuteMessage: "${customMessage}${actual} expected to be null or not an object",
    expectation: "toBeObject",
    values: actualAndTypeOfMessageValues
});

referee.add("isFunction", {
    assert: function (actual) {
        return typeof actual === "function";
    },
    assertMessage: "${customMessage}${actual} (${actualType}) expected to be function",
    refuteMessage: "${customMessage}${actual} expected not to be function",
    expectation: "toBeFunction",
    values: function (actual, message) {
        return {
            actual: String(actual).replace("\n", ""),
            actualType: typeof actual,
            customMessage: message
        };
    }
});

referee.add("isTrue", {
    assert: function (actual) {
        return actual === true;
    },
    assertMessage: "${customMessage}Expected ${actual} to be true",
    refuteMessage: "${customMessage}Expected ${actual} to not be true",
    expectation: "toBeTrue",
    values: actualMessageValues
});

referee.add("isFalse", {
    assert: function (actual) {
        return actual === false;
    },
    assertMessage: "${customMessage}Expected ${actual} to be false",
    refuteMessage: "${customMessage}Expected ${actual} to not be false",
    expectation: "toBeFalse",
    values: actualMessageValues
});

referee.add("isString", {
    assert: function (actual) {
        return typeof actual === "string";
    },
    assertMessage: "${customMessage}Expected ${actual} (${actualType}) to be string",
    refuteMessage: "${customMessage}Expected ${actual} not to be string",
    expectation: "toBeString",
    values: actualAndTypeOfMessageValues
});

referee.add("isBoolean", {
    assert: function (actual) {
        return typeof actual === "boolean";
    },
    assertMessage: "${customMessage}Expected ${actual} (${actualType}) to be boolean",
    refuteMessage: "${customMessage}Expected ${actual} not to be boolean",
    expectation: "toBeBoolean",
    values: actualAndTypeOfMessageValues
});

referee.add("isNumber", {
    assert: function (actual) {
        return typeof actual === "number" && !isNaN(actual);
    },
    assertMessage: "${customMessage}Expected ${actual} (${actualType}) to be a non-NaN number",
    refuteMessage: "${customMessage}Expected ${actual} to be NaN or a non-number value",
    expectation: "toBeNumber",
    values: actualAndTypeOfMessageValues
});

referee.add("isNaN", {
    assert: function (actual) {
        return typeof actual === "number" && isNaN(actual);
    },
    assertMessage: "${customMessage}Expected ${actual} to be NaN",
    refuteMessage: "${customMessage}Expected not to be NaN",
    expectation: "toBeNaN",
    values: actualAndTypeOfMessageValues
});

referee.add("isArray", {
    assert: function (actual) {
        return toString.call(actual) === "[object Array]";
    },
    assertMessage: "${customMessage}Expected ${actual} to be array",
    refuteMessage: "${customMessage}Expected ${actual} not to be array",
    expectation: "toBeArray",
    values: actualAndTypeOfMessageValues
});

function isArrayLike(object) {
    return Array.isArray(object) ||
        (!!object && typeof object.length === "number" &&
        typeof object.splice === "function") ||
        _.isArguments(object);
}

referee.isArrayLike = isArrayLike;

referee.add("isArrayLike", {
    assert: function (actual) {
        return isArrayLike(actual);
    },
    assertMessage: "${customMessage}Expected ${actual} to be array like",
    refuteMessage: "${customMessage}Expected ${actual} not to be array like",
    expectation: "toBeArrayLike",
    values: actualAndTypeOfMessageValues
});

function exactKeys(object, keys) {
    var keyMap = {};
    var keyCnt = 0;
    for (var i = 0; i < keys.length; i++) {
        keyMap[keys[i]] = true;
        keyCnt += 1;
    }
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            if (!keyMap[key]) {
                return false;
            }
            keyCnt -= 1;
        }
    }
    return keyCnt === 0;
}

referee.add("keys", {
    assert: function (actual, keys) {
        return exactKeys(actual, keys);
    },
    assertMessage: "${customMessage}Expected ${actualObject} to have exact keys ${keys}",
    refuteMessage: "${customMessage}Expected not to have exact keys ${keys}",
    expectation: "toHaveKeys",
    values: function (actual, keys, message) {
        return {
            actualObject: actual,
            keys: keys,
            customMessage: message
        };
    }
});

function captureException(callback) {
    try { callback(); } catch (e) { return e; }
    return null;
}

referee.captureException = captureException;

referee.add("exception", {
    assert: function (callback) {
        var matcher = arguments[1];
        var customMessage = arguments[2];

        if (typeof matcher === "string") {
            customMessage = matcher;
            matcher = undefined;
        }

        this.expected = matcher;
        this.customMessage = customMessage;

        var err = captureException(callback);

        if (err) {
            this.actualExceptionType = err.name;
            this.actualExceptionMessage = err.message;
            this.actualExceptionStack = err.stack;
        }

        if (!err) {
            if (typeof matcher === "object") {
                return this.fail("typeNoExceptionMessage");
            }
            return this.fail("message");

        }

        if (typeof matcher === "object" && !referee.match(err, matcher)) {
            return this.fail("typeFailMessage");
        }

        if (typeof matcher === "function" && matcher(err) !== true) {
            return this.fail("matchFailMessage");
        }

        return true;
    },

    refute: function (callback) {
        var err = captureException(callback);

        if (err) {
            this.customMessage = arguments[1];
            this.actualExceptionType = err.name;
            this.actualExceptionMessage = err.message;
            return false;
        }

        return true;
    },

    expectation: "toThrow",
    assertMessage: "${customMessage}Expected exception",
    refuteMessage: "${customMessage}Expected not to throw but threw ${actualExceptionType} (${actualExceptionMessage})"
});

assert.exception.typeNoExceptionMessage = "${customMessage}Expected ${expected} but no exception was thrown";
assert.exception.typeFailMessage = "${customMessage}Expected ${expected} but threw ${actualExceptionType} (${actualExceptionMessage})\n${actualExceptionStack}";
assert.exception.matchFailMessage = "${customMessage}Expected thrown ${actualExceptionType} (${actualExceptionMessage}) to pass matcher function";


referee.add("near", {
    assert: function (actual, expected, delta) {
        return Math.abs(actual - expected) <= delta;
    },
    assertMessage: "${customMessage}Expected ${actual} to be equal to ${expected} +/- ${delta}",
    refuteMessage: "${customMessage}Expected ${actual} not to be equal to ${expected} +/- ${delta}",
    expectation: "toBeNear",
    values: function (actual, expected, delta, message) {
        return {
            actual: actual,
            expected: expected,
            delta: delta,
            customMessage: message
        };
    }
});

referee.add("hasPrototype", {
    assert: function (actual, protoObj) {
        return protoObj.isPrototypeOf(actual);
    },
    assertMessage: "${customMessage}Expected ${actual} to have ${expected} on its prototype chain",
    refuteMessage: "${customMessage}Expected ${actual} not to have ${expected} on its " +
        "prototype chain",
    expectation: "toHavePrototype",
    values: actualAndExpectedMessageValues
});

referee.add("contains", {
    assert: function (haystack, needle) {
        return _.include(haystack, needle);
    },
    assertMessage: "${customMessage}Expected [${actual}] to contain ${expected}",
    refuteMessage: "${customMessage}Expected [${actual}] not to contain ${expected}",
    expectation: "toContain",
    values: actualAndExpectedMessageValues
});

referee.add("tagName", {
    assert: function (element, tagName) {
        // Uses arguments[2] because the function's .length is used to
        // determine the minimum required number of arguments.
        if (!element.tagName) {
            return this.fail("noTagNameMessage");
        }

        return tagName.toLowerCase &&
            tagName.toLowerCase() === element.tagName.toLowerCase();
    },
    assertMessage: "${customMessage}Expected tagName to be ${expected} but was ${actual}",
    refuteMessage: "${customMessage}Expected tagName not to be ${actual}",
    expectation: "toHaveTagName",
    values: function (element, tagName, message) {
        return {
            actualElement: element,
            actual: element.tagName,
            expected: tagName,
            customMessage: message
        };
    }
});

assert.tagName.noTagNameMessage = "${customMessage}Expected ${actualElement} to have tagName " +
    "property";
refute.tagName.noTagNameMessage = "${customMessage}Expected ${actualElement} to have tagName " +
    "property";

referee.add("className", {
    assert: function (element, name) {
        if (typeof element.className === "undefined") {
            return this.fail("noClassNameMessage");
        }

        var expected = typeof name === "string" ? name.split(" ") : name;
        var actual = element.className.split(" ");
        var i, l;
        for (i = 0, l = expected.length; i < l; i++) {
            if (!_.include(actual, expected[i])) { return false; }
        }

        return true;
    },
    assertMessage: "${customMessage}Expected object's className to include ${expected} " +
        "but was ${actual}",
    refuteMessage: "${customMessage}Expected object's className not to include ${expected}",
    expectation: "toHaveClassName",
    values: function (element, className, message) {
        return {
            actualElement: element,
            actual: element.className,
            expected: className,
            customMessage: message
        };
    }
});

assert.className.noClassNameMessage = "${customMessage}Expected object to have " +
    "className property";
refute.className.noClassNameMessage = "${customMessage}Expected object to have " +
    "className property";

referee.expect = function () {
    expect.init(referee);
    return expect.apply(referee, arguments);
};

module.exports = referee;
