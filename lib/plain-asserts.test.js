"use strict";

var referee = require("../lib/referee");

describe("plain asserts", function () {
    it("assertions expose plain asserts via method test", function () {
        referee.assert.isFunction(referee.assert.equals.test);
    });

    it("test returns promise", function () {
        referee.assert.isFunction(referee.assert.equals.test("", "").then);
    });

    it("failed resolves to error", function () {
        return referee.assert.equals.test("actual", "expected").then(undefined, function (message) {
            referee.assert.defined(message);
        });
    });

    it("proper default failure message", function () {
        return referee.assert.equals.test("actual", "expected").then(undefined, function (message) {
            referee.assert.equals(message, "[assert.equals] actual expected to be equal to expected");
        });
    });
    it("proper custom failure message without args", function () {
        return referee.assert.equals.test("actual",
            "expected",
            "custom message").then(undefined, function (message) {
            referee.assert.equals(message, "[assert.equals] custom message: actual expected to be equal to expected");
        });
    });
    it("successful resolves success", function () {
        return referee.assert.equals.test("expected", "expected").then(function (message) {
            referee.assert.equals(message, ["pass", "assert.equals", "expected", "expected"]);
        });
    });
    it("this.fail works from assertions", function () {
        return referee.assert.className.test({}, "Item").then(undefined, function (message) {
            referee.assert.equals(message,
                "[assert.className] Expected object to have className property");
        });
    });
});
