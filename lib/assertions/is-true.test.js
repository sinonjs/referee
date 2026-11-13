"use strict";

const assert = require("assert");
const referee = require("../referee");

describe("isTrue", function () {
  it("should pass for true", function () {
    referee.assert.isTrue(true);
  });

  it("should fail for false", function () {
    let actual;
    try {
      referee.assert.isTrue(false);
    } catch (err) {
      actual = err;
    }
    assert.equal(actual.code, "ERR_ASSERTION");
    assert.equal(actual.operator, "assert.isTrue");
  });

  it("should fail for object", function () {
    let actual;
    try {
      referee.assert.isTrue({});
    } catch (err) {
      actual = err;
    }
    assert.equal(actual.code, "ERR_ASSERTION");
    assert.equal(actual.operator, "assert.isTrue");
  });

  it("should fail for array", function () {
    let actual;
    try {
      referee.assert.isTrue([]);
    } catch (err) {
      actual = err;
    }
    assert.equal(actual.code, "ERR_ASSERTION");
    assert.equal(actual.operator, "assert.isTrue");
  });

  it("should fail for string", function () {
    let actual;
    try {
      referee.assert.isTrue("32");
    } catch (err) {
      actual = err;
    }
    assert.equal(actual.code, "ERR_ASSERTION");
    assert.equal(actual.operator, "assert.isTrue");
  });

  it("should fail for number", function () {
    let actual;
    try {
      referee.assert.isTrue(32);
    } catch (err) {
      actual = err;
    }
    assert.equal(actual.code, "ERR_ASSERTION");
    assert.equal(actual.operator, "assert.isTrue");
  });

  it("should fail if not passed arguments", function () {
    let actual;
    try {
      referee.assert.isTrue();
    } catch (err) {
      actual = err;
    }
    assert.equal(actual.code, "ERR_ASSERTION");
    assert.equal(
      actual.message,
      "[assert.isTrue] Expected to receive at least 1 argument(s)",
    );
  });
});
