"use strict";

const referee = require("../referee");
const assert = require("assert");
const anonymousFunction = require("../test-helper/anonymous-function-string");

describe("assert.isUndefined", function () {
  it("should pass for undefined", function () {
    referee.assert.isUndefined(undefined);
  });
  it("should fail for array", function () {
    assert.throws(
      () => {
        referee.assert.isUndefined([]);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isUndefined] Expected [] ('object') to be undefined",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isUndefined");
        return true;
      },
    );
  });
  it("should fail for boolean", function () {
    assert.throws(
      () => {
        referee.assert.isUndefined(true);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isUndefined] Expected true ('boolean') to be undefined",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isUndefined");
        return true;
      },
    );
  });
  it("should fail for function", function () {
    assert.throws(
      () => {
        // eslint-disable-next-line no-empty-function
        referee.assert.isUndefined(() => {});
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isUndefined] Expected ${anonymousFunction} ('function') to be undefined`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isUndefined");
        return true;
      },
    );
  });
  it("should fail for null", function () {
    assert.throws(
      () => {
        referee.assert.isUndefined(null);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isUndefined] Expected null ('object') to be undefined",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isUndefined");
        return true;
      },
    );
  });
  it("should fail for number", function () {
    assert.throws(
      () => {
        referee.assert.isUndefined(42);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isUndefined] Expected 42 ('number') to be undefined",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isUndefined");
        return true;
      },
    );
  });
  it("should fail for object", function () {
    assert.throws(
      () => {
        referee.assert.isUndefined({});
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isUndefined] Expected {} ('object') to be undefined",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isUndefined");
        return true;
      },
    );
  });
  it("should fail for string with custom message", function () {
    assert.throws(
      () => {
        referee.assert.isUndefined("Test", "fails");
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isUndefined] fails: Expected 'Test' ('string') to be undefined",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isUndefined");
        return true;
      },
    );
  });
  it("should handle objects without prototype", function () {
    referee.refute.isUndefined(Object.create(null));
  });
});
