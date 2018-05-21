"use strict";

var actualAndExpectedMessageValues = require("./actual-and-expected-message-values");
var actualAndTypeOfMessageValues = require("./actual-and-type-of-message-values");
var assertArgNum = require("./assert-arg-num");
var captureException = require("./capture-exception");
var interpolatePosArg = require("./interpolate-pos-arg");
var interpolateProperties = require("./interpolate-properties");
var expect = require("./expect");
var bane = require("bane");
var includes = require("lodash.includes");
var isArguments = require("lodash.isarguments");
var Promise = require("es6-promise").Promise;

var toString = Object.prototype.toString;
var slice = Array.prototype.slice;
var referee = bane.createEventEmitter();

referee.countAssertion = function countAssertion() {
    if (typeof referee.count !== "number") { referee.count = 0; }
    referee.count += 1;
};

function createAssertion(type, name, func, minArgs, messageValues, pass, fail) {

    var assertion = function () {

        var fullName = type + "." + name;
        var failed = false;

        if (!assertArgNum(referee.fail, fullName, arguments, minArgs || func.length, fail)) {
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
                message = interpolateProperties(referee, message, this);
                message = interpolateProperties(referee, message, namedValues);
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


referee.assert = function assert(actual, message) {
    referee.countAssertion();
    if (!assertArgNum(referee.fail, "assert", arguments, 1)) {
        return;
    }

    if (!actual) {
        referee.fail(message || "[assert] Expected " + String(actual) + " to be truthy");
        return;
    }

    referee.emit("pass", "assert", message || "", actual);
};

referee.assert.toString = function () {
    return "referee.assert()";
};

referee.refute = function refute(actual, message) {
    referee.countAssertion();
    if (!assertArgNum(referee.fail, "refute", arguments, 1)) {
        return;
    }

    if (actual) {
        referee.fail(message || "[refute] Expected " + String(actual) + " to be falsy");
        return;
    }

    referee.emit("pass", "refute", message || "", actual);
};

referee.refute.toString = function () {
    return "referee.refute()";
};

referee.add = function add(name, opt) {
    var refuteArgs = opt.refute ? opt.refute.length : opt.assert.length;

    if (!opt.refute) {
        opt.refute = function () {
            return !opt.assert.apply(this, arguments);
        };
    }

    defineAssertion("assert", name, opt.assert, opt.assert.length, opt.values);
    defineAssertion("refute", name, opt.refute, refuteArgs, opt.values);

    referee.assert[name].message = opt.assertMessage;
    referee.refute[name].message = opt.refuteMessage;

    if (!opt.expectation) {
        return;
    }

    if (referee.expect && referee.expect.wrapAssertion) {
        referee.expect.wrapAssertion(name, opt.expectation, referee);
        return;
    }

    referee.assert[name].expectationName = opt.expectation;
    referee.refute[name].expectationName = opt.expectation;
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

require("./assertions/same")(referee);
require("./assertions/equals")(referee);
require("./assertions/greater")(referee);
require("./assertions/less")(referee);
require("./assertions/defined")(referee);
require("./assertions/is-null")(referee);
require("./assertions/match")(referee);
require("./assertions/is-object")(referee);
require("./assertions/is-function")(referee);
require("./assertions/is-true")(referee);
require("./assertions/is-false")(referee);
require("./assertions/is-string")(referee);
require("./assertions/is-boolean")(referee);

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
        isArguments(object);
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

referee.assert.exception.typeNoExceptionMessage = "${customMessage}Expected ${expected} but no exception was thrown";
referee.assert.exception.typeFailMessage = "${customMessage}Expected ${expected} but threw ${actualExceptionType} (${actualExceptionMessage})\n${actualExceptionStack}";
referee.assert.exception.matchFailMessage = "${customMessage}Expected thrown ${actualExceptionType} (${actualExceptionMessage}) to pass matcher function";

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
        return includes(haystack, needle);
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

referee.assert.tagName.noTagNameMessage = "${customMessage}Expected ${actualElement} to have tagName " +
    "property";
referee.refute.tagName.noTagNameMessage = "${customMessage}Expected ${actualElement} to have tagName " +
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
            if (!includes(actual, expected[i])) { return false; }
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

referee.assert.className.noClassNameMessage = "${customMessage}Expected object to have " +
    "className property";
referee.refute.className.noClassNameMessage = "${customMessage}Expected object to have " +
    "className property";

referee.expect = function () {
    expect.init(referee);
    return expect.apply(referee, arguments);
};

module.exports = referee;
