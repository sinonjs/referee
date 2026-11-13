"use strict";

const assert = require("assert");
const referee = require("../referee");

// eslint-disable-next-line no-empty-function
function noop() {}

describe("assert.isFunction", function () {
  it("should pass for Function", function () {
    referee.assert.isFunction(noop);
  });

  it("should fail for Object", function () {
    assert.throws(
      () => {
        referee.assert.isFunction({});
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isFunction] '[object Object]' ('object') expected to be function",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isFunction");
        return true;
      },
    );
  });
  it("should fail with custom message", function () {
    const message = "e263d0d2-4155-4208-8600-06567b1a4feb";

    assert.throws(
      () => {
        referee.assert.isFunction({}, message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isFunction] ${message}: '[object Object]' ('object') expected to be function`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isFunction");
        return true;
      },
    );
  });
});

describe("refute.isFunction", function () {
  it("should fail for Function", function () {
    assert.throws(
      () => {
        referee.refute.isFunction(noop);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isFunction] 'function noop() {}' expected not to be function",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isFunction");
        return true;
      },
    );
  });

  it("should pass for Object", function () {
    referee.refute.isFunction({});
  });

  it("should fail with custom message", function () {
    const message = "4d65bf17-9c90-4127-b29f-99da618e7022";
    assert.throws(
      () => {
        referee.refute.isFunction(noop, message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isFunction] ${message}: 'function noop() {}' expected not to be function`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isFunction");
        return true;
      },
    );
  });
});
