"use strict";

var assert = require("assert");
var referee = require("../referee");
var captureArgs = require("../test-helper/capture-args");

describe("assert.isTypeError", function () {
  it("should fail for Error", function () {
    assert.throws(
      function () {
        referee.assert.isTypeError(new Error());
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isTypeError] Expected Error to be a TypeError"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isTypeError");
        return true;
      }
    );
  });

  it("should fail for EvalError", function () {
    assert.throws(
      function () {
        referee.assert.isTypeError(new EvalError());
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isTypeError] Expected EvalError to be a TypeError"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isTypeError");
        return true;
      }
    );
  });

  it("should fal for RangeError", function () {
    assert.throws(
      function () {
        referee.assert.isTypeError(new RangeError());
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isTypeError] Expected RangeError to be a TypeError"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isTypeError");
        return true;
      }
    );
  });

  it("should fail for ReferenceError", function () {
    assert.throws(
      function () {
        referee.assert.isTypeError(new ReferenceError());
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isTypeError] Expected ReferenceError to be a TypeError"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isTypeError");
        return true;
      }
    );
  });

  it("should fail for SyntaxError", function () {
    assert.throws(
      function () {
        referee.assert.isTypeError(new SyntaxError());
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isTypeError] Expected SyntaxError to be a TypeError"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isTypeError");
        return true;
      }
    );
  });

  it("should pass for TypeError", function () {
    referee.assert.isTypeError(new TypeError());
  });

  it("should fail for URIError", function () {
    assert.throws(
      function () {
        referee.assert.isTypeError(new URIError());
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isTypeError] Expected URIError to be a TypeError"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isTypeError");
        return true;
      }
    );
  });

  it("should fail for String", function () {
    assert.throws(
      function () {
        referee.assert.isTypeError("apple pie");
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isTypeError] Expected 'apple pie' to be a TypeError"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isTypeError");
        return true;
      }
    );
  });

  it("should fail for Array", function () {
    assert.throws(
      function () {
        referee.assert.isTypeError([]);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isTypeError] Expected [] to be a TypeError"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isTypeError");
        return true;
      }
    );
  });

  it("should fail for Object", function () {
    assert.throws(
      function () {
        referee.assert.isTypeError({});
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isTypeError] Expected {} to be a TypeError"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isTypeError");
        return true;
      }
    );
  });

  it("should fail for arguments", function () {
    assert.throws(
      function () {
        referee.assert.isTypeError(captureArgs());
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isTypeError] Expected [Arguments] {} to be a TypeError"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isTypeError");
        return true;
      }
    );
  });

  it("should fail with custom message", function () {
    var message = "2b16c1de-fa54-444a-855d-febcdf4b31b3";

    assert.throws(
      function () {
        referee.assert.isTypeError(new Error(), message);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isTypeError] ${message}: Expected Error to be a TypeError`
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isTypeError");
        return true;
      }
    );
  });
});

describe("refute.isTypeError", function () {
  it("should pass for Error", function () {
    referee.refute.isTypeError(new Error());
  });

  it("should pass for EvalError", function () {
    referee.refute.isTypeError(new EvalError());
  });

  it("should pass for RangeError", function () {
    referee.refute.isTypeError(new RangeError());
  });

  it("should pass for ReferenceError", function () {
    referee.refute.isTypeError(new ReferenceError());
  });

  it("should pass for SyntaxError", function () {
    referee.refute.isTypeError(new SyntaxError());
  });

  it("should fail for TypeError", function () {
    assert.throws(
      function () {
        referee.refute.isTypeError(new TypeError());
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isTypeError] Expected TypeError not to be a TypeError"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isTypeError");
        return true;
      }
    );
  });

  it("should pass for URIError", function () {
    referee.refute.isTypeError(new URIError());
  });

  it("should pass for String", function () {
    referee.refute.isTypeError("apple pie");
  });

  it("should pass for Array", function () {
    referee.refute.isTypeError([]);
  });

  it("should pass for Object", function () {
    referee.refute.isTypeError({});
  });

  it("should pass for arguments", function () {
    referee.refute.isTypeError(captureArgs());
  });

  it("should fail with custom message", function () {
    var message = "d34333eb-f353-4589-8460-df8c9a8a273a";

    assert.throws(
      function () {
        referee.refute.isTypeError(new TypeError(), message);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isTypeError] ${message}: Expected TypeError not to be a TypeError`
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isTypeError");
        return true;
      }
    );
  });
});
