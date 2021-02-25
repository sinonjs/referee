"use strict";

var assert = require("assert");
var referee = require("../referee");

describe("assert.contains", function () {
  it("should pass when array contains value", function () {
    referee.assert.contains([0, 1, 2], 1);
  });

  it("should fail when array does not contain value", function () {
    assert.throws(
      function () {
        referee.assert.contains([0, 1, 2], 3);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.contains] Expected [ 0, 1, 2 ] to contain 3"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.contains");
        return true;
      }
    );
  });

  it("should fail with custom message", function () {
    var message = "b776803e-4213-4061-bc82-e5f3e5b5bacd";

    assert.throws(
      function () {
        referee.assert.contains([0, 1, 2], 3, message);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.contains] ${message}: Expected [ 0, 1, 2 ] to contain 3`
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.contains");
        return true;
      }
    );
  });

  it("should pass when array contains the actual object", function () {
    var actual = {};

    referee.assert.contains([actual], actual);
  });

  it("should fail when array contains an equivalent object", function () {
    var actual = {};
    var notActual = {};

    assert.throws(
      function () {
        referee.assert.contains([notActual], actual);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.contains] Expected [ {} ] to contain {}"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.contains");
        return true;
      }
    );
  });
});

describe("refute.contains", function () {
  it("should fail when array contains value", function () {
    assert.throws(
      function () {
        referee.refute.contains([0, 1, 2], 1);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.contains] Expected [ 0, 1, 2 ] not to contain 1"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.contains");
        return true;
      }
    );
  });

  it("should fail with a custom message", function () {
    var message = "a1b2b6d2-42ec-4686-b550-ca651d97cfe1";

    assert.throws(
      function () {
        referee.refute.contains([0, 1, 2], 1, message);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.contains] ${message}: Expected [ 0, 1, 2 ] not to contain 1`
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.contains");
        return true;
      }
    );
  });

  it("should pass when array does not contain the value", function () {
    referee.refute.contains([0, 1, 2], 3);
  });

  it("should fail when array contains the actual object", function () {
    assert.throws(
      function () {
        var actual = {};

        referee.refute.contains([actual], actual);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.contains] Expected [ {} ] not to contain {}"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.contains");
        return true;
      }
    );
  });

  it("should not fail when array contains an equivalent object", function () {
    var actual = {};
    var notActual = {};

    referee.refute.contains([notActual], actual);
  });
});
