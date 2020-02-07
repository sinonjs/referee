"use strict";

var assert = require("assert");
var referee = require("../referee");
var captureArgs = require("../test-helper/capture-args");

describe("assert.isSet", function() {
    it("should pass for set", function() {
        referee.assert.isSet(new Set());
    });

    it("should fail for string", function() {
        assert.throws(
            function() {
                referee.assert.isSet("apple pie");
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isSet] Expected 'apple pie' to be a Set"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isSet");
                return true;
            }
        );
    });

    it("should fail for array", function() {
        assert.throws(
            function() {
                referee.assert.isSet([]);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isSet] Expected [] to be a Set"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isSet");
                return true;
            }
        );
    });

    it("should fail for object", function() {
        assert.throws(
            function() {
                referee.assert.isSet({});
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isSet] Expected {} to be a Set"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isSet");
                return true;
            }
        );
    });

    it("should fail for arguments", function() {
        assert.throws(
            function() {
                referee.assert.isSet(captureArgs());
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isSet] Expected [Arguments] {} to be a Set"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isSet");
                return true;
            }
        );
    });

    it("should fail with custom message", function() {
        var message = "52991c03-11ba-47fb-969c-41e9444448c1";

        assert.throws(
            function() {
                referee.assert.isSet(captureArgs(), message);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isSet] " +
                        message +
                        ": Expected [Arguments] {} to be a Set"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isSet");
                return true;
            }
        );
    });
});
