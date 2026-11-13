"use strict";

const assert = require("assert");
const referee = require("../referee");
const captureArgs = require("../test-helper/capture-args");

describe("assert.isError", function () {
  it("should pass for Error", function () {
    referee.assert.isError(new Error());
  });

  it("should pass for EvalError", function () {
    referee.assert.isError(new EvalError());
  });

  it("should pass for RangeError", function () {
    referee.assert.isError(new RangeError());
  });

  it("should pass for ReferenceError", function () {
    referee.assert.isError(new ReferenceError());
  });

  it("should pass for SyntaxError", function () {
    referee.assert.isError(new SyntaxError());
  });

  it("should pass for TypeError", function () {
    referee.assert.isError(new TypeError());
  });

  it("should pass for URIError", function () {
    referee.assert.isError(new URIError());
  });

  it("should fail for String", function () {
    assert.throws(
      () => {
        referee.assert.isError("not an error instance");
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isError] Expected 'not an error instance' to be an Error",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isError");
        return true;
      },
    );
  });

  it("should fail for Array", function () {
    assert.throws(
      () => {
        referee.assert.isError([]);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isError] Expected [] to be an Error",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isError");
        return true;
      },
    );
  });

  it("should fail for Object", function () {
    assert.throws(
      () => {
        referee.assert.isError({});
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isError] Expected {} to be an Error",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isError");
        return true;
      },
    );
  });

  it("should fail for arguments", function () {
    assert.throws(
      () => {
        referee.assert.isError(captureArgs());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isError] Expected [Arguments] {} to be an Error",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isError");
        return true;
      },
    );
  });

  it("should fail with a custom message", function () {
    const message = "c469039e-9a11-4052-8688-034fd47b0219";
    assert.throws(
      () => {
        referee.assert.isError("not an error instance", message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isError] ${message}: Expected 'not an error instance' to be an Error`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isError");
        return true;
      },
    );
  });
});

describe("refute.isError", function () {
  it("should fail for Error", function () {
    assert.throws(
      () => {
        referee.refute.isError(new Error());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isError] Expected Error not to be an Error",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isError");
        return true;
      },
    );
  });

  it("should fail for EvalError", function () {
    assert.throws(
      () => {
        referee.refute.isError(new EvalError());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isError] Expected EvalError not to be an Error",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isError");
        return true;
      },
    );
  });

  it("should fail for RangeError", function () {
    assert.throws(
      () => {
        referee.refute.isError(new RangeError());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isError] Expected RangeError not to be an Error",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isError");
        return true;
      },
    );
  });

  it("should fail for ReferenceError", function () {
    assert.throws(
      () => {
        referee.refute.isError(new ReferenceError());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isError] Expected ReferenceError not to be an Error",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isError");
        return true;
      },
    );
  });

  it("should fail for SyntaxError", function () {
    assert.throws(
      () => {
        referee.refute.isError(new SyntaxError());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isError] Expected SyntaxError not to be an Error",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isError");
        return true;
      },
    );
  });

  it("should fail for TypeError", function () {
    assert.throws(
      () => {
        referee.refute.isError(new TypeError());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isError] Expected TypeError not to be an Error",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isError");
        return true;
      },
    );
  });

  it("should fail for URIError", function () {
    assert.throws(
      () => {
        referee.refute.isError(new URIError());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isError] Expected URIError not to be an Error",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isError");
        return true;
      },
    );
  });

  it("should pass for String", function () {
    referee.refute.isError("apple pie");
  });

  it("should pass for Array", function () {
    referee.refute.isError([]);
  });

  it("should pass for Object", function () {
    referee.refute.isError({});
  });

  it("should pass for arguments", function () {
    referee.refute.isError(captureArgs());
  });

  it("should fail with a custom message", function () {
    const message = "f0fcf922-fc46-47b2-8d01-49a181711a6a";

    assert.throws(
      () => {
        referee.refute.isError(new Error(), message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isError] ${message}: Expected Error not to be an Error`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isError");
        return true;
      },
    );
  });
});
