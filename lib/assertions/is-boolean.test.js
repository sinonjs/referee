"use strict";

const assert = require("assert");
const referee = require("../referee");

function noop() {
  return undefined;
}

describe("assert.isBoolean", function () {
  it("should pass for Boolean", function () {
    referee.assert.isBoolean(true);
    referee.assert.isBoolean(false);
  });

  it("should fail for Function", function () {
    assert.throws(
      () => {
        referee.assert.isBoolean(noop);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isBoolean] Expected [Function: noop] ('function') to be boolean",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isBoolean");
        return true;
      },
    );
  });

  it("should fail for null", function () {
    assert.throws(
      () => {
        referee.assert.isBoolean(null);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isBoolean] Expected null ('object') to be boolean",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isBoolean");
        return true;
      },
    );
  });

  it("should fail with custom message", function () {
    const message = "48ddd3d5-e636-492e-9bed-26fe11ccc15f";

    assert.throws(
      () => {
        referee.assert.isBoolean("hello", message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isBoolean] ${message}: Expected 'hello' ('string') to be boolean`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isBoolean");
        return true;
      },
    );
  });
});

describe("refute.isBoolean", function () {
  it("should fail for Boolean", function () {
    assert.throws(
      () => {
        referee.refute.isBoolean(true);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isBoolean] Expected true not to be boolean",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isBoolean");
        return true;
      },
    );
  });

  it("should pass for Function", function () {
    referee.refute.isBoolean(noop);
  });

  it("should pass for null", function () {
    referee.refute.isBoolean(null);
  });

  it("should fail with custom message", function () {
    const message = "1dfcdf31-53d8-4aa9-a889-d72fface2710";
    assert.throws(
      () => {
        referee.refute.isBoolean(true, message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isBoolean] ${message}: Expected true not to be boolean`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isBoolean");
        return true;
      },
    );
  });
});
