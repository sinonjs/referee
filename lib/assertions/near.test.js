"use strict";

var assert = require("assert");
var referee = require("../referee");

describe("assert.near", function() {
    it("should pass for equal numbers", function() {
        referee.assert.near(3, 3, 0);
    });
    it("should pass for numbers in delta range", function() {
        referee.assert.near(2, 3, 1);
    });
    it("should fail for numbers out of delta range", function() {
        assert.throws(
            function() {
                referee.assert.near(2, 3, 0.5);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.near] Expected 2 to be equal to 3 +/- 0.5"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.near");
                return true;
            }
        );
    });
    it("should fail with custom range", function() {
        assert.throws(
            function() {
                referee.assert.near(3, 2, 0.6, "Ho!");
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.near] Ho! Expected 3 to be equal to 2 +/- 0.6"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.near");
                return true;
            }
        );
    });
    it("should fail if not passed any arguments", function() {
        assert.throws(
            function() {
                referee.assert.near();
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.near] Expected to receive at least 3 argument(s)"
                );
                assert.equal(error.name, "AssertionError");
                return true;
            }
        );
    });
});
