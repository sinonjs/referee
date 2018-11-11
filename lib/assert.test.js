"use strict";

var sinon = require("sinon");
var referee = require("../lib/referee");

describe("assert", function() {
    afterEach(function() {
        sinon.restore();
        referee.off();
        referee.resetCount();
        delete referee.throwOnFailure;
    });

    context("when called with wrong number of arguments", function() {
        it("throws an Error", function() {
            try {
                referee.assert();
            } catch (error) {
                referee.assert.equals(
                    error.message,
                    "[assert] Expected to receive at least 1 argument"
                );
            }
        });
    });

    it("allows true", function() {
        var okListener = sinon.spy();
        referee.on("pass", okListener);

        referee.assert(true);

        sinon.assert.calledOnce(okListener);
        sinon.assert.calledWith(okListener, "assert");
    });

    it("allows truthy values", function() {
        referee.assert({});
        referee.assert([]);
        referee.assert("Truthy");
        referee.assert(1);
        referee.assert(/a/);
    });

    it("allows true with message", function() {
        referee.assert(true, "s'aright");
    });

    it("does not allow false", function() {
        referee.assert.exception(
            function() {
                referee.assert(false);
            },
            { message: "[assert] Expected false to be truthy" }
        );
    });

    it("does not allow falsy values", function() {
        referee.assert.exception(function() {
            referee.assert("");
        });

        referee.assert.exception(function() {
            referee.assert(0);
        });

        referee.assert.exception(function() {
            referee.assert(NaN);
        });

        referee.assert.exception(function() {
            referee.assert(null);
        });

        referee.assert.exception(function() {
            referee.assert(undefined);
        });
    });

    it("does not allow false with message", function() {
        referee.assert.exception(function() {
            referee.assert(false, "Some message");
        });
    });

    it("fails with generated message", function() {
        try {
            referee.assert(false);
            throw new Error("Didn't fail");
        } catch (e) {
            referee.assert.equals(e.name, "AssertionError");
            referee.assert.equals(
                e.message,
                "[assert] Expected false to be truthy"
            );
        }
    });

    it("fails with custom message", function() {
        try {
            referee.assert(false, "False FTW");
            throw new Error("Didn't fail");
        } catch (e) {
            referee.assert.equals(e.name, "AssertionError");
            referee.assert.equals(e.message, "False FTW");
        }
    });

    it("updates assertion count", function() {
        referee.resetCount();

        try {
            referee.assert(true);
            referee.assert(false);
            // eslint-disable-next-line no-empty
        } catch (e) {}

        referee.assert.equals(referee.count, 2);
    });

    it("fails if not passed arguments", function() {
        try {
            referee.assert();
            throw new Error("Expected assert to fail");
        } catch (e) {
            referee.assert.equals(
                e.message,
                "[assert] Expected to receive at least 1 argument"
            );
        }
    });

    it("does not throw if not configured to", function() {
        referee.throwOnFailure = false;
        referee.assert(false);
    });

    context("when calling .toString()", function() {
        it("should return 'referee.assert()'", function() {
            referee.assert.equals(
                referee.assert.toString(),
                "referee.assert()"
            );
        });
    });
});
