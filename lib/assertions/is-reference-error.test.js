"use strict";

var assert = require("assert");
var referee = require("../referee");
var captureArgs = require("../test-helper/capture-args");

describe("assert.isReferenceError", function () {
  it("should fail for Error", function () {
    assert.throws(
      function () {
        referee.assert.isReferenceError(new Error());
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isReferenceError] Expected Error to be a ReferenceError"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isReferenceError");
        return true;
      }
    );
  });

  it("should fail for EvalError", function () {
    assert.throws(
      function () {
        referee.assert.isReferenceError(new EvalError());
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isReferenceError] Expected EvalError to be a ReferenceError"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isReferenceError");
        return true;
      }
    );
  });

  it("should fal for RangeError", function () {
    assert.throws(
      function () {
        referee.assert.isReferenceError(new RangeError());
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isReferenceError] Expected RangeError to be a ReferenceError"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isReferenceError");
        return true;
      }
    );
  });

  it("should fail for ReferenceError", function () {
    referee.assert.isReferenceError(new ReferenceError());
  });

  it("should fail for SyntaxError", function () {
    assert.throws(
      function () {
        referee.assert.isReferenceError(new SyntaxError());
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isReferenceError] Expected SyntaxError to be a ReferenceError"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isReferenceError");
        return true;
      }
    );
  });

  it("should fail for TypeError", function () {
    assert.throws(
      function () {
        referee.assert.isReferenceError(new TypeError());
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isReferenceError] Expected TypeError to be a ReferenceError"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isReferenceError");
        return true;
      }
    );
  });

  it("should fail for URIError", function () {
    assert.throws(
      function () {
        referee.assert.isReferenceError(new URIError());
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isReferenceError] Expected URIError to be a ReferenceError"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isReferenceError");
        return true;
      }
    );
  });

  it("should fail for String", function () {
    assert.throws(
      function () {
        referee.assert.isReferenceError("apple pie");
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isReferenceError] Expected 'apple pie' to be a ReferenceError"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isReferenceError");
        return true;
      }
    );
  });

  it("should fail for Array", function () {
    assert.throws(
      function () {
        referee.assert.isReferenceError([]);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isReferenceError] Expected [] to be a ReferenceError"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isReferenceError");
        return true;
      }
    );
  });

  it("should fail for Object", function () {
    assert.throws(
      function () {
        referee.assert.isReferenceError({});
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isReferenceError] Expected {} to be a ReferenceError"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isReferenceError");
        return true;
      }
    );
  });

  it("should fail for arguments", function () {
    assert.throws(
      function () {
        referee.assert.isReferenceError(captureArgs());
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[assert.isReferenceError] Expected [Arguments] {} to be a ReferenceError"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isReferenceError");
        return true;
      }
    );
  });

  it("should fail with custom message", function () {
    var message = "d6ff6a83-f598-4592-b795-f39f6d4769d8";

    assert.throws(
      function () {
        referee.assert.isReferenceError(new Error(), message);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[assert.isReferenceError] ${message}: Expected Error to be a ReferenceError`
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "assert.isReferenceError");
        return true;
      }
    );
  });
});

describe("refute.isReferenceError", function () {
  it("should pass for Error", function () {
    referee.refute.isReferenceError(new Error());
  });

  it("should pass for EvalError", function () {
    referee.refute.isReferenceError(new EvalError());
  });

  it("should pass for RangeError", function () {
    referee.refute.isReferenceError(new RangeError());
  });

  it("should fail for ReferenceError", function () {
    assert.throws(
      function () {
        referee.refute.isReferenceError(new ReferenceError());
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          "[refute.isReferenceError] Expected ReferenceError not to be a ReferenceError"
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isReferenceError");
        return true;
      }
    );
  });

  it("should pass for SyntaxError", function () {
    referee.refute.isReferenceError(new SyntaxError());
  });

  it("should pass for TypeError", function () {
    referee.refute.isReferenceError(new TypeError());
  });

  it("should pass for URIError", function () {
    referee.refute.isReferenceError(new URIError());
  });

  it("should pass for String", function () {
    referee.refute.isReferenceError("apple pie");
  });

  it("should pass for Array", function () {
    referee.refute.isReferenceError([]);
  });

  it("should pass for Object", function () {
    referee.refute.isReferenceError({});
  });

  it("should pass for arguments", function () {
    referee.refute.isReferenceError(captureArgs());
  });

  it("should fail with custom message", function () {
    var message = "aa4c2dc0-9b54-4ffb-9797-c3cc09449759";

    assert.throws(
      function () {
        referee.refute.isReferenceError(new ReferenceError(), message);
      },
      function (error) {
        assert.equal(error.code, "ERR_ASSERTION");
        assert.equal(
          error.message,
          `[refute.isReferenceError] ${message}: Expected ReferenceError not to be a ReferenceError`
        );
        assert.equal(error.name, "AssertionError");
        assert.equal(error.operator, "refute.isReferenceError");
        return true;
      }
    );
  });
});
