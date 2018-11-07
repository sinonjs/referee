"use strict";

var assert = require("assert");
var referee = require("./referee");

describe("verify", function() {
    beforeEach(function() {
        referee.resetCount();
    });

    it("should set referee.count to zero", function() {
        var numberOfAssertions = 100;

        for (var i = 0; i < numberOfAssertions; i++) {
            referee.assert(true);
        }
        assert.equal(referee.count, numberOfAssertions);

        referee.verify(numberOfAssertions);

        assert.equal(referee.count, 0);
    });

    context("when called with zero expected argument", function() {
        it("should throw an error", function() {
            var error;
            try {
                referee.verify(0);
            } catch (err) {
                error = err;
            }

            assert.equal(
                error.message,
                "expected argument must be a number >= 1"
            );
        });
    });

    context("when called with non-number expected argument", function() {
        it("should throw an error", function() {
            var error;
            try {
                referee.verify("12");
            } catch (err) {
                error = err;
            }

            assert.equal(
                error.message,
                "expected argument must be a number >= 1"
            );
        });
    });

    context("when no assertions have been made", function() {
        it("should throw an Error", function() {
            var error;
            try {
                referee.verify();
            } catch (err) {
                error = err;
            }

            assert.equal(
                error.message,
                "Expected assertion count to be at least 1, but was 0"
            );
        });
    });

    context("when called without an expected value", function() {
        it("should not throw", function() {
            for (var i = 0; i < 1000; i++) {
                referee.assert(true);
                referee.verify();
            }
        });
    });

    context("when called with an expected value", function() {
        context("when expected === referee.count", function() {
            it("should not throw", function() {
                var limit = 1000;
                for (var i = 0; i < limit; i++) {
                    referee.assert(true);
                }

                referee.verify(limit);
            });
        });

        context("when expected !== referee.count", function() {
            it("should throw an error", function() {
                var limit = 10;
                var expectedCount = 2;
                var expectedMessage =
                    "Expected assertion count to be " +
                    expectedCount +
                    " but was " +
                    limit;
                var error;

                for (var i = 0; i < limit; i++) {
                    referee.assert(true);
                }

                try {
                    referee.verify(expectedCount);
                } catch (err) {
                    error = err;
                }

                assert.equal(error.message, expectedMessage);
            });
        });
    });
});
