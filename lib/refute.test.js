"use strict";

var sinon = require("sinon");
var referee = require("../lib/referee");

describe("refute", function() {
    afterEach(function() {
        referee.off();
        referee.resetCount();
        delete referee.throwOnFailure;
    });

    context("when called with wrong number of arguments", function() {
        it("throws an Error", function() {
            try {
                referee.refute();
            } catch (error) {
                referee.assert.equals(
                    error.message,
                    "[refute] Expected to receive at least 1 argument"
                );
            }
        });
    });

    it("allows false", function() {
        var okListener = sinon.spy();
        referee.on("pass", okListener);

        referee.refute(false);

        sinon.assert.calledOnce(okListener);
        sinon.assert.calledWith(okListener, "refute");
    });

    it("allows falsy values", function() {
        referee.refute(undefined);
        referee.refute(null);
        referee.refute(0);
        referee.refute("");
        referee.refute(false);
    });

    it("allows false with message", function() {
        referee.refute(false, "s'aright");
    });

    it("does not allow true", function() {
        referee.assert.exception(
            function() {
                referee.refute(true);
            },
            { message: "[refute] Expected true to be falsy" }
        );
    });

    it("does not allow truthy values", function() {
        referee.assert.exception(function() {
            referee.refute("a");
        });

        referee.assert.exception(function() {
            referee.refute(1);
        });

        referee.assert.exception(function() {
            referee.refute(true);
        });

        referee.assert.exception(function() {
            referee.refute(new Date());
        });
    });

    it("does not allow true with message", function() {
        referee.assert.exception(function() {
            referee.refute(true, "Some message");
        });
    });

    it("fails with generated message", function() {
        try {
            referee.refute(true);
            throw new Error("Didn't fail");
        } catch (e) {
            referee.assert.equals(e.name, "AssertionError");
            referee.assert.equals(
                e.message,
                "[refute] Expected true to be falsy"
            );
        }
    });

    it("fails with custom message", function() {
        try {
            referee.refute(true, "True FTW");
            throw new Error("Didn't fail");
        } catch (e) {
            referee.assert.equals(e.name, "AssertionError");
            referee.assert.equals(e.message, "True FTW");
        }
    });

    it("updates assertion count", function() {
        referee.resetCount();

        try {
            referee.refute(false);
            referee.refute(true);
            // eslint-disable-next-line no-empty
        } catch (e) {}

        referee.assert.equals(referee.count, 2);
    });

    it("fails if not passed arguments", function() {
        try {
            referee.refute();
            throw new Error("Expected assert to fail");
        } catch (e) {
            referee.assert.equals(
                e.message,
                "[refute] Expected to receive at least 1 argument"
            );
        }
    });

    it("does not throw if not configured to", function() {
        referee.throwOnFailure = false;
        referee.refute(true);
    });

    context("when calling .toString()", function() {
        it("should return 'referee.refute()'", function() {
            referee.assert.equals(
                referee.refute.toString(),
                "referee.refute()"
            );
        });
    });
});
