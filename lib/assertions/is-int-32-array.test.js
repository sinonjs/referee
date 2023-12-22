"use strict";

var assert = require("assert");
var inspect = require("util").inspect;
var referee = require("../referee");
var captureArgs = require("../test-helper/capture-args");

describe("assert.isInt32Array", function () {
  it("should fail for Int8Array", function () {
    const actual = new Int8Array(2);

    assert.throws(
      function () {
        referee.assert.isInt32Array(actual);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isInt32Array] Expected ${inspect(
            actual,
          )} to be an Int32Array`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isInt32Array");
        return true;
      },
    );
  });

  it("should fail for Int16Array", function () {
    const actual = new Int16Array(2);

    assert.throws(
      function () {
        referee.assert.isInt32Array(actual);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isInt32Array] Expected ${inspect(
            actual,
          )} to be an Int32Array`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isInt32Array");
        return true;
      },
    );
  });

  it("should pass for Int32Array", function () {
    referee.assert.isInt32Array(new Int32Array(2));
  });

  it("should fail for Array", function () {
    assert.throws(
      function () {
        referee.assert.isInt32Array([]);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isInt32Array] Expected [] to be an Int32Array",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isInt32Array");
        return true;
      },
    );
  });

  it("should fail for Object", function () {
    assert.throws(
      function () {
        referee.assert.isInt32Array({});
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isInt32Array] Expected {} to be an Int32Array",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isInt32Array");
        return true;
      },
    );
  });

  it("should fail for arguments", function () {
    assert.throws(
      function () {
        referee.assert.isInt32Array(captureArgs());
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isInt32Array] Expected [Arguments] {} to be an Int32Array",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isInt32Array");
        return true;
      },
    );
  });

  it("should fail with custom message", function () {
    var message = "593c3d59-bc50-456c-b3d6-a0ea0da372a1";

    assert.throws(
      function () {
        referee.assert.isInt32Array(captureArgs(), message);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isInt32Array] ${message}: Expected [Arguments] {} to be an Int32Array`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isInt32Array");
        return true;
      },
    );
  });
});

describe("refute.isInt32Array", function () {
  it("should pass for Int8Array", function () {
    referee.refute.isInt32Array(new Int8Array(2));
  });

  it("should pass for Int16Array", function () {
    referee.refute.isInt32Array(new Int16Array(2));
  });

  it("should fail for Int32Array", function () {
    const actual = new Int32Array(2);

    assert.throws(
      function () {
        referee.refute.isInt32Array(actual);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isInt32Array] Expected ${inspect(
            actual,
          )} not to be an Int32Array`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isInt32Array");
        return true;
      },
    );
  });

  it("should pass for Array", function () {
    referee.refute.isInt32Array([]);
  });

  it("should pass for Object", function () {
    referee.refute.isInt32Array({});
  });

  it("should pass for arguments", function () {
    referee.refute.isInt32Array(captureArgs());
  });

  it("should fail with custom message", function () {
    var message = "82576420-8e5d-4618-b6eb-87bcf00b9170";
    const actual = new Int32Array(2);

    assert.throws(
      function () {
        referee.refute.isInt32Array(actual, message);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isInt32Array] ${message}: Expected ${inspect(
            actual,
          )} not to be an Int32Array`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isInt32Array");
        return true;
      },
    );
  });
});
