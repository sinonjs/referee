"use strict";

var assert = require("assert");
var captureArgs = require("../test-helper/capture-args");
var referee = require("../referee");

describe("assert.isSymbol", function () {
  it("should pass for Symbol", function () {
    referee.assert.isSymbol(Symbol("apple pie"));
  });

  it("should fail for String", function () {
    assert.throws(
      function () {
        referee.assert.isSymbol("apple pie");
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isSymbol] Expected 'apple pie' to be a Symbol"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isSymbol");
        return true;
      }
    );
  });

  it("should fail for Array", function () {
    assert.throws(
      function () {
        referee.assert.isSymbol([]);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isSymbol] Expected [] to be a Symbol"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isSymbol");
        return true;
      }
    );
  });

  it("should fail for Object", function () {
    assert.throws(
      function () {
        referee.assert.isSymbol({});
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isSymbol] Expected {} to be a Symbol"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isSymbol");
        return true;
      }
    );
  });

  it("should fail for arguments", function () {
    assert.throws(
      function () {
        referee.assert.isSymbol(captureArgs());
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isSymbol] Expected [Arguments] {} to be a Symbol"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isSymbol");
        return true;
      }
    );
  });

  it("should fail with custom error", function () {
    var message = "f928ba52-a500-463c-8fd7-d8fa0edce9c9";

    assert.throws(
      function () {
        referee.assert.isSymbol("apple pie", message);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isSymbol] " +
            message +
            ": Expected 'apple pie' to be a Symbol"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isSymbol");
        return true;
      }
    );
  });
});

describe("refute.isSymbol", function () {
  it("should fail for Symbol", function () {
    assert.throws(
      function () {
        referee.refute.isSymbol(Symbol("apple pie"));
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isSymbol] Expected Symbol(apple pie) not to be a Symbol"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isSymbol");
        return true;
      }
    );
  });

  it("should fail with custom error", function () {
    var message = "4fc08f72-9246-419d-a03a-ca1c628bc31c";

    assert.throws(
      function () {
        referee.refute.isSymbol(Symbol("apple pie"), message);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isSymbol] " +
            message +
            ": Expected Symbol(apple pie) not to be a Symbol"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isSymbol");
        return true;
      }
    );
  });

  it("should pass for String", function () {
    referee.refute.isSymbol("apple pie");
  });

  it("should pass for Array", function () {
    referee.refute.isSymbol([]);
  });

  it("should pass for Object", function () {
    referee.refute.isSymbol({});
  });

  it("should pass for arguments", function () {
    referee.refute.isSymbol(captureArgs());
  });
});
