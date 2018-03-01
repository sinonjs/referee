"use strict";

var sandbox = require("sinon").createSandbox();
var referee = require("./referee");

describe("custom assertions", function() {
    beforeEach(function() {
        sandbox.spy(referee, "fail");

        referee.format = sandbox.spy(function (object) {
            return String(object);
        });

        this.okListener = sandbox.spy();
        referee.on("pass", this.okListener);
        this.failListener = sandbox.spy();
        referee.on("failure", this.failListener);
    });

    afterEach(function() {
        sandbox.restore();
        delete referee.listeners;
        referee.count = 0;
        delete referee.throwOnFailure;

        delete referee.assert.custom;
        delete referee.refute.custom;
    });

    it("should expose properties on this as message values", function () {
        referee.add("custom", {
            assert: function (actual, expected) {
                this.actual = actual + "?";
                this.expected = expected + "!";
                return false;
            },
            assertMessage: "${actual} ${expected}"
        });

        try {
            referee.assert.custom(2, 3);
            throw new Error("Didn't throw");
        } catch (e) {
            referee.assert.equals("[assert.custom] 2? 3!", e.message);
        }
    });

    it("should format interpolated property with format", function () {
        referee.add("custom", {
            assert: function (actual, expected) {
                this.actual = actual + "?";
                this.expected = expected + "!";
                return false;
            },
            assertMessage: "${actual} ${expected}"
        });

        try {
            referee.assert.custom(2, 3);
        } catch (e) {}

        sandbox.assert.calledWith(referee.format, "2?");
        sandbox.assert.calledWith(referee.format, "3!");
    });

    it("should not expose fail property", function () {
        referee.add("custom", {
            assert: function (actual, expected) {
                return false;
            },
            assertMessage: "${fail}"
        });

        try {
            referee.assert.custom(2, 3);
            throw new Error("Didn't throw");
        } catch (e) {
            referee.assert.equals("[assert.custom] ${fail}", e.message);
        }
    });

    it("should not leak properties between calls", function () {
        var i = 0;

        referee.add("custom", {
            assert: function (actual, expected) {
                if (i === 0) {
                    this.actual = "A";
                } else {
                    this.expected = "B";
                }

                i++;
                return false;
            },
            assertMessage: "${actual} ${expected}"
        });

        try {
            referee.assert.custom(4, 5);
        } catch (e) {}

        try {
            referee.assert.custom(2, 3);
            throw new Error("Didn't throw");
        } catch (err) {
            referee.assert.equals("[assert.custom] ${actual} B", err.message);
        }
    });

    it("should interpolate same property multiple times", function () {
        referee.add("custom", {
            assert: function (actual, expected) {
                this.actual = actual + "?";
                return false;
            },
            assertMessage: "${actual} ${actual}"
        });

        try {
            referee.assert.custom(2, 3);
            throw new Error("Didn't throw");
        } catch (e) {
            referee.assert.equals("[assert.custom] 2? 2?", e.message);
        }
    });

    it("should interpolate numeric placeholders multiple times", function () {
        referee.add("custom", {
            assert: function (actual, expected) {
                this.actual = actual + "?";
                return false;
            },
            assertMessage: "${0} ${0}"
        });

        try {
            referee.assert.custom(2, 3);
            throw new Error("Didn't throw");
        } catch (e) {
            referee.assert.equals("[assert.custom] 2 2", e.message);
        }
    });

    it("should add expectation if expect property is set", function () {
        referee.add("custom", {
            assert: function (actual) {
                return actual === "foo";
            },
            assertMessage: "Expected ${1} to be foo!",
            refuteMessage: "Expected not to be foo!",
            expectation: "toBeFoo"
        });


        referee.expect("foo").toBeFoo();
    });
});
