"use strict";

var assert = require("assert");
var referee = require("../referee");
var captureArgs = require("../test-helper/capture-args");

describe("assert.isIntlDateTimeFormat", function () {
  it("should pass for Intl.DateTimeFormat", function () {
    referee.assert.isIntlDateTimeFormat(new Intl.DateTimeFormat());
  });

  it("should fail for String", function () {
    assert.throws(
      function () {
        referee.assert.isIntlDateTimeFormat("apple pie");
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isIntlDateTimeFormat] Expected 'apple pie' to be an Intl.DateTimeFormat"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isIntlDateTimeFormat");
        return true;
      }
    );
  });

  it("should fail for Array", function () {
    assert.throws(
      function () {
        referee.assert.isIntlDateTimeFormat([]);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isIntlDateTimeFormat] Expected [] to be an Intl.DateTimeFormat"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isIntlDateTimeFormat");
        return true;
      }
    );
  });

  it("should fail for Object", function () {
    assert.throws(
      function () {
        referee.assert.isIntlDateTimeFormat({});
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isIntlDateTimeFormat] Expected {} to be an Intl.DateTimeFormat"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isIntlDateTimeFormat");
        return true;
      }
    );
  });

  it("should fail for arguments", function () {
    assert.throws(
      function () {
        referee.assert.isIntlDateTimeFormat(captureArgs());
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isIntlDateTimeFormat] Expected [Arguments] {} to be an Intl.DateTimeFormat"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isIntlDateTimeFormat");
        return true;
      }
    );
  });

  it("should fail with custom message", function () {
    var message = "b43c086b-2553-4882-8abb-0ef92965b699";

    assert.throws(
      function () {
        referee.assert.isIntlDateTimeFormat("apple pie", message);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isIntlDateTimeFormat] " +
            message +
            ": Expected 'apple pie' to be an Intl.DateTimeFormat"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isIntlDateTimeFormat");
        return true;
      }
    );
  });
});

describe("refute.isIntlDateTimeFormat", function () {
  it("should fail for Intl.DateTimeFormat", function () {
    assert.throws(
      function () {
        referee.refute.isIntlDateTimeFormat(new Intl.DateTimeFormat());
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isIntlDateTimeFormat] Expected DateTimeFormat [Object] {} not to be an Intl.DateTimeFormat"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isIntlDateTimeFormat");
        return true;
      }
    );
  });

  it("should pass for String", function () {
    referee.refute.isIntlDateTimeFormat("apple pie");
  });

  it("should pass for Array", function () {
    referee.refute.isIntlDateTimeFormat([]);
  });

  it("should pass for Object", function () {
    referee.refute.isIntlDateTimeFormat({});
  });

  it("should pass for arguments", function () {
    referee.refute.isIntlDateTimeFormat(captureArgs());
  });

  it("should fail with custom message", function () {
    var message = "c485cacd-b75c-4c2c-8903-c2e7f9b16766";
    assert.throws(
      function () {
        referee.refute.isIntlDateTimeFormat(new Intl.DateTimeFormat(), message);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isIntlDateTimeFormat] " +
            message +
            ": Expected DateTimeFormat [Object] {} not to be an Intl.DateTimeFormat"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isIntlDateTimeFormat");
        return true;
      }
    );
  });
});
