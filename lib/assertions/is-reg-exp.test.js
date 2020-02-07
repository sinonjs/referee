"use strict";

var captureArgs = require("../test-helper/capture-args");
var referee = require("../referee");
var assert = require("assert");

describe("assert.isRegExp", function() {
    it("should pass for RegExp", function() {
        referee.assert.isRegExp(new RegExp("apple pie"));
    });

    it("should pass for RegExp literal", function() {
        referee.assert.isRegExp(/apple pie/);
    });

    it("should fail for string", function() {
        assert.throws(
            function() {
                referee.assert.isRegExp("apple pie");
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(error.name, "AssertionError");
                assert.equal(
                    error.message,
                    "[assert.isRegExp] Expected 'apple pie' to be a RegExp"
                );
                assert.equal(error.operator, "assert.isRegExp");
                return true;
            }
        );
    });

    it("should fail for arguments", function() {
        assert.throws(
            function() {
                referee.assert.isRegExp(captureArgs());
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(error.name, "AssertionError");
                assert.equal(
                    error.message,
                    "[assert.isRegExp] Expected [Arguments] {} to be a RegExp"
                );
                assert.equal(error.operator, "assert.isRegExp");
                return true;
            }
        );
    });

    it("should fail for object with custom message", function() {
        assert.throws(
            function() {
                referee.assert.isRegExp({}, "Nope");
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(error.name, "AssertionError");
                assert.equal(
                    error.message,
                    "[assert.isRegExp] Nope: Expected {} to be a RegExp"
                );
                assert.equal(error.operator, "assert.isRegExp");
                return true;
            }
        );
    });

    it("should fail for array", function() {
        assert.throws(
            function() {
                referee.assert.isRegExp([]);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(error.name, "AssertionError");
                assert.equal(
                    error.message,
                    "[assert.isRegExp] Expected [] to be a RegExp"
                );
                assert.equal(error.operator, "assert.isRegExp");
                return true;
            }
        );
    });
});
