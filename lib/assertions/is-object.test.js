"use strict";

var assert = require("assert");
var referee = require("../referee");

function noop() {}

describe("assert.isObject", function () {
  it("should pass for Object", function () {
    referee.assert.isObject({});
  });

  it("should fail for Function", function () {
    assert.throws(
      function () {
        referee.assert.isObject(noop);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isObject] [Function: noop] ('function') expected to be object and not null"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isObject");
        return true;
      }
    );
  });

  it("should fail for null", function () {
    assert.throws(
      function () {
        referee.assert.isObject(null);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isObject] null ('object') expected to be object and not null"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isObject");
        return true;
      }
    );
  });

  it("should fail with custom message", function () {
    var message = "5d9980ce-8577-4894-91af-4055eeaae215";

    assert.throws(
      function () {
        referee.assert.isObject(noop, message);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isObject] " +
            message +
            ": [Function: noop] ('function') expected to be object and not null"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isObject");
        return true;
      }
    );
  });
});

describe("refute.isObject", function () {
  it("should fail for Object", function () {
    assert.throws(
      function () {
        referee.refute.isObject({});
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isObject] {} expected to be null or not an object"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isObject");
        return true;
      }
    );
  });
  it("should pass for Function", function () {
    referee.refute.isObject(noop);
  });

  it("should pass for null", function () {
    referee.refute.isObject(null);
  });

  it("should fail with custom message", function () {
    var message = "49ee3516-6b75-4e89-86d9-0c72bca14a59";
    assert.throws(
      function () {
        referee.refute.isObject({}, message);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isObject] " +
            message +
            ": {} expected to be null or not an object"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isObject");
        return true;
      }
    );
  });
});
