"use strict";

var assert = require("assert");
var referee = require("./referee");

describe("verifier", function () {
  var verify;

  beforeEach(function () {
    verify = referee.verifier();
  });

  it("should increment verify.count on pass", function () {
    var numberOfAssertions = 100;

    for (var i = 0; i < numberOfAssertions; i++) {
      referee.assert(true);
    }
    assert.equal(verify.count, numberOfAssertions);

    verify(numberOfAssertions);
  });

  it("should increment verify.count on failure", function () {
    var numberOfAssertions = 100;

    for (var i = 0; i < numberOfAssertions; i++) {
      try {
        referee.refute(true);
      } catch (ignore) {
        // Ignore exception
      }
    }
    assert.equal(verify.count, numberOfAssertions);

    verify(numberOfAssertions);
  });

  context("after call", function () {
    it("should not increment verify.count on assert", function () {
      referee.assert(true);

      verify();
      referee.assert(true);

      assert.equal(verify.count, 1);
    });

    it("should not increment verify.count on refute", function () {
      try {
        referee.refute(true);
      } catch (ignore) {
        // Ignore exception
      }

      verify();
      try {
        referee.refute(true);
      } catch (ignore) {
        // Ignore exception
      }

      assert.equal(verify.count, 1);
    });
  });

  context("when called with zero expected argument", function () {
    it("should throw an error", function () {
      var error;
      try {
        verify(0);
      } catch (err) {
        error = err;
      }

      assert.equal(error.message, "expected argument must be a number >= 1");
    });
  });

  context("when called with non-number expected argument", function () {
    it("should throw an error", function () {
      var error;
      try {
        verify("12");
      } catch (err) {
        error = err;
      }

      assert.equal(error.message, "expected argument must be a number >= 1");
    });
  });

  context("when no assertions have been made", function () {
    it("should throw an Error", function () {
      var error;
      try {
        verify();
      } catch (err) {
        error = err;
      }

      assert.equal(
        error.message,
        "Expected assertion count to be at least 1, but was 0",
      );
    });
  });

  context("when called without an expected value", function () {
    it("should not throw", function () {
      for (var i = 0; i < 1000; i++) {
        referee.assert(true);
        verify();
      }
    });
  });

  context("when called with an expected value", function () {
    context("when expected === verify.count", function () {
      it("should not throw", function () {
        var limit = 1000;
        for (var i = 0; i < limit; i++) {
          referee.assert(true);
        }

        verify(limit);
      });
    });

    context("when expected !== verify.count", function () {
      it("should throw an error", function () {
        var limit = 10;
        var expectedCount = 2;
        var expectedMessage = `Expected assertion count to be ${expectedCount} but was ${limit}`;
        var error;

        for (var i = 0; i < limit; i++) {
          referee.assert(true);
        }

        try {
          verify(expectedCount);
        } catch (err) {
          error = err;
        }

        assert.equal(error.message, expectedMessage);
      });
    });
  });
});
