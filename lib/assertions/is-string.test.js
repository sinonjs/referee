"use strict";

const assert = require("assert");
const referee = require("../referee");

describe("isString", function () {
  it("should pass for string", function () {
    referee.assert.isString("Hey");
  });

  it("should fail for object", function () {
    assert.throws(
      () => {
        referee.assert.isString({});
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isString] Expected {} ('object') to be string",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isString");
        return true;
      },
    );
  });

  it("should fail for array", function () {
    assert.throws(
      () => {
        referee.assert.isString([]);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isString] Expected [] ('object') to be string",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isString");
        return true;
      },
    );
  });

  it("should fail for number", function () {
    assert.throws(
      () => {
        referee.assert.isString(34);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isString] Expected 34 ('number') to be string",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isString");
        return true;
      },
    );
  });

  it("should fail for boolean", function () {
    assert.throws(
      () => {
        referee.assert.isString(true);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isString] Expected true ('boolean') to be string",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isString");
        return true;
      },
    );
  });
});
