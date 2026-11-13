"use strict";

const assert = require("assert");
const referee = require("../referee");
const captureArgs = require("../test-helper/capture-args");

describe("assert.isRangeError", function () {
  it("should fail for Error", function () {
    assert.throws(
      () => {
        referee.assert.isRangeError(new Error());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isRangeError] Expected Error to be a RangeError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isRangeError");
        return true;
      },
    );
  });

  it("should fail for EvalError", function () {
    assert.throws(
      () => {
        referee.assert.isRangeError(new EvalError());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isRangeError] Expected EvalError to be a RangeError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isRangeError");
        return true;
      },
    );
  });

  it("should pass for RangeError", function () {
    referee.assert.isRangeError(new RangeError());
  });

  it("should fail for ReferenceError", function () {
    assert.throws(
      () => {
        referee.assert.isRangeError(new ReferenceError());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isRangeError] Expected ReferenceError to be a RangeError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isRangeError");
        return true;
      },
    );
  });

  it("should fail for SyntaxError", function () {
    assert.throws(
      () => {
        referee.assert.isRangeError(new SyntaxError());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isRangeError] Expected SyntaxError to be a RangeError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isRangeError");
        return true;
      },
    );
  });

  it("should fail for TypeError", function () {
    assert.throws(
      () => {
        referee.assert.isRangeError(new TypeError());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isRangeError] Expected TypeError to be a RangeError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isRangeError");
        return true;
      },
    );
  });

  it("should fail for URIError", function () {
    assert.throws(
      () => {
        referee.assert.isRangeError(new URIError());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isRangeError] Expected URIError to be a RangeError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isRangeError");
        return true;
      },
    );
  });

  it("should fail for String", function () {
    assert.throws(
      () => {
        referee.assert.isRangeError("apple pie");
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isRangeError] Expected 'apple pie' to be a RangeError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isRangeError");
        return true;
      },
    );
  });

  it("should fail for Array", function () {
    assert.throws(
      () => {
        referee.assert.isRangeError([]);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isRangeError] Expected [] to be a RangeError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isRangeError");
        return true;
      },
    );
  });

  it("should fail for Object", function () {
    assert.throws(
      () => {
        referee.assert.isRangeError({});
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isRangeError] Expected {} to be a RangeError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isRangeError");
        return true;
      },
    );
  });

  it("should fail for arguments", function () {
    assert.throws(
      () => {
        referee.assert.isRangeError(captureArgs());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isRangeError] Expected [Arguments] {} to be a RangeError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isRangeError");
        return true;
      },
    );
  });

  it("should fail with custom message", function () {
    const message = "5b298207-387b-4d2f-90c0-cb3514386c44";

    assert.throws(
      () => {
        referee.assert.isRangeError(new Error(), message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isRangeError] ${message}: Expected Error to be a RangeError`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isRangeError");
        return true;
      },
    );
  });
});

describe("refute.isRangeError", function () {
  it("should pass for Error", function () {
    referee.refute.isRangeError(new Error());
  });

  it("should pass for EvalError", function () {
    referee.refute.isRangeError(new EvalError());
  });

  it("should fail for RangeError", function () {
    assert.throws(
      () => {
        referee.refute.isRangeError(new RangeError());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isRangeError] Expected RangeError not to be a RangeError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isRangeError");
        return true;
      },
    );
  });

  it("should pass for ReferenceError", function () {
    referee.refute.isRangeError(new ReferenceError());
  });

  it("should pass for SyntaxError", function () {
    referee.refute.isRangeError(new SyntaxError());
  });

  it("should pass for TypeError", function () {
    referee.refute.isRangeError(new TypeError());
  });

  it("should pass for URIError", function () {
    referee.refute.isRangeError(new URIError());
  });

  it("should pass for String", function () {
    referee.refute.isRangeError("apple pie");
  });

  it("should pass for Array", function () {
    referee.refute.isRangeError([]);
  });

  it("should pass for Object", function () {
    referee.refute.isRangeError({});
  });

  it("should pass for arguments", function () {
    referee.refute.isRangeError(captureArgs());
  });

  it("should fail with custom message", function () {
    const message = "9ac2e81f-e01a-401a-afe2-9b64fb5df461";

    assert.throws(
      () => {
        referee.refute.isRangeError(new RangeError(), message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isRangeError] ${message}: Expected RangeError not to be a RangeError`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isRangeError");
        return true;
      },
    );
  });
});
