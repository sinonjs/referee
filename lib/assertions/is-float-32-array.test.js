"use strict";

var assert = require("assert");
var inspect = require("util").inspect;
var referee = require("../referee");
var captureArgs = require("../test-helper/capture-args");

describe("assert.isFloat32Array", function () {
  it("should pass for Float32Array", function () {
    referee.assert.isFloat32Array(new Float32Array(2));
  });

  it("should fail for Float64Array", function () {
    const actual = new Float64Array(2);

    assert.throws(
      function () {
        referee.assert.isFloat32Array(actual);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isFloat32Array] Expected ${inspect(
            actual
          )} to be a Float32Array`
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isFloat32Array");
        return true;
      }
    );
  });

  it("should fail for Array", function () {
    assert.throws(
      function () {
        referee.assert.isFloat32Array([]);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isFloat32Array] Expected [] to be a Float32Array"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isFloat32Array");
        return true;
      }
    );
  });

  it("should fail for Object", function () {
    assert.throws(
      function () {
        referee.assert.isFloat32Array({});
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isFloat32Array] Expected {} to be a Float32Array"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isFloat32Array");
        return true;
      }
    );
  });

  it("should fail for arguments", function () {
    assert.throws(
      function () {
        referee.assert.isFloat32Array(captureArgs());
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isFloat32Array] Expected [Arguments] {} to be a Float32Array"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isFloat32Array");
        return true;
      }
    );
  });

  it("should fail with custom message", function () {
    var message = "b547be3f-9453-4034-a3ee-e6dfe0f26fa1";
    const actual = new Float64Array(2);

    assert.throws(
      function () {
        referee.assert.isFloat32Array(actual, message);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isFloat32Array] ${message}: Expected ${inspect(
            actual
          )} to be a Float32Array`
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isFloat32Array");
        return true;
      }
    );
  });
});

describe("refute.isFloat32Array", function () {
  it("should fail for Float32Array", function () {
    const actual = new Float32Array(2);

    assert.throws(
      function () {
        referee.refute.isFloat32Array(actual);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isFloat32Array] Expected ${inspect(
            actual
          )} not to be a Float32Array`
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isFloat32Array");
        return true;
      }
    );
  });

  it("should pass for Float64Array", function () {
    referee.refute.isFloat32Array(new Float64Array(2));
  });

  it("should pass for Array", function () {
    referee.refute.isFloat32Array([]);
  });

  it("should pass for Object", function () {
    referee.refute.isFloat32Array({});
  });

  it("should pass for arguments", function () {
    referee.refute.isFloat32Array(captureArgs());
  });

  it("should fail with custom message", function () {
    var message = "2cc86fd1-dd39-44ed-a7c6-e5b83a16e27e";
    const actual = new Float32Array(2);

    assert.throws(
      function () {
        referee.refute.isFloat32Array(actual, message);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isFloat32Array] ${message}: Expected ${inspect(
            actual
          )} not to be a Float32Array`
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isFloat32Array");
        return true;
      }
    );
  });
});
