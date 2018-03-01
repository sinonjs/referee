"use strict";

var sandbox = require("sinon").createSandbox();
var referee = require("../lib/referee");

describe("assert", function () {
    beforeEach(function () {
        sandbox.spy(referee, "fail");

        referee.format = sandbox.spy(function (object) {
            return String(object);
        });

        this.okListener = sandbox.spy();
        referee.on("pass", this.okListener);
        this.failListener = sandbox.spy();
        referee.on("failure", this.failListener);
    });

    afterEach(function () {
        sandbox.restore();
        delete referee.listeners;
        referee.count = 0;
        delete referee.throwOnFailure;
    });

    it("allows true", function () {
        var okListener = sandbox.spy();
        referee.on("pass", okListener);

        referee.assert(true);

        sandbox.assert.calledOnce(okListener);
        sandbox.assert.calledWith(okListener, "assert");
    });

    it("allows truthy values", function () {
        referee.assert({});
        referee.assert([]);
        referee.assert("Truthy");
        referee.assert(1);
        referee.assert(/a/);
    });

    it("allows true with message", function () {
        referee.assert(true, "s'aright");
    });

    it("does not allow false", function () {
        referee.assert.exception(function () {
            referee.assert(false);
        }, {message: "[assert] Expected false to be truthy"});
    });

    it("does not allow falsy values", function () {
        referee.assert.exception(function () {
            referee.assert("");
        });

        referee.assert.exception(function () {
            referee.assert(0);
        });

        referee.assert.exception(function () {
            referee.assert(NaN);
        });

        referee.assert.exception(function () {
            referee.assert(null);
        });

        referee.assert.exception(function () {
            referee.assert(undefined);
        });
    });

    it("does not allow false with message", function () {
        referee.assert.exception(function () {
            referee.assert(false, "Some message");
        });
    });

    it("fails with generated message", function () {
        try {
            referee.assert(false);
            throw new Error("Didn't fail");
        } catch (e) {
            referee.assert.equals(e.name, "AssertionError");
            referee.assert.equals(e.message, "[assert] Expected false to be truthy");
        }
    });

    it("fails with custom message", function () {
        try {
            referee.assert(false, "False FTW");
            throw new Error("Didn't fail");
        } catch (e) {
            referee.assert.equals(e.name, "AssertionError");
            referee.assert.equals(e.message, "False FTW");
        }
    });

    it("updates assertion count", function () {
        referee.count = 0;

        try {
            referee.assert(true);
            referee.assert(false);
        // eslint-disable-next-line no-empty
        } catch (e) {}

        referee.assert.equals(referee.count, 2);
    });

    it("formats value with assert.format", function () {
        referee.format = sandbox.spy();

        try {
            referee.assert(false);
        // eslint-disable-next-line no-empty
        } catch (e) {}

        sandbox.assert.calledOnce(referee.format);
        sandbox.assert.calledWith(referee.format, false);
    });

    it("fails if not passed arguments", function () {
        try {
            referee.assert();
            throw new Error("Expected assert to fail");
        } catch (e) {
            referee.assert.equals(e.message, "[assert] Expected to receive at least 1 argument");
        }
    });

    it("does not throw if not configured to", function () {
        referee.throwOnFailure = false;
        referee.assert(false);
    });
});
