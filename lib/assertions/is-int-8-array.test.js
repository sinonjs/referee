"use strict";

var assert = require("assert");
var referee = require("../referee");
var captureArgs = require("../test-helper/capture-args");

describe("assert.isInt8Array", function () {
  it("should pass for Int8Array", function () {
    referee.assert.isInt8Array(new Int8Array(2));
  });

  it("should fail for Int16Array", function () {
    assert.throws(
      function () {
        referee.assert.isInt8Array(new Int16Array(2));
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isInt8Array] Expected Int16Array(2) [ 0, 0 ] to be an Int8Array"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isInt8Array");
        return true;
      }
    );
  });

  it("should fail for Int32Array", function () {
    assert.throws(
      function () {
        referee.assert.isInt8Array(new Int32Array(2));
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isInt8Array] Expected Int32Array(2) [ 0, 0 ] to be an Int8Array"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isInt8Array");
        return true;
      }
    );
  });

  it("should fail for Array", function () {
    assert.throws(
      function () {
        referee.assert.isInt8Array([]);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isInt8Array] Expected [] to be an Int8Array"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isInt8Array");
        return true;
      }
    );
  });

  it("should fail for Object", function () {
    assert.throws(
      function () {
        referee.assert.isInt8Array({});
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isInt8Array] Expected {} to be an Int8Array"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isInt8Array");
        return true;
      }
    );
  });

  it("should fail for arguments", function () {
    assert.throws(
      function () {
        referee.assert.isInt8Array(captureArgs());
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isInt8Array] Expected [Arguments] {} to be an Int8Array"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isInt8Array");
        return true;
      }
    );
  });

  it("should fail with custom message", function () {
    var message = "6eb311c6-bcb5-478a-a415-106ecb0e7f70";

    assert.throws(
      function () {
        referee.assert.isInt8Array(captureArgs(), message);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isInt8Array] ${message}: Expected [Arguments] {} to be an Int8Array`
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isInt8Array");
        return true;
      }
    );
  });
});

describe("refute.isInt8Array", function () {
  it("should fail for Int8Array", function () {
    assert.throws(
      function () {
        referee.refute.isInt8Array(new Int8Array(2));
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isInt8Array] Expected Int8Array(2) [ 0, 0 ] not to be an Int8Array"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isInt8Array");
        return true;
      }
    );
  });

  it("should pass for Int16Array", function () {
    referee.refute.isInt8Array(new Int16Array(2));
  });

  it("should pass for Int32Array", function () {
    referee.refute.isInt8Array(new Int32Array(2));
  });

  it("should pass for Array", function () {
    referee.refute.isInt8Array([]);
  });

  it("should pass for Object", function () {
    referee.refute.isInt8Array({});
  });

  it("should pass for arguments", function () {
    referee.refute.isInt8Array(captureArgs());
  });

  it("should fail with custom message", function () {
    var message = "dcd0c656-65a3-4117-8bd2-444b6e64d94c";

    assert.throws(
      function () {
        referee.refute.isInt8Array(new Int8Array(2), message);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isInt8Array] ${message}: Expected Int8Array(2) [ 0, 0 ] not to be an Int8Array`
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isInt8Array");
        return true;
      }
    );
  });
});
