"use strict";

var assert = require("assert");
var referee = require("../referee");
var captureArgs = require("../test-helper/capture-args");
var getArrayLike = require("../test-helper/get-array-like");

describe("assert.isArray", function() {
    it("should pass for Array", function() {
        referee.assert.isArray([]);
    });

    it("should fail for Object", function() {
        assert.throws(
            function() {
                referee.assert.isArray({});
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isArray] Expected {  } to be array"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isArray");
                return true;
            }
        );
    });

    it("should fail for arguments", function() {
        assert.throws(
            function() {
                referee.assert.isArray(captureArgs());
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isArray] Expected {  } to be array"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isArray");
                return true;
            }
        );
    });

    it("should fail for array like", function() {
        assert.throws(
            function() {
                referee.assert.isArray(getArrayLike());
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    '[assert.isArray] Expected { 0: "One", 1: "Two", 2: "Three", 3: "Four", length: 4, splice: function splice() {} } to be array'
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isArray");
                return true;
            }
        );
    });

    it("should fail with custom message", function() {
        var message = "c7d5eb79-f8a4-4980-893a-50549bb6ee5e";

        assert.throws(
            function() {
                referee.assert.isArray({}, message);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isArray] " +
                        message +
                        ": Expected {  } to be array"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isArray");
                return true;
            }
        );
    });
});

describe("refute.isArray", function() {
    it("should fail for Array", function() {
        assert.throws(
            function() {
                referee.refute.isArray([]);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.isArray] Expected [] not to be array"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.isArray");
                return true;
            }
        );
    });

    it("should pass for Object", function() {
        referee.refute.isArray({});
    });

    it("should pass for arguments", function() {
        referee.refute.isArray(captureArgs());
    });

    it("should pass for array like", function() {
        referee.refute.isArray(getArrayLike());
    });

    it("should fail with custome message", function() {
        var message = "12c6cbf6-0ff7-4afe-815b-a40380635a89";
        assert.throws(
            function() {
                referee.refute.isArray([], message);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.isArray] " +
                        message +
                        ": Expected [] not to be array"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.isArray");
                return true;
            }
        );
    });
});
