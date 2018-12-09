"use strict";

var assert = require("assert");
var referee = require("../referee");
var captureArgs = require("../test-helper/capture-args");

describe("assert.isNegativeInfinity", function() {
    it("should pass for -Infinity", function() {
        referee.assert.isNegativeInfinity(-Infinity);
    });

    it("should fail for Infinity", function() {
        assert.throws(
            function() {
                referee.assert.isNegativeInfinity(Infinity);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isNegativeInfinity] Expected Infinity to be -Infinity"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isNegativeInfinity");
                return true;
            }
        );
    });

    it("should fail for NaN", function() {
        assert.throws(
            function() {
                referee.assert.isNegativeInfinity(NaN);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isNegativeInfinity] Expected NaN to be -Infinity"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isNegativeInfinity");
                return true;
            }
        );
    });

    it("should fail for Array", function() {
        assert.throws(
            function() {
                referee.assert.isNegativeInfinity([]);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isNegativeInfinity] Expected [] to be -Infinity"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isNegativeInfinity");
                return true;
            }
        );
    });

    it("should fail for Object", function() {
        assert.throws(
            function() {
                referee.assert.isNegativeInfinity({});
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isNegativeInfinity] Expected {  } to be -Infinity"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isNegativeInfinity");
                return true;
            }
        );
    });

    it("should fail for arguments", function() {
        assert.throws(
            function() {
                referee.assert.isNegativeInfinity(captureArgs());
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isNegativeInfinity] Expected {  } to be -Infinity"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isNegativeInfinity");
                return true;
            }
        );
    });

    it("should fail with custom message", function() {
        var message = "bd8f19ef-c847-456f-88d4-70dc540678bb";

        assert.throws(
            function() {
                referee.assert.isNegativeInfinity(Infinity, message);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isNegativeInfinity] " +
                        message +
                        ": Expected Infinity to be -Infinity"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isNegativeInfinity");
                return true;
            }
        );
    });
});

describe("refute.isNegativeInfinity", function() {
    it("should fail for Infinity", function() {
        assert.throws(
            function() {
                referee.refute.isNegativeInfinity(-Infinity);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.isNegativeInfinity] Expected -Infinity not to be -Infinity"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.isNegativeInfinity");
                return true;
            }
        );
    });

    it("should pass for Infinity", function() {
        referee.refute.isNegativeInfinity(Infinity);
    });

    it("should pass for NaN", function() {
        referee.refute.isNegativeInfinity(NaN);
    });

    it("should pass for Array", function() {
        referee.refute.isNegativeInfinity([]);
    });

    it("should pass for Object", function() {
        referee.refute.isNegativeInfinity({});
    });

    it("should pass for arguments", function() {
        referee.refute.isNegativeInfinity(captureArgs());
    });

    it("should fail with custom message", function() {
        var message = "5fd5a4ca-34a8-42f3-98dd-ba4d39dc4944";

        assert.throws(
            function() {
                referee.refute.isNegativeInfinity(-Infinity, message);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.isNegativeInfinity] " +
                        message +
                        ": Expected -Infinity not to be -Infinity"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.isNegativeInfinity");
                return true;
            }
        );
    });
});
