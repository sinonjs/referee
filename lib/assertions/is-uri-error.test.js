"use strict";

var assert = require("assert");
var referee = require("../referee");
var captureArgs = require("../test-helper/capture-args");

describe("assert.isURIError", function() {
    it("should fail for Error", function() {
        assert.throws(
            function() {
                referee.assert.isURIError(new Error());
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isURIError] Expected Error to be a URIError"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isURIError");
                return true;
            }
        );
    });

    it("should fail for EvalError", function() {
        assert.throws(
            function() {
                referee.assert.isURIError(new EvalError());
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isURIError] Expected EvalError to be a URIError"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isURIError");
                return true;
            }
        );
    });

    it("should fal for RangeError", function() {
        assert.throws(
            function() {
                referee.assert.isURIError(new RangeError());
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isURIError] Expected RangeError to be a URIError"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isURIError");
                return true;
            }
        );
    });

    it("should fail for ReferenceError", function() {
        assert.throws(
            function() {
                referee.assert.isURIError(new ReferenceError());
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isURIError] Expected ReferenceError to be a URIError"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isURIError");
                return true;
            }
        );
    });

    it("should fail for SyntaxError", function() {
        assert.throws(
            function() {
                referee.assert.isURIError(new SyntaxError());
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isURIError] Expected SyntaxError to be a URIError"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isURIError");
                return true;
            }
        );
    });

    it("should fail for TypeError", function() {
        assert.throws(
            function() {
                referee.assert.isURIError(new TypeError());
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isURIError] Expected TypeError to be a URIError"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isURIError");
                return true;
            }
        );
    });

    it("should pass for URIError", function() {
        referee.assert.isURIError(new URIError());
    });

    it("should fail for String", function() {
        assert.throws(
            function() {
                referee.assert.isURIError("apple pie");
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isURIError] Expected 'apple pie' to be a URIError"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isURIError");
                return true;
            }
        );
    });

    it("should fail for Array", function() {
        assert.throws(
            function() {
                referee.assert.isURIError([]);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isURIError] Expected [] to be a URIError"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isURIError");
                return true;
            }
        );
    });

    it("should fail for Object", function() {
        assert.throws(
            function() {
                referee.assert.isURIError({});
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isURIError] Expected {} to be a URIError"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isURIError");
                return true;
            }
        );
    });

    it("should fail for arguments", function() {
        assert.throws(
            function() {
                referee.assert.isURIError(captureArgs());
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isURIError] Expected [Arguments] {} to be a URIError"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isURIError");
                return true;
            }
        );
    });

    it("should fail with custom message", function() {
        var message = "0bedeb92-f9c8-4440-95f7-e54ab7ecf728";

        assert.throws(
            function() {
                referee.assert.isURIError(new Error(), message);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isURIError] " +
                        message +
                        ": Expected Error to be a URIError"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isURIError");
                return true;
            }
        );
    });
});

describe("refute.isURIError", function() {
    it("should pass for Error", function() {
        referee.refute.isURIError(new Error());
    });

    it("should pass for EvalError", function() {
        referee.refute.isURIError(new EvalError());
    });

    it("should pass for RangeError", function() {
        referee.refute.isURIError(new RangeError());
    });

    it("should pass for ReferenceError", function() {
        referee.refute.isURIError(new ReferenceError());
    });

    it("should fail for SyntaxError", function() {
        referee.refute.isURIError(new SyntaxError());
    });

    it("should fail for TypeError", function() {
        referee.refute.isURIError(new TypeError());
    });

    it("should pass for URIError", function() {
        assert.throws(
            function() {
                referee.refute.isURIError(new URIError());
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.isURIError] Expected URIError not to be a URIError"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.isURIError");
                return true;
            }
        );
    });

    it("should pass for String", function() {
        referee.refute.isURIError("apple pie");
    });

    it("should pass for Array", function() {
        referee.refute.isURIError([]);
    });

    it("should pass for Object", function() {
        referee.refute.isURIError({});
    });

    it("should pass for arguments", function() {
        referee.refute.isURIError(captureArgs());
    });

    it("should fail with custom message", function() {
        var message = "d0150e59-e58d-46c8-b932-e7d0280a0a79";

        assert.throws(
            function() {
                referee.refute.isURIError(new URIError(), message);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");

                assert.equal(
                    error.message,
                    "[refute.isURIError] d0150e59-e58d-46c8-b932-e7d0280a0a79: Expected URIError not to be a URIError"
                );

                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.isURIError");
                return true;
            }
        );
    });
});
