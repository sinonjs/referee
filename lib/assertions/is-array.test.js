"use strict";

const assert = require("assert");
const referee = require("../referee");
const captureArgs = require("../test-helper/capture-args");
const getArrayLike = require("../test-helper/get-array-like");

describe("assert.isArray", function () {
  it("should pass for Array", function () {
    referee.assert.isArray([]);
  });

  it("should fail for Object", function () {
    assert.throws(
      () => {
        referee.assert.isArray({});
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.message, "[assert.isArray] Expected {} to be array");
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isArray");
        return true;
      },
    );
  });

  it("should fail for arguments", function () {
    assert.throws(
      () => {
        referee.assert.isArray(captureArgs());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isArray] Expected [Arguments] {} to be array",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isArray");
        return true;
      },
    );
  });

  it("should fail for array like", function () {
    assert.throws(
      () => {
        referee.assert.isArray(getArrayLike());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isArray] Expected {\n" +
            "  '0': 'One',\n" +
            "  '1': 'Two',\n" +
            "  '2': 'Three',\n" +
            "  '3': 'Four',\n" +
            "  length: 4,\n" +
            "  splice: [Function: splice]\n" +
            "} to be array",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isArray");
        return true;
      },
    );
  });

  it("should fail with custom message", function () {
    const message = "c7d5eb79-f8a4-4980-893a-50549bb6ee5e";

    assert.throws(
      () => {
        referee.assert.isArray({}, message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isArray] ${message}: Expected {} to be array`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isArray");
        return true;
      },
    );
  });
});

describe("refute.isArray", function () {
  it("should fail for Array", function () {
    assert.throws(
      () => {
        referee.refute.isArray([]);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isArray] Expected [] not to be array",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isArray");
        return true;
      },
    );
  });

  it("should pass for Object", function () {
    referee.refute.isArray({});
  });

  it("should pass for arguments", function () {
    referee.refute.isArray(captureArgs());
  });

  it("should pass for array like", function () {
    referee.refute.isArray(getArrayLike());
  });

  it("should fail with custome message", function () {
    const message = "12c6cbf6-0ff7-4afe-815b-a40380635a89";
    assert.throws(
      () => {
        referee.refute.isArray([], message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isArray] ${message}: Expected [] not to be array`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isArray");
        return true;
      },
    );
  });
});
