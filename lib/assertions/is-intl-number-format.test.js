"use strict";

const assert = require("assert");
const referee = require("../referee");
const captureArgs = require("../test-helper/capture-args");
const inspect = require("util").inspect;

describe("assert.isIntlNumberFormat", function () {
  it("should pass for Intl.NumberFormat", function () {
    referee.assert.isIntlNumberFormat(new Intl.NumberFormat());
  });

  it("should fail for String", function () {
    assert.throws(
      () => {
        referee.assert.isIntlNumberFormat("apple pie");
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isIntlNumberFormat] Expected 'apple pie' to be an Intl.NumberFormat",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isIntlNumberFormat");
        return true;
      },
    );
  });

  it("should fail for Array", function () {
    assert.throws(
      () => {
        referee.assert.isIntlNumberFormat([]);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isIntlNumberFormat] Expected [] to be an Intl.NumberFormat",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isIntlNumberFormat");
        return true;
      },
    );
  });

  it("should fail for Object", function () {
    assert.throws(
      () => {
        referee.assert.isIntlNumberFormat({});
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isIntlNumberFormat] Expected {} to be an Intl.NumberFormat",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isIntlNumberFormat");
        return true;
      },
    );
  });

  it("should fail for arguments", function () {
    assert.throws(
      () => {
        referee.assert.isIntlNumberFormat(captureArgs());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isIntlNumberFormat] Expected [Arguments] {} to be an Intl.NumberFormat",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isIntlNumberFormat");
        return true;
      },
    );
  });

  it("should fail with custom message", function () {
    const message = "4eb2174d-3faa-4095-92d1-cd8dfb7e2a58";

    assert.throws(
      () => {
        referee.assert.isIntlNumberFormat("apple pie", message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isIntlNumberFormat] ${message}: Expected 'apple pie' to be an Intl.NumberFormat`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isIntlNumberFormat");
        return true;
      },
    );
  });
});

describe("refute.isIntlNumberFormat", function () {
  it("should fail for Intl.NumberFormat", function () {
    const object = new Intl.NumberFormat();
    assert.throws(
      () => {
        referee.refute.isIntlNumberFormat(object);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isIntlNumberFormat] Expected ${inspect(
            object,
          )} not to be an Intl.NumberFormat`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isIntlNumberFormat");
        return true;
      },
    );
  });

  it("should pass for String", function () {
    referee.refute.isIntlNumberFormat("apple pie");
  });

  it("should pass for Array", function () {
    referee.refute.isIntlNumberFormat([]);
  });

  it("should pass for Object", function () {
    referee.refute.isIntlNumberFormat({});
  });

  it("should pass for arguments", function () {
    referee.refute.isIntlNumberFormat(captureArgs());
  });

  it("should fail with custom message", function () {
    const message = "f84e51dd-d5af-4ef0-81ec-2d575eadd735";
    const object = new Intl.NumberFormat();
    assert.throws(
      () => {
        referee.refute.isIntlNumberFormat(object, message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isIntlNumberFormat] ${message}: Expected ${inspect(
            object,
          )} not to be an Intl.NumberFormat`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isIntlNumberFormat");
        return true;
      },
    );
  });
});
