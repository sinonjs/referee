"use strict";

const assert = require("assert");
const referee = require("../referee");
const captureArgs = require("../test-helper/capture-args");

describe("assert.isSyntaxError", function () {
  it("should fail for Error", function () {
    assert.throws(
      () => {
        referee.assert.isSyntaxError(new Error());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isSyntaxError] Expected Error to be a SyntaxError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isSyntaxError");
        return true;
      },
    );
  });

  it("should fail for EvalError", function () {
    assert.throws(
      () => {
        referee.assert.isSyntaxError(new EvalError());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isSyntaxError] Expected EvalError to be a SyntaxError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isSyntaxError");
        return true;
      },
    );
  });

  it("should fal for RangeError", function () {
    assert.throws(
      () => {
        referee.assert.isSyntaxError(new RangeError());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isSyntaxError] Expected RangeError to be a SyntaxError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isSyntaxError");
        return true;
      },
    );
  });

  it("should fail for ReferenceError", function () {
    assert.throws(
      () => {
        referee.assert.isSyntaxError(new ReferenceError());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isSyntaxError] Expected ReferenceError to be a SyntaxError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isSyntaxError");
        return true;
      },
    );
  });

  it("should pass for SyntaxError", function () {
    referee.assert.isSyntaxError(new SyntaxError());
  });

  it("should fail for TypeError", function () {
    assert.throws(
      () => {
        referee.assert.isSyntaxError(new TypeError());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isSyntaxError] Expected TypeError to be a SyntaxError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isSyntaxError");
        return true;
      },
    );
  });

  it("should fail for URIError", function () {
    assert.throws(
      () => {
        referee.assert.isSyntaxError(new URIError());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isSyntaxError] Expected URIError to be a SyntaxError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isSyntaxError");
        return true;
      },
    );
  });

  it("should fail for String", function () {
    assert.throws(
      () => {
        referee.assert.isSyntaxError("apple pie");
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isSyntaxError] Expected 'apple pie' to be a SyntaxError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isSyntaxError");
        return true;
      },
    );
  });

  it("should fail for Array", function () {
    assert.throws(
      () => {
        referee.assert.isSyntaxError([]);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isSyntaxError] Expected [] to be a SyntaxError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isSyntaxError");
        return true;
      },
    );
  });

  it("should fail for Object", function () {
    assert.throws(
      () => {
        referee.assert.isSyntaxError({});
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isSyntaxError] Expected {} to be a SyntaxError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isSyntaxError");
        return true;
      },
    );
  });

  it("should fail for arguments", function () {
    assert.throws(
      () => {
        referee.assert.isSyntaxError(captureArgs());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isSyntaxError] Expected [Arguments] {} to be a SyntaxError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isSyntaxError");
        return true;
      },
    );
  });

  it("should fail with custom message", function () {
    const message = "d5092be6-3193-408b-aa02-1cb5b58bf4bc";

    assert.throws(
      () => {
        referee.assert.isSyntaxError(new Error(), message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isSyntaxError] ${message}: Expected Error to be a SyntaxError`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isSyntaxError");
        return true;
      },
    );
  });
});

describe("refute.isSyntaxError", function () {
  it("should pass for Error", function () {
    referee.refute.isSyntaxError(new Error());
  });

  it("should pass for EvalError", function () {
    referee.refute.isSyntaxError(new EvalError());
  });

  it("should pass for RangeError", function () {
    referee.refute.isSyntaxError(new RangeError());
  });

  it("should pass for ReferenceError", function () {
    referee.refute.isSyntaxError(new ReferenceError());
  });

  it("should fail for SyntaxError", function () {
    assert.throws(
      () => {
        referee.refute.isSyntaxError(new SyntaxError());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isSyntaxError] Expected SyntaxError not to be a SyntaxError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isSyntaxError");
        return true;
      },
    );
  });

  it("should fail for TypeError", function () {
    referee.refute.isSyntaxError(new TypeError());
  });

  it("should pass for URIError", function () {
    referee.refute.isSyntaxError(new URIError());
  });

  it("should pass for String", function () {
    referee.refute.isSyntaxError("apple pie");
  });

  it("should pass for Array", function () {
    referee.refute.isSyntaxError([]);
  });

  it("should pass for Object", function () {
    referee.refute.isSyntaxError({});
  });

  it("should pass for arguments", function () {
    referee.refute.isSyntaxError(captureArgs());
  });

  it("should fail with custom message", function () {
    const message = "dfaac10d-6c38-4dc6-97c2-bb39a4c7f0d7";

    assert.throws(
      () => {
        referee.refute.isSyntaxError(new SyntaxError(), message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isSyntaxError] ${message}: Expected SyntaxError not to be a SyntaxError`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isSyntaxError");
        return true;
      },
    );
  });
});
