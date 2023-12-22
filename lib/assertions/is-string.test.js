"use strict";

var assert = require("assert");
var referee = require("../referee");

describe("isString", function () {
  it("should pass for string", function () {
    referee.assert.isString("Hey");
  });

  it("should fail for object", function () {
    assert.throws(
      function () {
        referee.assert.isString({});
      },
      function (error) {
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
      function () {
        referee.assert.isString([]);
      },
      function (error) {
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
      function () {
        referee.assert.isString(34);
      },
      function (error) {
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
      function () {
        referee.assert.isString(true);
      },
      function (error) {
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
