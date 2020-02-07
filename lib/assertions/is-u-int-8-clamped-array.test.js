"use strict";

var assert = require("assert");
var captureArgs = require("../test-helper/capture-args");
var referee = require("../referee");

describe("assert.isUint8ClampedArray", function() {
    it("should pass for Uint8ClampedArray", function() {
        referee.assert.isUint8ClampedArray(new Uint8ClampedArray());
    });

    it("should fail for Uint16Array", function() {
        assert.throws(
            function() {
                referee.assert.isUint8ClampedArray(new Uint16Array());
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isUint8ClampedArray] Expected Uint16Array [] to be a Uint8ClampedArray"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isUint8ClampedArray");
                return true;
            }
        );
    });

    it("should fail for Uint32Array", function() {
        assert.throws(
            function() {
                referee.assert.isUint8ClampedArray(new Uint32Array());
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isUint8ClampedArray] Expected Uint32Array [] to be a Uint8ClampedArray"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isUint8ClampedArray");
                return true;
            }
        );
    });

    it("should fail for Uint8Array", function() {
        assert.throws(
            function() {
                referee.assert.isUint8ClampedArray(new Uint8Array());
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isUint8ClampedArray] Expected Uint8Array [] to be a Uint8ClampedArray"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isUint8ClampedArray");
                return true;
            }
        );
    });

    it("should fail for Array", function() {
        assert.throws(
            function() {
                referee.assert.isUint8ClampedArray([]);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isUint8ClampedArray] Expected [] to be a Uint8ClampedArray"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isUint8ClampedArray");
                return true;
            }
        );
    });

    it("should fail for Object", function() {
        assert.throws(
            function() {
                referee.assert.isUint8ClampedArray({});
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isUint8ClampedArray] Expected {} to be a Uint8ClampedArray"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isUint8ClampedArray");
                return true;
            }
        );
    });

    it("should fail for arguments", function() {
        assert.throws(
            function() {
                referee.assert.isUint8ClampedArray(captureArgs());
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isUint8ClampedArray] Expected [Arguments] {} to be a Uint8ClampedArray"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isUint8ClampedArray");
                return true;
            }
        );
    });

    it("should fail with custom message", function() {
        var message = "b8895750-3ba7-40f6-bda5-5e769d6c0b62";
        assert.throws(
            function() {
                referee.assert.isUint8ClampedArray([], message);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isUint8ClampedArray] " +
                        message +
                        ": Expected [] to be a Uint8ClampedArray"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isUint8ClampedArray");
                return true;
            }
        );
    });
});

describe("refute.isUint8ClampedArray", function() {
    it("should fail for isUint8ClampedArray", function() {
        assert.throws(
            function() {
                referee.refute.isUint8ClampedArray(new Uint8ClampedArray());
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.isUint8ClampedArray] Expected Uint8ClampedArray [] not to be a Uint8ClampedArray"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.isUint8ClampedArray");
                return true;
            }
        );
    });

    it("should fail with custom message", function() {
        var message = "9ddf1b4c-4382-4744-ae88-d14c69f20626";
        assert.throws(
            function() {
                referee.refute.isUint8ClampedArray(
                    new Uint8ClampedArray(),
                    message
                );
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.isUint8ClampedArray] " +
                        message +
                        ": Expected Uint8ClampedArray [] not to be a Uint8ClampedArray"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.isUint8ClampedArray");
                return true;
            }
        );
    });

    it("should pass for Uint16Array", function() {
        referee.refute.isUint8ClampedArray(new Uint16Array());
    });

    it("should pass for Uint32Array", function() {
        referee.refute.isUint8ClampedArray(new Uint32Array());
    });

    it("should pass for Uint8Array", function() {
        referee.refute.isUint8ClampedArray(new Uint8Array());
    });

    it("should pass for Array", function() {
        referee.refute.isUint8ClampedArray([]);
    });

    it("should pass for Object", function() {
        referee.refute.isUint8ClampedArray({});
    });

    it("should pass for arguments", function() {
        referee.refute.isUint8ClampedArray(captureArgs());
    });
});
