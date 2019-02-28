"use strict";

var assert = require("assert");
var referee = require("../referee");

var obj = { id: 42 };
var obj2 = { id: 42 };

describe("assert.same", function() {
    it("should pass when comparing object to itself", function() {
        referee.assert.same(obj, obj);
    });

    it("should pass when comparing strings", function() {
        referee.assert.same("Hey", "Hey");
    });

    it("should pass when comparing booleans", function() {
        referee.assert.same(true, true);
    });

    it("should pass when comparing infinity", function() {
        referee.assert.same(Infinity, Infinity);
    });

    it("should pass when comparing numbers", function() {
        referee.assert.same(32, 32);
    });

    it("should pass when comparing null to null", function() {
        referee.assert.same(null, null);
    });

    it("should pass when comparing undefined to undefined", function() {
        referee.assert.same(undefined, undefined);
    });

    it("should pass when comparing NaN to NaN", function() {
        referee.assert.same(NaN, NaN);
    });

    it("should fail when comparing different objects", function() {
        assert.throws(
            function() {
                referee.assert.same(obj, obj2);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.same] { id: 42 } expected to be the same object as { id: 42 }"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.same");
                return true;
            }
        );
    });

    it("should fail when comparing without coercion", function() {
        assert.throws(
            function() {
                referee.assert.same(666, "666");
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.same] 666 expected to be the same object as 666"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.same");
                return true;
            }
        );
    });

    it("should fail when comparing -0 to +0", function() {
        assert.throws(
            function() {
                referee.assert.same(-0, +0);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.same] -0 expected to be the same object as 0"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.same");
                return true;
            }
        );
    });
});
