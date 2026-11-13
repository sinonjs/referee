"use strict";

const assert = require("assert");
const referee = require("../referee");
const captureArgs = require("../test-helper/capture-args");

describe("assert.isSet", function () {
  it("should pass for set", function () {
    referee.assert.isSet(new Set());
  });

  it("should fail for string", function () {
    assert.throws(
      () => {
        referee.assert.isSet("apple pie");
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isSet] Expected 'apple pie' to be a Set",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isSet");
        return true;
      },
    );
  });

  it("should fail for array", function () {
    assert.throws(
      () => {
        referee.assert.isSet([]);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.message, "[assert.isSet] Expected [] to be a Set");
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isSet");
        return true;
      },
    );
  });

  it("should fail for object", function () {
    assert.throws(
      () => {
        referee.assert.isSet({});
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.message, "[assert.isSet] Expected {} to be a Set");
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isSet");
        return true;
      },
    );
  });

  it("should fail for arguments", function () {
    assert.throws(
      () => {
        referee.assert.isSet(captureArgs());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isSet] Expected [Arguments] {} to be a Set",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isSet");
        return true;
      },
    );
  });

  it("should fail with custom message", function () {
    const message = "52991c03-11ba-47fb-969c-41e9444448c1";

    assert.throws(
      () => {
        referee.assert.isSet(captureArgs(), message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isSet] ${message}: Expected [Arguments] {} to be a Set`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isSet");
        return true;
      },
    );
  });
});
