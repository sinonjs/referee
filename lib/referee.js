"use strict";

var assertArgNum = require("./assert-arg-num");
var defineAssertion = require("./define-assertion");
var expect = require("./expect");
var bane = require("bane");

var referee = bane.createEventEmitter();

referee.countAssertion = function countAssertion() {
    if (typeof referee.count !== "number") {
        referee.count = 0;
    }
    referee.count += 1;
};

referee.assert = function assert(actual, message) {
    referee.countAssertion();
    if (!assertArgNum(referee.fail, "assert", arguments, 1)) {
        return;
    }

    if (!actual) {
        referee.fail(
            message || "[assert] Expected " + String(actual) + " to be truthy"
        );
        return;
    }

    referee.emit("pass", "assert", message || "", actual);
};

referee.assert.toString = function() {
    return "referee.assert()";
};

referee.refute = function refute(actual, message) {
    referee.countAssertion();
    if (!assertArgNum(referee.fail, "refute", arguments, 1)) {
        return;
    }

    if (actual) {
        referee.fail(
            message || "[refute] Expected " + String(actual) + " to be falsy"
        );
        return;
    }

    referee.emit("pass", "refute", message || "", actual);
};

referee.refute.toString = function() {
    return "referee.refute()";
};

referee.add = function add(name, opt) {
    var refuteArgs = opt.refute ? opt.refute.length : opt.assert.length;

    if (!opt.refute) {
        opt.refute = function() {
            return !opt.assert.apply(this, arguments);
        };
    }

    defineAssertion(
        referee,
        "assert",
        name,
        opt.assert,
        opt.assert.length,
        opt.values
    );
    defineAssertion(
        referee,
        "refute",
        name,
        opt.refute,
        refuteArgs,
        opt.values
    );

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

referee.pass = function(message) {
    referee.emit.apply(referee, message);
};

referee.fail = function(message, errorProperties) {
    var exception = new Error(message);
    exception.name = "AssertionError";
    exception.code = "ERR_ASSERTION";
    if (errorProperties) {
        Object.keys(errorProperties).forEach(function(key) {
            exception[key] = errorProperties[key];
        });
    }

    try {
        throw exception;
    } catch (e) {
        referee.emit("failure", e);
    }

    if (typeof referee.throwOnFailure !== "boolean" || referee.throwOnFailure) {
        throw exception;
    }
};

require("./assertions/defined")(referee);
require("./assertions/class-name")(referee);
require("./assertions/contains")(referee);
require("./assertions/equals")(referee);
require("./assertions/exception")(referee);
require("./assertions/greater")(referee);
require("./assertions/has-arity")(referee);
require("./assertions/has-prototype")(referee);
require("./assertions/is-array")(referee);
require("./assertions/is-array-buffer")(referee);
require("./assertions/is-array-like")(referee);
require("./assertions/is-boolean")(referee);
require("./assertions/is-data-view")(referee);
require("./assertions/is-date")(referee);
require("./assertions/is-error")(referee);
require("./assertions/is-eval-error")(referee);
require("./assertions/is-false")(referee);
require("./assertions/is-float-32-array")(referee);
require("./assertions/is-float-64-array")(referee);
require("./assertions/is-function")(referee);
require("./assertions/is-infinity")(referee);
require("./assertions/is-int-8-array")(referee);
require("./assertions/is-int-16-array")(referee);
require("./assertions/is-int-32-array")(referee);
require("./assertions/is-intl-collator")(referee);
require("./assertions/is-intl-date-time-format")(referee);
require("./assertions/is-intl-number-format")(referee);
require("./assertions/is-map")(referee);
require("./assertions/is-nan")(referee);
require("./assertions/is-null")(referee);
require("./assertions/is-number")(referee);
require("./assertions/is-object")(referee);
require("./assertions/is-promise")(referee);
require("./assertions/is-range-error")(referee);
require("./assertions/is-reference-error")(referee);
require("./assertions/is-reg-exp")(referee);
require("./assertions/is-set")(referee);
require("./assertions/is-string")(referee);
require("./assertions/is-symbol")(referee);
require("./assertions/is-syntax-error")(referee);
require("./assertions/is-true")(referee);
require("./assertions/is-type-error")(referee);
require("./assertions/is-uri-error")(referee);
require("./assertions/is-u-int-16-array")(referee);
require("./assertions/is-u-int-32-array")(referee);
require("./assertions/is-u-int-8-array")(referee);
require("./assertions/is-u-int-8-clamped-array")(referee);
require("./assertions/is-weak-map")(referee);
require("./assertions/is-weak-set")(referee);
require("./assertions/keys")(referee);
require("./assertions/less")(referee);
require("./assertions/match")(referee);
require("./assertions/near")(referee);
require("./assertions/same")(referee);
require("./assertions/tag-name")(referee);
require("./assertions/json")(referee);
require("./assertions/match-json")(referee);

referee.expect = function() {
    expect.init(referee);
    return expect.apply(referee, arguments);
};

module.exports = referee;
