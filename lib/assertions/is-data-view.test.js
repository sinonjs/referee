"use strict";

const assert = require("assert");
const referee = require("../referee");
const captureArgs = require("../test-helper/capture-args");

function getDataView() {
  const ab = new globalThis.ArrayBuffer(8);
  const dv = new globalThis.DataView(ab);

  return dv;
}

describe("assert.isDataView", function () {
  it("should pass for DataView", function () {
    referee.assert.isDataView(getDataView());
  });

  it("should fail for ArrayBuffer", function () {
    assert.throws(
      () => {
        referee.assert.isDataView(new globalThis.ArrayBuffer(8));
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isDataView] Expected ArrayBuffer {\n" +
            "  [Uint8Contents]: <00 00 00 00 00 00 00 00>,\n" +
            "  byteLength: 8\n" +
            "} to be a DataView",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isDataView");
        return true;
      },
    );
  });

  it("should fail for Array", function () {
    assert.throws(
      () => {
        referee.assert.isDataView([]);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isDataView] Expected [] to be a DataView",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isDataView");
        return true;
      },
    );
  });
  it("should fail for Object", function () {
    assert.throws(
      () => {
        referee.assert.isDataView({});
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isDataView] Expected {} to be a DataView",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isDataView");
        return true;
      },
    );
  });

  it("should fail for arguments", function () {
    assert.throws(
      () => {
        referee.assert.isDataView(captureArgs());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isDataView] Expected [Arguments] {} to be a DataView",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isDataView");
        return true;
      },
    );
  });
  it("should fail with custom message", function () {
    const message = "c7472468-b79e-4d4a-afc4-593aef562521";

    assert.throws(
      () => {
        referee.assert.isDataView([], message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isDataView] ${message}: Expected [] to be a DataView`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isDataView");
        return true;
      },
    );
  });
});

describe("refute.isDataView", function () {
  it("should fail for DataView", function () {
    assert.throws(
      () => {
        referee.refute.isDataView(getDataView());
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isDataView] Expected DataView {\n" +
            "  byteLength: 8,\n" +
            "  byteOffset: 0,\n" +
            "  buffer: ArrayBuffer {\n" +
            "    [Uint8Contents]: <00 00 00 00 00 00 00 00>,\n" +
            "    byteLength: 8\n" +
            "  }\n" +
            "} not to be a DataView",
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isDataView");
        return true;
      },
    );
  });

  it("should pass for ArrayBuffer", function () {
    referee.refute.isDataView(new globalThis.ArrayBuffer(8));
  });

  it("should pass for Array", function () {
    referee.refute.isDataView([]);
  });

  it("should pass for Object", function () {
    referee.refute.isDataView({});
  });

  it("should pass for arguments", function () {
    referee.refute.isDataView(captureArgs());
  });

  it("should fail with custom message", function () {
    const message = "ce1d6d74-060d-4655-b008-00b6cdfe1298";
    assert.throws(
      () => {
        referee.refute.isDataView(getDataView(), message);
      },
      (error) => {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isDataView] ${message}: Expected DataView {\n` +
            `  byteLength: 8,\n` +
            `  byteOffset: 0,\n` +
            `  buffer: ArrayBuffer {\n` +
            `    [Uint8Contents]: <00 00 00 00 00 00 00 00>,\n` +
            `    byteLength: 8\n` +
            `  }\n` +
            `} not to be a DataView`,
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isDataView");
        return true;
      },
    );
  });
});
