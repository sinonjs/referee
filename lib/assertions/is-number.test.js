"use strict";

var assert = require("assert");
var referee = require("../referee");
var captureArgs = require("../test-helper/capture-args");

function noop() {}

describe("assert.isNumber", function() {
    it("should pass for Number", function() {
        referee.assert.isNumber(42);
    });

    it("should pass for Infinity", function() {
        referee.assert.isNumber(Infinity);
    });

    it("should pass for -Infinity", function() {
        referee.assert.isNumber(-Infinity);
    });

    it("should pass for Number.MAX_VALUE", function() {
        referee.assert.isNumber(Number.MAX_VALUE);
    });

    it("should pass for Number.MIN_VALUE", function() {
        referee.assert.isNumber(Number.MIN_VALUE);
    });

    it("should fail for NaN", function() {
        assert.throws(
            function() {
                referee.assert.isNumber(NaN);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isNumber] Expected NaN ('number') to be a non-NaN number"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isNumber");
                return true;
            }
        );
    });

    it("should fail for String", function() {
        assert.throws(
            function() {
                referee.assert.isNumber("apple pie");
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isNumber] Expected 'apple pie' ('string') to be a non-NaN number"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isNumber");
                return true;
            }
        );
    });

    it("should fail for Function", function() {
        assert.throws(
            function() {
                referee.assert.isNumber(noop);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isNumber] Expected [Function: noop] ('function') to be a non-NaN number"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isNumber");
                return true;
            }
        );
    });

    it("should fail for arguments", function() {
        assert.throws(
            function() {
                referee.assert.isNumber(captureArgs());
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isNumber] Expected [Arguments] {} ('object') to be a non-NaN number"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isNumber");
                return true;
            }
        );
    });

    it("should fail for null", function() {
        assert.throws(
            function() {
                referee.assert.isNumber(null);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isNumber] Expected null ('object') to be a non-NaN number"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isNumber");
                return true;
            }
        );
    });

    it("should fail with custom message", function() {
        var message = "7e622cb3-2a4a-4808-ae9b-bc2b53482cf1";

        assert.throws(
            function() {
                referee.assert.isNumber(NaN, message);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isNumber] " +
                        message +
                        ": Expected NaN ('number') to be a non-NaN number"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isNumber");
                return true;
            }
        );
    });
});

describe("refute.isNumber", function() {
    it("should fail for Number", function() {
        assert.throws(
            function() {
                referee.refute.isNumber(42);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.isNumber] Expected 42 to be NaN or a non-number value"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.isNumber");
                return true;
            }
        );
    });

    it("should fail for Infinity", function() {
        assert.throws(
            function() {
                referee.refute.isNumber(Infinity);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.isNumber] Expected Infinity to be NaN or a non-number value"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.isNumber");
                return true;
            }
        );
    });

    it("should fail for -Infinity", function() {
        assert.throws(
            function() {
                referee.refute.isNumber(-Infinity);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.isNumber] Expected -Infinity to be NaN or a non-number value"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.isNumber");
                return true;
            }
        );
    });

    it("should fail for Number.MAX_VALUE", function() {
        assert.throws(
            function() {
                referee.refute.isNumber(Number.MAX_VALUE);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.isNumber] Expected 1.7976931348623157e+308 to be NaN or a non-number value"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.isNumber");
                return true;
            }
        );
    });

    it("should fail for Number.MIN_VALUE", function() {
        assert.throws(
            function() {
                referee.refute.isNumber(Number.MIN_VALUE);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.isNumber] Expected 5e-324 to be NaN or a non-number value"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.isNumber");
                return true;
            }
        );
    });

    it("should pass for NaN", function() {
        referee.refute.isNumber(NaN);
    });

    it("should pass for String", function() {
        referee.refute.isNumber("apple pie");
    });

    it("should pass for Function", function() {
        referee.refute.isNumber(noop);
    });

    it("should pass for arguments", function() {
        referee.refute.isNumber(arguments);
    });

    it("should pass for null", function() {
        referee.refute.isNumber(null);
    });

    it("should fail with custom message", function() {
        var message = "9402608a-e6b3-4250-98eb-739a0232f0df";

        assert.throws(
            function() {
                referee.refute.isNumber(42, message);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.isNumber] " +
                        message +
                        ": Expected 42 to be NaN or a non-number value"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.isNumber");
                return true;
            }
        );
    });
});
