"use strict";

var assert = require("assert");
var referee = require("../referee");
var captureArgs = require("../test-helper/capture-args");

describe("assert.isFloat64Array", function () {
  it("should fail for Float32Array", function () {
    assert.throws(
      function () {
        referee.assert.isFloat64Array(new Float32Array(2));
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isFloat64Array] Expected Float32Array(2) [ 0, 0 ] to be a Float64Array"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isFloat64Array");
        return true;
      }
    );
  });

  it("should pass for isFloat64Array", function () {
    referee.assert.isFloat64Array(new Float64Array(2));
  });

  it("should fail for Array", function () {
    assert.throws(
      function () {
        referee.assert.isFloat64Array([]);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isFloat64Array] Expected [] to be a Float64Array"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isFloat64Array");
        return true;
      }
    );
  });

  it("should fail for Object", function () {
    assert.throws(
      function () {
        referee.assert.isFloat64Array({});
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isFloat64Array] Expected {} to be a Float64Array"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isFloat64Array");
        return true;
      }
    );
  });

  it("should fail for arguments", function () {
    assert.throws(
      function () {
        referee.assert.isFloat64Array(captureArgs());
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isFloat64Array] Expected [Arguments] {} to be a Float64Array"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isFloat64Array");
        return true;
      }
    );
  });

  it("should fail with custom message", function () {
    var message = "b547be3f-9453-4034-a3ee-e6dfe0f26fa1";

    assert.throws(
      function () {
        referee.assert.isFloat64Array(new Float32Array(2), message);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isFloat64Array] ${message}: Expected Float32Array(2) [ 0, 0 ] to be a Float64Array`
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isFloat64Array");
        return true;
      }
    );
  });
});

describe("refute.isFloat64Array", function () {
  it("should pass for Float32Array", function () {
    referee.refute.isFloat64Array(new Float32Array(2));
  });

  it("should fail for Float64Array", function () {
    assert.throws(
      function () {
        referee.refute.isFloat64Array(new Float64Array(2));
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isFloat64Array] Expected Float64Array(2) [ 0, 0 ] not to be a Float64Array"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isFloat64Array");
        return true;
      }
    );
  });

  it("should pass for Array", function () {
    referee.refute.isFloat64Array([]);
  });

  it("should pass for Object", function () {
    referee.refute.isFloat64Array({});
  });

  it("should pass for arguments", function () {
    referee.refute.isFloat64Array(captureArgs());
  });

  it("should fail with custom message", function () {
    var message = "2cc86fd1-dd39-44ed-a7c6-e5b83a16e27e";

    assert.throws(
      function () {
        referee.refute.isFloat64Array(new Float64Array(2), message);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isFloat64Array] ${message}: Expected Float64Array(2) [ 0, 0 ] not to be a Float64Array`
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isFloat64Array");
        return true;
      }
    );
  });
});
