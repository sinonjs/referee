"use strict";

const assert = require("assert");
const referee = require("../referee");

describe("assert.contains", function () {
  it("should pass when array contains value", function () {
    referee.assert.contains([0, 1, 2], 1);
  });

  it("should fail when array does not contain value", function () {
    assert.throws(
      () => {
        referee.assert.contains([0, 1, 2], 3);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.contains] Expected [ 0, 1, 2 ] to contain 3",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.contains");
        return true;
      },
    );
  });

  it("should fail with custom message", function () {
    const message = "b776803e-4213-4061-bc82-e5f3e5b5bacd";

    assert.throws(
      () => {
        referee.assert.contains([0, 1, 2], 3, message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.contains] ${message}: Expected [ 0, 1, 2 ] to contain 3`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.contains");
        return true;
      },
    );
  });

  it("should pass when array contains the actual object", function () {
    const actual = {};

    referee.assert.contains([actual], actual);
  });

  it("should fail when array contains an equivalent object", function () {
    const actual = {};
    const notActual = {};

    assert.throws(
      () => {
        referee.assert.contains([notActual], actual);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.contains] Expected [ {} ] to contain {}",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.contains");
        return true;
      },
    );
  });
});

describe("refute.contains", function () {
  it("should fail when array contains value", function () {
    assert.throws(
      () => {
        referee.refute.contains([0, 1, 2], 1);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.contains] Expected [ 0, 1, 2 ] not to contain 1",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.contains");
        return true;
      },
    );
  });

  it("should fail with a custom message", function () {
    const message = "a1b2b6d2-42ec-4686-b550-ca651d97cfe1";

    assert.throws(
      () => {
        referee.refute.contains([0, 1, 2], 1, message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.contains] ${message}: Expected [ 0, 1, 2 ] not to contain 1`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.contains");
        return true;
      },
    );
  });

  it("should pass when array does not contain the value", function () {
    referee.refute.contains([0, 1, 2], 3);
  });

  it("should fail when array contains the actual object", function () {
    assert.throws(
      () => {
        const actual = {};

        referee.refute.contains([actual], actual);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.contains] Expected [ {} ] not to contain {}",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.contains");
        return true;
      },
    );
  });

  it("should not fail when array contains an equivalent object", function () {
    const actual = {};
    const notActual = {};

    referee.refute.contains([notActual], actual);
  });
});
