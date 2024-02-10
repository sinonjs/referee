"use strict";

var assert = require("assert");
var inspect = require("util").inspect;
var captureArgs = require("../test-helper/capture-args");
var referee = require("../referee");

describe("assert.isUint16Array", function () {
  it("should pass for isUint16Array", function () {
    referee.assert.isUint16Array(new Uint16Array());
  });

  it("should fail for Uint32Array", function () {
    const actual = new Uint32Array();

    assert.throws(
      function () {
        referee.assert.isUint16Array(actual);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isUint16Array] Expected ${inspect(
            actual,
          )} to be a Uint16Array`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isUint16Array");
        return true;
      },
    );
  });

  it("should fail for Uint8Array", function () {
    const actual = new Uint8Array();

    assert.throws(
      function () {
        referee.assert.isUint16Array(actual);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isUint16Array] Expected ${inspect(
            actual,
          )} to be a Uint16Array`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isUint16Array");
        return true;
      },
    );
  });

  it("should fail for Array", function () {
    assert.throws(
      function () {
        referee.assert.isUint16Array([]);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isUint16Array] Expected [] to be a Uint16Array",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isUint16Array");
        return true;
      },
    );
  });

  it("should fail for Object", function () {
    assert.throws(
      function () {
        referee.assert.isUint16Array({});
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isUint16Array] Expected {} to be a Uint16Array",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isUint16Array");
        return true;
      },
    );
  });

  it("should fail for arguments", function () {
    assert.throws(
      function () {
        referee.assert.isUint16Array(captureArgs());
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isUint16Array] Expected [Arguments] {} to be a Uint16Array",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isUint16Array");
        return true;
      },
    );
  });

  it("should fail with custom message", function () {
    var message = "b8895750-3ba7-40f6-bda5-5e769d6c0b62";
    assert.throws(
      function () {
        referee.assert.isUint16Array([], message);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isUint16Array] ${message}: Expected [] to be a Uint16Array`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isUint16Array");
        return true;
      },
    );
  });
});

describe("refute.isUint16Array", function () {
  it("should fail for isUint16Array", function () {
    const actual = new Uint16Array();

    assert.throws(
      function () {
        referee.refute.isUint16Array(actual);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isUint16Array] Expected ${inspect(
            actual,
          )} not to be a Uint16Array`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isUint16Array");
        return true;
      },
    );
  });

  it("should fail with custom message", function () {
    var message = "7a548ba3-6efc-4300-8af5-7ff42eb9c064";
    const actual = new Uint16Array();

    assert.throws(
      function () {
        referee.refute.isUint16Array(actual, message);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isUint16Array] ${message}: Expected ${inspect(
            actual,
          )} not to be a Uint16Array`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isUint16Array");
        return true;
      },
    );
  });

  it("should pass for Uint32Array", function () {
    referee.refute.isUint16Array(new Uint32Array());
  });

  it("should pass for Uint8Array", function () {
    referee.refute.isUint16Array(new Uint8Array());
  });

  it("should pass for Array", function () {
    referee.refute.isUint16Array([]);
  });

  it("should pass for Object", function () {
    referee.refute.isUint16Array({});
  });

  it("should pass for arguments", function () {
    referee.refute.isUint16Array(captureArgs());
  });
});
