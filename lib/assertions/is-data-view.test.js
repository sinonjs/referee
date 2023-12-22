"use strict";

var assert = require("assert");
var referee = require("../referee");
var captureArgs = require("../test-helper/capture-args");

function getDataView() {
  var ab = new global.ArrayBuffer(8);
  var dv = new global.DataView(ab);

  return dv;
}

describe("assert.isDataView", function () {
  it("should pass for DataView", function () {
    referee.assert.isDataView(getDataView());
  });

  it("should fail for ArrayBuffer", function () {
    assert.throws(
      function () {
        referee.assert.isDataView(new global.ArrayBuffer(8));
      },
      function (error) {
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
      function () {
        referee.assert.isDataView([]);
      },
      function (error) {
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
      function () {
        referee.assert.isDataView({});
      },
      function (error) {
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
      function () {
        referee.assert.isDataView(captureArgs());
      },
      function (error) {
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
    var message = "c7472468-b79e-4d4a-afc4-593aef562521";

    assert.throws(
      function () {
        referee.assert.isDataView([], message);
      },
      function (error) {
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
      function () {
        referee.refute.isDataView(getDataView());
      },
      function (error) {
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
    referee.refute.isDataView(new global.ArrayBuffer(8));
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
    var message = "ce1d6d74-060d-4655-b008-00b6cdfe1298";
    assert.throws(
      function () {
        referee.refute.isDataView(getDataView(), message);
      },
      function (error) {
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
