"use strict";

var assert = require("assert");
var inspect = require("util").inspect;
var referee = require("../referee");
var captureArgs = require("../test-helper/capture-args");

describe("assert.isInt16Array", function () {
  it("should fail for Int8Array", function () {
    const actual = new Int8Array(2);

    assert.throws(
      function () {
        referee.assert.isInt16Array(actual);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isInt16Array] Expected ${inspect(
            actual,
          )} to be an Int16Array`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isInt16Array");
        return true;
      },
    );
  });

  it("should pass for Int16Array", function () {
    referee.assert.isInt16Array(new Int16Array(2));
  });

  it("should fail for Int32Array", function () {
    const actual = new Int32Array(2);

    assert.throws(
      function () {
        referee.assert.isInt16Array(actual);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isInt16Array] Expected ${inspect(
            actual,
          )} to be an Int16Array`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isInt16Array");
        return true;
      },
    );
  });

  it("should fail for Array", function () {
    assert.throws(
      function () {
        referee.assert.isInt16Array([]);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isInt16Array] Expected [] to be an Int16Array",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isInt16Array");
        return true;
      },
    );
  });

  it("should fail for Object", function () {
    assert.throws(
      function () {
        referee.assert.isInt16Array({});
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isInt16Array] Expected {} to be an Int16Array",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isInt16Array");
        return true;
      },
    );
  });

  it("should fail for arguments", function () {
    assert.throws(
      function () {
        referee.assert.isInt16Array(captureArgs());
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isInt16Array] Expected [Arguments] {} to be an Int16Array",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isInt16Array");
        return true;
      },
    );
  });

  it("should fail with custom message", function () {
    var message = "8bbe065a-e88a-44f3-9c26-c585b653b7cf";

    assert.throws(
      function () {
        referee.assert.isInt16Array(captureArgs(), message);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isInt16Array] ${message}: Expected [Arguments] {} to be an Int16Array`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isInt16Array");
        return true;
      },
    );
  });
});

describe("refute.isInt16Array", function () {
  it("should pass for Int8Array", function () {
    referee.refute.isInt16Array(new Int8Array(2));
  });

  it("should fail for Int16Array", function () {
    const actual = new Int16Array(2);

    assert.throws(
      function () {
        referee.refute.isInt16Array(actual);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isInt16Array] Expected ${inspect(
            actual,
          )} not to be an Int16Array`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isInt16Array");
        return true;
      },
    );
  });

  it("should pass for Int32Array", function () {
    referee.refute.isInt16Array(new Int32Array(2));
  });

  it("should pass for Array", function () {
    referee.refute.isInt16Array([]);
  });

  it("should pass for Object", function () {
    referee.refute.isInt16Array({});
  });

  it("should pass for arguments", function () {
    referee.refute.isInt16Array(captureArgs());
  });

  it("should fail with custom message", function () {
    var message = "1cf37727-f020-4ce8-840d-acb7ffc2ac21";
    const actual = new Int16Array(2);

    assert.throws(
      function () {
        referee.refute.isInt16Array(actual, message);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isInt16Array] ${message}: Expected ${inspect(
            actual,
          )} not to be an Int16Array`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isInt16Array");
        return true;
      },
    );
  });
});
