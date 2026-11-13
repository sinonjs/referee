"use strict";

const assert = require("assert");
const referee = require("../referee");

describe("assert.greater", function () {
  it("should pass greater than", function () {
    referee.assert.greater(2, 1);
  });

  it("should fail when equal", function () {
    assert.throws(
      () => {
        referee.assert.greater(1, 1);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.greater] Expected 1 to be greater than 1",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.greater");
        return true;
      },
    );
  });

  it("should fail when less", function () {
    assert.throws(
      () => {
        referee.assert.greater(1, 2);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.greater] Expected 1 to be greater than 2",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.greater");
        return true;
      },
    );
  });

  it("should fail with custom message", function () {
    const message = "ca1b9a97-787c-4ea3-a6a4-e4fe743e2425";

    assert.throws(
      () => {
        referee.assert.greater(1, 2, message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.greater] ${message}: Expected 1 to be greater than 2`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.greater");
        return true;
      },
    );
  });
});

describe("refute.greater", function () {
  it("should fail when greater", function () {
    assert.throws(
      () => {
        referee.refute.greater(2, 1);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.greater] Expected 2 to be less than or equal to 1",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.greater");
        return true;
      },
    );
  });

  it("should fail with a custom message", function () {
    const message = "8ca2617f-daf2-401f-8172-3a12cf71f59c";

    assert.throws(
      () => {
        referee.refute.greater(2, 1, message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.greater] ${message}: Expected 2 to be less than or equal to 1`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.greater");
        return true;
      },
    );
  });

  it("should pass when equal", function () {
    referee.refute.greater(1, 1);
  });

  it("should pass when less", function () {
    referee.refute.greater(1, 2);
  });
});
