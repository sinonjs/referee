"use strict";

var createAdd = require("./create-add");
var createAssert = require("./create-assert");
var createRefute = require("./create-refute");
var expectImpl = require("./expect");
var bane = require("bane");

var referee = bane.createEventEmitter();

referee.countAssertion = function countAssertion() {
    if (typeof referee.count !== "number") {
        referee.count = 0;
    }
    referee.count += 1;
};

referee.assert = createAssert(referee);
referee.refute = createRefute(referee);
referee.add = createAdd(referee);

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

referee.expect = function expect() {
    expectImpl.init(referee);
    return expectImpl.apply(referee, arguments);
};

module.exports = referee;
