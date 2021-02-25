"use strict";

var assert = require("assert");
var referee = require("../referee");

describe("assert.isFalse", function () {
  it("should pass for false", function () {
    referee.assert.isFalse(false);
  });

  it("should fail for true", function () {
    assert.throws(
      function () {
        referee.assert.isFalse(true);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isFalse] Expected true to be false"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isFalse");
        return true;
      }
    );
  });

  it("should fail for empty string", function () {
    assert.throws(
      function () {
        referee.assert.isFalse("");
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.message, "[assert.isFalse] Expected '' to be false");
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isFalse");
        return true;
      }
    );
  });

  it("should fail for zero", function () {
    assert.throws(
      function () {
        referee.assert.isFalse(0);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(error.message, "[assert.isFalse] Expected 0 to be false");
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isFalse");
        return true;
      }
    );
  });

  it("should fail for NaN", function () {
    assert.throws(
      function () {
        referee.assert.isFalse(NaN);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isFalse] Expected NaN to be false"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isFalse");
        return true;
      }
    );
  });

  it("should fail for null", function () {
    assert.throws(
      function () {
        referee.assert.isFalse(null);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isFalse] Expected null to be false"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isFalse");
        return true;
      }
    );
  });

  it("should fail for undefined", function () {
    assert.throws(
      function () {
        referee.assert.isFalse(undefined);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isFalse] Expected undefined to be false"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isFalse");
        return true;
      }
    );
  });

  it("should fail with custom message", function () {
    var message = "f9cc72c8-d4d0-40a0-9fdf-2ec3f345788e";

    assert.throws(
      function () {
        referee.assert.isFalse(true, message);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isFalse] ${message}: Expected true to be false`
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isFalse");
        return true;
      }
    );
  });
});

describe("refute.isFalse", function () {
  it("should fail for false", function () {
    assert.throws(
      function () {
        referee.refute.isFalse(false);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isFalse] Expected false to not be false"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isFalse");
        return true;
      }
    );
  });

  it("should pass for true", function () {
    referee.refute.isFalse(true);
  });

  it("should pass for empty string", function () {
    referee.refute.isFalse("");
  });

  it("should pass for zero", function () {
    referee.refute.isFalse(0);
  });

  it("should pass for NaN", function () {
    referee.refute.isFalse(NaN);
  });

  it("should pass for null", function () {
    referee.refute.isFalse(null);
  });

  it("should pass for undefined", function () {
    referee.refute.isFalse(undefined);
  });

  it("should fail with custom message", function () {
    var message = "ae298a16-7ddd-499d-a34a-f92d0b5f9c5e";

    assert.throws(
      function () {
        referee.refute.isFalse(false, message);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isFalse] ${message}: Expected false to not be false`
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isFalse");
        return true;
      }
    );
  });
});
