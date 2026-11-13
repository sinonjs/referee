"use strict";

const assert = require("assert");
const referee = require("../referee");
const captureArgs = require("../test-helper/capture-args");
const inspect = require("util").inspect;

describe("assert.isIntlDateTimeFormat", function () {
  it("should pass for Intl.DateTimeFormat", function () {
    referee.assert.isIntlDateTimeFormat(new Intl.DateTimeFormat());
  });

  it("should fail for String", function () {
    assert.throws(
      () => {
        referee.assert.isIntlDateTimeFormat("apple pie");
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isIntlDateTimeFormat] Expected 'apple pie' to be an Intl.DateTimeFormat",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isIntlDateTimeFormat");
        return true;
      },
    );
  });

  it("should fail for Array", function () {
    assert.throws(
      () => {
        referee.assert.isIntlDateTimeFormat([]);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isIntlDateTimeFormat] Expected [] to be an Intl.DateTimeFormat",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isIntlDateTimeFormat");
        return true;
      },
    );
  });

  it("should fail for Object", function () {
    assert.throws(
      () => {
        referee.assert.isIntlDateTimeFormat({});
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isIntlDateTimeFormat] Expected {} to be an Intl.DateTimeFormat",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isIntlDateTimeFormat");
        return true;
      },
    );
  });

  it("should fail for arguments", function () {
    assert.throws(
      () => {
        referee.assert.isIntlDateTimeFormat(captureArgs());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isIntlDateTimeFormat] Expected [Arguments] {} to be an Intl.DateTimeFormat",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isIntlDateTimeFormat");
        return true;
      },
    );
  });

  it("should fail with custom message", function () {
    const message = "b43c086b-2553-4882-8abb-0ef92965b699";

    assert.throws(
      () => {
        referee.assert.isIntlDateTimeFormat("apple pie", message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isIntlDateTimeFormat] ${message}: Expected 'apple pie' to be an Intl.DateTimeFormat`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isIntlDateTimeFormat");
        return true;
      },
    );
  });
});

describe("refute.isIntlDateTimeFormat", function () {
  it("should fail for Intl.DateTimeFormat", function () {
    const object = new Intl.DateTimeFormat();

    assert.throws(
      () => {
        referee.refute.isIntlDateTimeFormat(object);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isIntlDateTimeFormat] Expected ${inspect(
            object,
          )} not to be an Intl.DateTimeFormat`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isIntlDateTimeFormat");
        return true;
      },
    );
  });

  it("should pass for String", function () {
    referee.refute.isIntlDateTimeFormat("apple pie");
  });

  it("should pass for Array", function () {
    referee.refute.isIntlDateTimeFormat([]);
  });

  it("should pass for Object", function () {
    referee.refute.isIntlDateTimeFormat({});
  });

  it("should pass for arguments", function () {
    referee.refute.isIntlDateTimeFormat(captureArgs());
  });

  it("should fail with custom message", function () {
    const message = "c485cacd-b75c-4c2c-8903-c2e7f9b16766";
    const object = new Intl.DateTimeFormat();

    assert.throws(
      () => {
        referee.refute.isIntlDateTimeFormat(object, message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isIntlDateTimeFormat] ${message}: Expected ${inspect(
            object,
          )} not to be an Intl.DateTimeFormat`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isIntlDateTimeFormat");
        return true;
      },
    );
  });
});
