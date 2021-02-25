"use strict";

var assert = require("assert");
var referee = require("../referee");
var captureArgs = require("../test-helper/capture-args");

describe("assert.isInfinity", function () {
  it("should pass for Infinity", function () {
    referee.assert.isInfinity(Infinity);
  });

  it("should fail for -Infinity", function () {
    assert.throws(
      function () {
        referee.assert.isInfinity(-Infinity);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isInfinity] Expected -Infinity to be Infinity"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isInfinity");
        return true;
      }
    );
  });

  it("should fail for NaN", function () {
    assert.throws(
      function () {
        referee.assert.isInfinity(NaN);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isInfinity] Expected NaN to be Infinity"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isInfinity");
        return true;
      }
    );
  });

  it("should fail for Array", function () {
    assert.throws(
      function () {
        referee.assert.isInfinity([]);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isInfinity] Expected [] to be Infinity"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isInfinity");
        return true;
      }
    );
  });

  it("should fail for Object", function () {
    assert.throws(
      function () {
        referee.assert.isInfinity({});
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isInfinity] Expected {} to be Infinity"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isInfinity");
        return true;
      }
    );
  });

  it("should fail for arguments", function () {
    assert.throws(
      function () {
        referee.assert.isInfinity(captureArgs());
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isInfinity] Expected [Arguments] {} to be Infinity"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isInfinity");
        return true;
      }
    );
  });

  it("should fail with custom message", function () {
    var message = "bd8f19ef-c847-456f-88d4-70dc540678bb";

    assert.throws(
      function () {
        referee.assert.isInfinity(-Infinity, message);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isInfinity] ${message}: Expected -Infinity to be Infinity`
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isInfinity");
        return true;
      }
    );
  });
});

describe("refute.isInfinity", function () {
  it("should fail for Infinity", function () {
    assert.throws(
      function () {
        referee.refute.isInfinity(Infinity);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isInfinity] Expected Infinity not to be Infinity"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isInfinity");
        return true;
      }
    );
  });

  it("should pass for -Infinity", function () {
    referee.refute.isInfinity(-Infinity);
  });

  it("should pass for NaN", function () {
    referee.refute.isInfinity(NaN);
  });

  it("should pass for Array", function () {
    referee.refute.isInfinity([]);
  });

  it("should pass for Object", function () {
    referee.refute.isInfinity({});
  });

  it("should pass for arguments", function () {
    referee.refute.isInfinity(captureArgs());
  });

  it("should fail with custom message", function () {
    var message = "5fd5a4ca-34a8-42f3-98dd-ba4d39dc4944";

    assert.throws(
      function () {
        referee.refute.isInfinity(Infinity, message);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isInfinity] ${message}: Expected Infinity not to be Infinity`
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isInfinity");
        return true;
      }
    );
  });
});
