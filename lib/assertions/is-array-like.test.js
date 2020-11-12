"use strict";

var assert = require("assert");
var referee = require("../referee");
var captureArgs = require("../test-helper/capture-args");
var getArrayLike = require("../test-helper/get-array-like");

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
      function () {
        referee.assert.isArrayLike({});
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isArrayLike] Expected {} to be array like"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isArrayLike");
        return true;
      }
    );
  });

  it("should fail with custom message", function () {
    assert.throws(
      function () {
        referee.assert.isArrayLike({}, "Here!");
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isArrayLike] Here! Expected {} to be array like"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isArrayLike");

        return true;
      }
    );
  });
});

describe("refute.isArrayLike", function () {
  it("should fail for array", function () {
    assert.throws(
      function () {
        referee.refute.isArrayLike([]);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isArrayLike] Expected [] not to be array like"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isArrayLike");

        return true;
      }
    );
  });

  it("should fail for arguments", function () {
    assert.throws(
      function () {
        referee.refute.isArrayLike(captureArgs());
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isArrayLike] Expected [Arguments] {} not to be array like"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isArrayLike");

        return true;
      }
    );
  });

  it("should fail for array like", function () {
    assert.throws(
      function () {
        referee.refute.isArrayLike(getArrayLike());
      },
      function (error) {
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
            "} not to be array like"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isArrayLike");

        return true;
      }
    );
  });

  it("should fail with custom message", function () {
    assert.throws(
      function () {
        referee.refute.isArrayLike(getArrayLike(), "apple pie");
      },
      function (error) {
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
            "} not to be array like"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isArrayLike");

        return true;
      }
    );
  });

  it("should pass for object", function () {
    referee.refute.isArrayLike({});
  });
});
