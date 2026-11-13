"use strict";

const assert = require("assert");
const inspect = require("util").inspect;
const captureArgs = require("../test-helper/capture-args");
const referee = require("../referee");

describe("assert.isUint32Array", function () {
  it("should pass for Uint32Array", function () {
    referee.assert.isUint32Array(new Uint32Array());
  });

  it("should fail for Uint16Array", function () {
    const actual = new Uint8Array();

    assert.throws(
      () => {
        referee.assert.isUint32Array(actual);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isUint32Array] Expected ${inspect(
            actual,
          )} to be a Uint32Array`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isUint32Array");
        return true;
      },
    );
  });

  it("should fail for Uint8Array", function () {
    const actual = new Uint8Array();

    assert.throws(
      () => {
        referee.assert.isUint32Array(actual);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isUint32Array] Expected ${inspect(
            actual,
          )} to be a Uint32Array`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isUint32Array");
        return true;
      },
    );
  });

  it("should fail for Array", function () {
    assert.throws(
      () => {
        referee.assert.isUint32Array([]);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isUint32Array] Expected [] to be a Uint32Array",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isUint32Array");
        return true;
      },
    );
  });

  it("should fail for Object", function () {
    assert.throws(
      () => {
        referee.assert.isUint32Array({});
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isUint32Array] Expected {} to be a Uint32Array",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isUint32Array");
        return true;
      },
    );
  });

  it("should fail for arguments", function () {
    assert.throws(
      () => {
        referee.assert.isUint32Array(captureArgs());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isUint32Array] Expected [Arguments] {} to be a Uint32Array",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isUint32Array");
        return true;
      },
    );
  });

  it("should fail with custom message", function () {
    const message = "b8895750-3ba7-40f6-bda5-5e769d6c0b62";
    assert.throws(
      () => {
        referee.assert.isUint32Array([], message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isUint32Array] ${message}: Expected [] to be a Uint32Array`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isUint32Array");
        return true;
      },
    );
  });
});

describe("refute.isUint32Array", function () {
  it("should fail for isUint32Array", function () {
    const actual = new Uint32Array();

    assert.throws(
      () => {
        referee.refute.isUint32Array(actual);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isUint32Array] Expected ${inspect(
            actual,
          )} not to be a Uint32Array`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isUint32Array");
        return true;
      },
    );
  });

  it("should fail with custom message", function () {
    const message = "7a548ba3-6efc-4300-8af5-7ff42eb9c064";
    const actual = new Uint32Array();

    assert.throws(
      () => {
        referee.refute.isUint32Array(actual, message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isUint32Array] ${message}: Expected ${inspect(
            actual,
          )} not to be a Uint32Array`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isUint32Array");
        return true;
      },
    );
  });

  it("should pass for Uint16Array", function () {
    referee.refute.isUint32Array(new Uint16Array());
  });

  it("should pass for Uint8Array", function () {
    referee.refute.isUint32Array(new Uint8Array());
  });

  it("should pass for Array", function () {
    referee.refute.isUint32Array([]);
  });

  it("should pass for Object", function () {
    referee.refute.isUint32Array({});
  });

  it("should pass for arguments", function () {
    referee.refute.isUint32Array(captureArgs());
  });
});
