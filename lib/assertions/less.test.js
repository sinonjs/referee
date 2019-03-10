"use strict";

var assert = require("assert");
var referee = require("../referee");

describe("assert.less", function() {
    it("should pass when less", function() {
        referee.assert.less(1, 2);
    });

    it("should fail when greater than", function() {
        assert.throws(
            function() {
                referee.assert.less(2, 1);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.less] Expected 2 to be less than 1"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.less");
                return true;
            }
        );
    });

    it("should fail when equal", function() {
        assert.throws(
            function() {
                referee.assert.less(1, 1);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.less] Expected 1 to be less than 1"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.less");
                return true;
            }
        );
    });

    it("should fail with custom message", function() {
        var message = "b89674ea-cae2-4d88-9a70-74ad0af29bc2";

        assert.throws(
            function() {
                referee.assert.less(2, 1, message);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.less] " +
                        message +
                        ": Expected 2 to be less than 1"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.less");
                return true;
            }
        );
    });
});

describe("refute.less", function() {
    it("should pass when greater", function() {
        referee.refute.less(2, 1);
    });

    it("should pass when equal", function() {
        referee.refute.less(1, 1);
    });

    it("should fail when less", function() {
        assert.throws(
            function() {
                referee.refute.less(1, 2);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.less] Expected 1 to be greater than or equal to 2"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.less");
                return true;
            }
        );
    });

    it("should fail with custom message", function() {
        var message = "e5f75904-424c-44b3-b757-710b06d88637";

        assert.throws(
            function() {
                referee.refute.less(1, 2, message);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.less] " +
                        message +
                        ": Expected 1 to be greater than or equal to 2"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.less");
                return true;
            }
        );
    });
});
