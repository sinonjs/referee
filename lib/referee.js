"use strict";

var assertArgNum = require("./assert-arg-num");
var interpolatePosArg = require("./interpolate-pos-arg");
var interpolateProperties = require("./interpolate-properties");
var expect = require("./expect");
var bane = require("bane");
var Promise = require("es6-promise").Promise;

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

[
    "./assertions/defined",
    "./assertions/class-name",
    "./assertions/contains",
    "./assertions/equals",
    "./assertions/exception",
    "./assertions/greater",
    "./assertions/has-prototype",
    "./assertions/is-array",
    "./assertions/is-array-buffer",
    "./assertions/is-array-like",
    "./assertions/is-boolean",
    "./assertions/is-data-view",
    "./assertions/is-error",
    "./assertions/is-eval-error",
    "./assertions/is-false",
    "./assertions/is-float-32-array",
    "./assertions/is-float-64-array",
    "./assertions/is-function",
    "./assertions/is-infinity",
    "./assertions/is-nan",
    "./assertions/is-null",
    "./assertions/is-number",
    "./assertions/is-object",
    "./assertions/is-string",
    "./assertions/is-true",
    "./assertions/keys",
    "./assertions/less",
    "./assertions/match",
    "./assertions/near",
    "./assertions/same",
    "./assertions/tag-name"
].forEach(function (config) {
    require(config)(referee);
});

referee.expect = function () {
    expect.init(referee);
    return expect.apply(referee, arguments);
};

module.exports = referee;
