"use strict";

const assert = require("assert");
const referee = require("../referee");
const captureArgs = require("../test-helper/capture-args");
const inspect = require("util").inspect;

describe("assert.isIntlCollator", function () {
  it("should pass for Intl.Collator", function () {
    referee.assert.isIntlCollator(new Intl.Collator());
  });

  it("should fail for String", function () {
    assert.throws(
      () => {
        referee.assert.isIntlCollator("apple pie");
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isIntlCollator] Expected 'apple pie' to be an Intl.Collator",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isIntlCollator");
        return true;
      },
    );
  });

  it("should fail for Array", function () {
    assert.throws(
      () => {
        referee.assert.isIntlCollator([]);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isIntlCollator] Expected [] to be an Intl.Collator",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isIntlCollator");
        return true;
      },
    );
  });

  it("should fail for Object", function () {
    assert.throws(
      () => {
        referee.assert.isIntlCollator({});
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isIntlCollator] Expected {} to be an Intl.Collator",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isIntlCollator");
        return true;
      },
    );
  });

  it("should fail for arguments", function () {
    assert.throws(
      () => {
        referee.assert.isIntlCollator(captureArgs());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isIntlCollator] Expected [Arguments] {} to be an Intl.Collator",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isIntlCollator");
        return true;
      },
    );
  });

  it("should fail with custom message", function () {
    const message = "de8e08f7-f0da-44d9-912e-f7c704dcf929";

    assert.throws(
      () => {
        referee.assert.isIntlCollator("apple pie", message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isIntlCollator] ${message}: Expected 'apple pie' to be an Intl.Collator`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isIntlCollator");
        return true;
      },
    );
  });
});

describe("refute.isIntlCollator", function () {
  it("should fail for Intl.Collator", function () {
    const object = new Intl.Collator();

    assert.throws(
      () => {
        referee.refute.isIntlCollator(object);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isIntlCollator] Expected ${inspect(
            object,
          )} not to be an Intl.Collator`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isIntlCollator");
        return true;
      },
    );
  });

  it("should pass for String", function () {
    referee.refute.isIntlCollator("apple pie");
  });

  it("should pass for Array", function () {
    referee.refute.isIntlCollator([]);
  });

  it("should pass for Object", function () {
    referee.refute.isIntlCollator({});
  });

  it("should pass for arguments", function () {
    referee.refute.isIntlCollator(captureArgs());
  });

  it("should fail with custom message", function () {
    const message = "0d6ff45e-4794-41d2-90ce-41b554580bb6";
    const object = new Intl.Collator();

    assert.throws(
      () => {
        referee.refute.isIntlCollator(object, message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isIntlCollator] ${message}: Expected ${inspect(
            object,
          )} not to be an Intl.Collator`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isIntlCollator");
        return true;
      },
    );
  });
});
