"use strict";

const assert = require("assert");
const referee = require("../referee");
const captureArgs = require("../test-helper/capture-args");

// eslint-disable-next-line no-empty-function
function noop() {}

describe("assert.isPromise", function () {
  it("should pass for Promise", function () {
    referee.assert.isPromise(Promise.resolve("apple pie"));
  });

  it("should fail for String", function () {
    assert.throws(
      () => {
        referee.assert.isPromise("apple pie");
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isPromise] Expected 'apple pie' to be a Promise",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isPromise");
        return true;
      },
    );
  });

  it("should fail for Array", function () {
    assert.throws(
      () => {
        referee.assert.isPromise([]);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isPromise] Expected [] to be a Promise",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isPromise");
        return true;
      },
    );
  });

  it("should fail for Function", function () {
    assert.throws(
      () => {
        referee.assert.isPromise(noop);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isPromise] Expected [Function: noop] to be a Promise",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isPromise");
        return true;
      },
    );
  });

  it("should fail for Object", function () {
    assert.throws(
      () => {
        referee.assert.isPromise({});
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isPromise] Expected {} to be a Promise",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isPromise");
        return true;
      },
    );
  });

  it("should fail for arguments", function () {
    assert.throws(
      () => {
        referee.assert.isPromise(captureArgs());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isPromise] Expected [Arguments] {} to be a Promise",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isPromise");
        return true;
      },
    );
  });

  it("should fail with custom message", function () {
    const message = "083406d6-58f6-41ff-9e00-f53edf9fa4aa";
    assert.throws(
      () => {
        referee.assert.isPromise("apple pie", message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isPromise] ${message}: Expected 'apple pie' to be a Promise`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isPromise");
        return true;
      },
    );
  });
});

describe("refute.isPromise", function () {
  it("should fail for Promise", function () {
    assert.throws(
      () => {
        referee.refute.isPromise(Promise.resolve("apple pie"));
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isPromise] Expected Promise { 'apple pie' } not to be a Promise",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isPromise");
        return true;
      },
    );
  });

  it("should pass for String", function () {
    referee.refute.isPromise("apple pie");
  });

  it("should pass for Array", function () {
    referee.refute.isPromise([]);
  });

  it("should pass for Function", function () {
    referee.refute.isPromise(noop);
  });

  it("should pass for Object", function () {
    referee.refute.isPromise({});
  });

  it("should pass for arguments", function () {
    referee.refute.isPromise(captureArgs());
  });

  it("should fail with custom message", function () {
    const message = "30712884-5ff3-43d6-9f30-5901e840c75f";

    assert.throws(
      () => {
        referee.refute.isPromise(Promise.resolve("apple pie"), message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isPromise] ${message}: Expected Promise { 'apple pie' } not to be a Promise`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isPromise");
        return true;
      },
    );
  });
});
