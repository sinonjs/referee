"use strict";

const assert = require("assert");
const referee = require("../referee");
const captureArgs = require("../test-helper/capture-args");

// eslint-disable-next-line no-empty-function
function noop() {}

describe("assert.isNull", function () {
  it("should pass for null", function () {
    referee.assert.isNull(null);
  });

  it("should fail for undefined", function () {
    assert.throws(
      () => {
        referee.assert.isNull(undefined);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isNull] Expected undefined to be null",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isNull");
        return true;
      },
    );
  });

  it("should fail for zero", function () {
    assert.throws(
      () => {
        referee.assert.isNull(0);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.message, "[assert.isNull] Expected 0 to be null");
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isNull");
        return true;
      },
    );
  });

  it("should fail for false", function () {
    assert.throws(
      () => {
        referee.assert.isNull(false);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isNull] Expected false to be null",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isNull");
        return true;
      },
    );
  });

  it("should fail for empty string", function () {
    assert.throws(
      () => {
        referee.assert.isNull("");
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.message, "[assert.isNull] Expected '' to be null");
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isNull");
        return true;
      },
    );
  });

  it("should fail for Function", function () {
    assert.throws(
      () => {
        referee.assert.isNull(noop);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isNull] Expected [Function: noop] to be null",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isNull");
        return true;
      },
    );
  });

  it("should fail for Array", function () {
    assert.throws(
      () => {
        referee.assert.isNull([]);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.message, "[assert.isNull] Expected [] to be null");
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isNull");
        return true;
      },
    );
  });

  it("should fail for Object", function () {
    assert.throws(
      () => {
        referee.assert.isNull({});
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.message, "[assert.isNull] Expected {} to be null");
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isNull");
        return true;
      },
    );
  });

  it("should fail for arguments", function () {
    assert.throws(
      () => {
        referee.assert.isNull(captureArgs());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isNull] Expected [Arguments] {} to be null",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isNull");
        return true;
      },
    );
  });

  it("should fail with custom message", function () {
    const message = "f5119659-4749-4992-abe3-eaeaf3afd279";

    assert.throws(
      () => {
        referee.assert.isNull(undefined, message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isNull] ${message}: Expected undefined to be null`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isNull");
        return true;
      },
    );
  });
});

describe("refute.isNull", function () {
  it("should fail for null", function () {
    assert.throws(
      () => {
        referee.refute.isNull(null);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.message, "[refute.isNull] Expected not to be null");
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isNull");
        return true;
      },
    );
  });

  it("should pass for undefined", function () {
    referee.refute.isNull(undefined);
  });

  it("should pass for zero", function () {
    referee.refute.isNull(0);
  });

  it("should pass for false", function () {
    referee.refute.isNull(false);
  });

  it("should pass for empty string", function () {
    referee.refute.isNull("");
  });

  it("should pass for Function", function () {
    referee.refute.isNull(noop);
  });

  it("should pass for Array", function () {
    referee.refute.isNull([]);
  });

  it("should pass for Object", function () {
    referee.refute.isNull({});
  });

  it("should pass for arguments", function () {
    referee.refute.isNull(captureArgs());
  });

  it("should fail with custom message", function () {
    const message = "75a44f2e-1387-436d-bc6c-89e0b95a85b2";

    assert.throws(
      () => {
        referee.refute.isNull(null, message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isNull] ${message}: Expected not to be null`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isNull");
        return true;
      },
    );
  });
});
