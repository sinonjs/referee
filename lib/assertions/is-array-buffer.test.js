"use strict";

var assert = require("assert");
var referee = require("../referee");
var captureArgs = require("../test-helper/capture-args");

describe("assert.isArrayBuffer", function () {
  context("when called with an ArrayBuffer instance", function () {
    it("should pass", function () {
      referee.assert.isArrayBuffer(new global.ArrayBuffer(8));
    });
  });

  context("when called with Array", function () {
    it("should fail", function () {
      assert.throws(
        function () {
          referee.assert.isArrayBuffer([]);
        },
        function (error) {
          assert.equal(error.code, "ERR_ASSERTION");
          assert.equal(
            error.message,
            "[assert.isArrayBuffer] Expected [] to be an ArrayBuffer",
          );
          assert.equal(error.name, "AssertionError");
          assert.equal(error.operator, "assert.isArrayBuffer");

          return true;
        },
      );
    });
  });

  context("when called with Object", function () {
    it("should fail", function () {
      assert.throws(
        function () {
          referee.assert.isArrayBuffer({});
        },
        function (error) {
          assert.equal(error.code, "ERR_ASSERTION");
          assert.equal(
            error.message,
            "[assert.isArrayBuffer] Expected {} to be an ArrayBuffer",
          );
          assert.equal(error.name, "AssertionError");
          assert.equal(error.operator, "assert.isArrayBuffer");

          return true;
        },
      );
    });
  });

  context("when called with arguments", function () {
    it("should fail", function () {
      assert.throws(
        function () {
          referee.assert.isArrayBuffer(captureArgs());
        },
        function (error) {
          assert.equal(error.code, "ERR_ASSERTION");
          assert.equal(
            error.message,
            "[assert.isArrayBuffer] Expected [Arguments] {} to be an ArrayBuffer",
          );
          assert.equal(error.name, "AssertionError");
          assert.equal(error.operator, "assert.isArrayBuffer");

          return true;
        },
      );
    });
  });
});

describe("refute.isArrayBuffer", function () {
  context("when called with an ArrayBuffer instance", function () {
    it("should fail", function () {
      assert.throws(
        function () {
          referee.refute.isArrayBuffer(new global.ArrayBuffer(8));
        },
        function (error) {
          assert.equal(error.code, "ERR_ASSERTION");
          assert.equal(
            error.message,
            "[refute.isArrayBuffer] Expected ArrayBuffer {\n" +
              "  [Uint8Contents]: <00 00 00 00 00 00 00 00>,\n" +
              "  byteLength: 8\n" +
              "} not to be an ArrayBuffer",
          );
          assert.equal(error.name, "AssertionError");
          assert.equal(error.operator, "refute.isArrayBuffer");

          return true;
        },
      );
    });
  });

  context("when called with Array", function () {
    it("should pass", function () {
      referee.refute.isArrayBuffer([]);
    });
  });

  context("when called with Object", function () {
    it("should pass", function () {
      referee.refute.isArrayBuffer({});
    });
  });

  context("when called with arguments", function () {
    it("should pass", function () {
      referee.refute.isArrayBuffer(captureArgs());
    });
  });
});
