"use strict";

const assert = require("assert");
const referee = require("../referee");
const captureArgs = require("../test-helper/capture-args");

describe("assert.isEvalError", function () {
  it("should fail for Error", function () {
    assert.throws(
      () => {
        referee.assert.isEvalError(new Error());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isEvalError] Expected Error to be an EvalError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isEvalError");
        return true;
      },
    );
  });

  it("should pass for EvalError", function () {
    referee.assert.isEvalError(new EvalError());
  });

  it("should fail for RangeError", function () {
    assert.throws(
      () => {
        referee.assert.isEvalError(new RangeError());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isEvalError] Expected RangeError to be an EvalError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isEvalError");
        return true;
      },
    );
  });

  it("should fail for ReferenceError", function () {
    assert.throws(
      () => {
        referee.assert.isEvalError(new ReferenceError());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isEvalError] Expected ReferenceError to be an EvalError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isEvalError");
        return true;
      },
    );
  });

  it("should fail for SyntaxError", function () {
    assert.throws(
      () => {
        referee.assert.isEvalError(new SyntaxError());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isEvalError] Expected SyntaxError to be an EvalError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isEvalError");
        return true;
      },
    );
  });

  it("should fail for TypeError", function () {
    assert.throws(
      () => {
        referee.assert.isEvalError(new TypeError());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isEvalError] Expected TypeError to be an EvalError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isEvalError");
        return true;
      },
    );
  });

  it("should fail for URIError", function () {
    assert.throws(
      () => {
        referee.assert.isEvalError(new URIError());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isEvalError] Expected URIError to be an EvalError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isEvalError");
        return true;
      },
    );
  });

  it("should fail for String", function () {
    assert.throws(
      () => {
        referee.assert.isEvalError("8759e9fa-e0d8-4bc8-b85f-09433850b830");
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isEvalError] Expected '8759e9fa-e0d8-4bc8-b85f-09433850b830' to be an EvalError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isEvalError");
        return true;
      },
    );
  });

  it("should fail for Array", function () {
    assert.throws(
      () => {
        referee.assert.isEvalError([]);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isEvalError] Expected [] to be an EvalError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isEvalError");
        return true;
      },
    );
  });

  it("should fail for Object", function () {
    assert.throws(
      () => {
        referee.assert.isEvalError({});
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isEvalError] Expected {} to be an EvalError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isEvalError");
        return true;
      },
    );
  });

  it("should fail for arguments", function () {
    assert.throws(
      () => {
        referee.assert.isEvalError(captureArgs());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isEvalError] Expected [Arguments] {} to be an EvalError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isEvalError");
        return true;
      },
    );
  });

  it("should fail with custom message", function () {
    const message = "c6ed6c91-38bf-4be5-82b4-b5f25e8c294d";

    assert.throws(
      () => {
        referee.assert.isEvalError(new Error(), message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isEvalError] ${message}: Expected Error to be an EvalError`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isEvalError");
        return true;
      },
    );
  });
});

describe("refute.isEvalError", function () {
  it("should pass for Error", function () {
    referee.refute.isEvalError(new Error());
  });

  it("should fail for EvalError", function () {
    assert.throws(
      () => {
        referee.refute.isEvalError(new EvalError());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isEvalError] Expected EvalError not to be an EvalError",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isEvalError");
        return true;
      },
    );
  });

  it("should pass for RangeError", function () {
    referee.refute.isEvalError(new RangeError());
  });

  it("should pass for ReferenceError", function () {
    referee.refute.isEvalError(new ReferenceError());
  });

  it("should pass for SyntaxError", function () {
    referee.refute.isEvalError(new SyntaxError());
  });

  it("should pass for TypeError", function () {
    referee.refute.isEvalError(new TypeError());
  });

  it("should pass for URIError", function () {
    referee.refute.isEvalError(new URIError());
  });

  it("should pass for String", function () {
    referee.refute.isEvalError("not an error");
  });

  it("should pass for Array", function () {
    referee.refute.isEvalError([]);
  });

  it("should pass for Object", function () {
    referee.refute.isEvalError({});
  });

  it("should pass for arguments", function () {
    referee.refute.isEvalError(captureArgs());
  });

  it("should fail with custom message", function () {
    const message = "b9d5e8b0-0917-4848-91a0-e4d5c2c0f4dd";

    assert.throws(
      () => {
        referee.refute.isEvalError(new EvalError(), message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isEvalError] ${message}: Expected EvalError not to be an EvalError`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isEvalError");
        return true;
      },
    );
  });
});
