"use strict";

const assert = require("assert");
const referee = require("../referee");
const captureArgs = require("../test-helper/capture-args");
const getArrayLike = require("../test-helper/get-array-like");

describe("assert.isArrayLike", function () {
  it("should pass for array", function () {
    referee.assert.isArrayLike([]);
  });

  it("should pass for arguments", function () {
    referee.assert.isArrayLike(captureArgs());
  });

  it("should pass for array like", function () {
    referee.assert.isArrayLike(getArrayLike());
  });

  it("should fail for object", function () {
    assert.throws(
      () => {
        referee.assert.isArrayLike({});
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isArrayLike] Expected {} to be array like",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isArrayLike");
        return true;
      },
    );
  });

  it("should fail with custom message", function () {
    assert.throws(
      () => {
        referee.assert.isArrayLike({}, "Here!");
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isArrayLike] Here! Expected {} to be array like",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isArrayLike");

        return true;
      },
    );
  });
});

describe("refute.isArrayLike", function () {
  it("should fail for array", function () {
    assert.throws(
      () => {
        referee.refute.isArrayLike([]);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isArrayLike] Expected [] not to be array like",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isArrayLike");

        return true;
      },
    );
  });

  it("should fail for arguments", function () {
    assert.throws(
      () => {
        referee.refute.isArrayLike(captureArgs());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isArrayLike] Expected [Arguments] {} not to be array like",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isArrayLike");

        return true;
      },
    );
  });

  it("should fail for array like", function () {
    assert.throws(
      () => {
        referee.refute.isArrayLike(getArrayLike());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isArrayLike] Expected {\n" +
            "  '0': 'One',\n" +
            "  '1': 'Two',\n" +
            "  '2': 'Three',\n" +
            "  '3': 'Four',\n" +
            "  length: 4,\n" +
            "  splice: [Function: splice]\n" +
            "} not to be array like",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isArrayLike");

        return true;
      },
    );
  });

  it("should fail with custom message", function () {
    assert.throws(
      () => {
        referee.refute.isArrayLike(getArrayLike(), "apple pie");
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isArrayLike] apple pie: Expected {\n" +
            "  '0': 'One',\n" +
            "  '1': 'Two',\n" +
            "  '2': 'Three',\n" +
            "  '3': 'Four',\n" +
            "  length: 4,\n" +
            "  splice: [Function: splice]\n" +
            "} not to be array like",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isArrayLike");

        return true;
      },
    );
  });

  it("should pass for object", function () {
    referee.refute.isArrayLike({});
  });
});
