"use strict";

var assert = require("assert");
var referee = require("../referee");

describe("assert.greater", function () {
  it("should pass greater than", function () {
    referee.assert.greater(2, 1);
  });

  it("should fail when equal", function () {
    assert.throws(
      function () {
        referee.assert.greater(1, 1);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.greater] Expected 1 to be greater than 1"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.greater");
        return true;
      }
    );
  });

  it("should fail when less", function () {
    assert.throws(
      function () {
        referee.assert.greater(1, 2);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.greater] Expected 1 to be greater than 2"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.greater");
        return true;
      }
    );
  });

  it("should fail with custom message", function () {
    var message = "ca1b9a97-787c-4ea3-a6a4-e4fe743e2425";

    assert.throws(
      function () {
        referee.assert.greater(1, 2, message);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.greater] " + message + ": Expected 1 to be greater than 2"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.greater");
        return true;
      }
    );
  });
});

describe("refute.greater", function () {
  it("should fail when greater", function () {
    assert.throws(
      function () {
        referee.refute.greater(2, 1);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.greater] Expected 2 to be less than or equal to 1"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.greater");
        return true;
      }
    );
  });

  it("should fail with a custom message", function () {
    var message = "8ca2617f-daf2-401f-8172-3a12cf71f59c";

    assert.throws(
      function () {
        referee.refute.greater(2, 1, message);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.greater] " +
            message +
            ": Expected 2 to be less than or equal to 1"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.greater");
        return true;
      }
    );
  });

  it("should pass when equal", function () {
    referee.refute.greater(1, 1);
  });

  it("should pass when less", function () {
    referee.refute.greater(1, 2);
  });
});
