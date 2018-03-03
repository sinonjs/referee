"use strict";

var _ = require("lodash");
var objectAssign = require("object-assign");
var arrayFrom = require("array.from");

var expect = function (actual) {
    var expectation = objectAssign(Object.create(expect.expectation), {
        actual: actual,
        assertMode: true
    });

    expectation.not = objectAssign(Object.create(expectation), {
        assertMode: false
    });

    return expectation;
};

expect.expectation = Object.create(null);

expect.wrapAssertion = function (assertion, expectation, referee) {
    expect.expectation[expectation] = function () {
        var args = [this.actual].concat(arrayFrom(arguments));
        var type = this.assertMode ? "assert" : "refute";
        var callFunc;

        if (assertion === "assert") {
            callFunc = this.assertMode ? referee.assert : referee.refute;
        } else if (assertion === "refute") {
            callFunc = this.assertMode ? referee.refute : referee.assert;
        } else {
            callFunc = referee[type][assertion];
        }

        try {
            return callFunc.apply(referee.expect, args);
        } catch (e) {
            e.message = (e.message || "").replace(
                "[" + type + "." + assertion + "]",
                "[expect." + (this.assertMode ? "" : "not.") +
                    expectation + "]"
            );
            throw e;
        }
    };
};

expect.init = function (referee) {
    _.each(_.keys(referee.assert), function (name) {
        var expectationName = referee.assert[name].expectationName;
        if (expectationName) {
            expect.wrapAssertion(name, expectationName, referee);
        }
    });

    expect.wrapAssertion("assert", "toBeTruthy", referee);
    expect.wrapAssertion("refute", "toBeFalsy", referee);

    if (expect.expectation.toBeNear) {
        expect.expectation.toBeCloseTo = expect.expectation.toBeNear;
    }
};

module.exports = expect;
