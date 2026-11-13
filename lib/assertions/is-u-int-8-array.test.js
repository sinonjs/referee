"use strict";

const assert = require("assert");
const inspect = require("util").inspect;
const captureArgs = require("../test-helper/capture-args");
const referee = require("../referee");

describe("assert.isUint8Array", function () {
  it("should pass for Uint8Array", function () {
    referee.assert.isUint8Array(new Uint8Array());
  });

  it("should fail for Uint16Array", function () {
    const actual = new Uint16Array();

    assert.throws(
      () => {
        referee.assert.isUint8Array(actual);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isUint8Array] Expected ${inspect(
            actual,
          )} to be a Uint8Array`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isUint8Array");
        return true;
      },
    );
  });

  it("should fail for Uint32Array", function () {
    const actual = new Uint32Array();

    assert.throws(
      () => {
        referee.assert.isUint8Array(actual);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isUint8Array] Expected ${inspect(
            actual,
          )} to be a Uint8Array`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isUint8Array");
        return true;
      },
    );
  });

  it("should fail for Array", function () {
    assert.throws(
      () => {
        referee.assert.isUint8Array([]);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isUint8Array] Expected [] to be a Uint8Array",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isUint8Array");
        return true;
      },
    );
  });

  it("should fail for Object", function () {
    assert.throws(
      () => {
        referee.assert.isUint8Array({});
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isUint8Array] Expected {} to be a Uint8Array",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isUint8Array");
        return true;
      },
    );
  });

  it("should fail for arguments", function () {
    assert.throws(
      () => {
        referee.assert.isUint8Array(captureArgs());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isUint8Array] Expected [Arguments] {} to be a Uint8Array",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isUint8Array");
        return true;
      },
    );
  });

  it("should fail with custom message", function () {
    const message = "b8895750-3ba7-40f6-bda5-5e769d6c0b62";
    assert.throws(
      () => {
        referee.assert.isUint8Array([], message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isUint8Array] ${message}: Expected [] to be a Uint8Array`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isUint8Array");
        return true;
      },
    );
  });
});

describe("refute.isUint8Array", function () {
  it("should fail for isUint8Array", function () {
    const actual = new Uint8Array();

    assert.throws(
      () => {
        referee.refute.isUint8Array(actual);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isUint8Array] Expected ${inspect(
            actual,
          )} not to be a Uint8Array`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isUint8Array");
        return true;
      },
    );
  });

  it("should fail with custom message", function () {
    const message = "9ddf1b4c-4382-4744-ae88-d14c69f20626";
    const actual = new Uint8Array();

    assert.throws(
      () => {
        referee.refute.isUint8Array(actual, message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isUint8Array] ${message}: Expected ${inspect(
            actual,
          )} not to be a Uint8Array`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isUint8Array");
        return true;
      },
    );
  });

  it("should pass for Uint16Array", function () {
    referee.refute.isUint8Array(new Uint16Array());
  });

  it("should pass for Uint32Array", function () {
    referee.refute.isUint8Array(new Uint32Array());
  });

  it("should pass for Array", function () {
    referee.refute.isUint8Array([]);
  });

  it("should pass for Object", function () {
    referee.refute.isUint8Array({});
  });

  it("should pass for arguments", function () {
    referee.refute.isUint8Array(captureArgs());
  });
});
