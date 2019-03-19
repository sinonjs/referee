"use strict";

var referee = require("../referee");
var assert = require("assert");

describe("assert.isWeakSet", function() {
    it("should pass for WeakSet", function() {
        referee.assert.isWeakSet(new WeakSet()); // eslint-disable-line ie11/no-weak-collections
    });
    it("should fail for Set", function() {
        assert.throws(
            function() {
                referee.assert.isWeakSet(new Set());
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isWeakSet] Expected Set {} to be a WeakSet"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isWeakSet");
                return true;
            }
        );
    });
    it("should fail for Array", function() {
        assert.throws(
            function() {
                referee.assert.isWeakSet([]);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isWeakSet] Expected [] to be a WeakSet"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isWeakSet");
                return true;
            }
        );
    });
    it("should fail for object", function() {
        assert.throws(
            function() {
                referee.assert.isWeakSet({});
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isWeakSet] Expected {  } to be a WeakSet"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isWeakSet");
                return true;
            }
        );
    });
    it("should fail for object with a custom message", function() {
        assert.throws(
            function() {
                referee.assert.isWeakSet({}, "Nope");
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isWeakSet] Nope: Expected {  } to be a WeakSet"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isWeakSet");
                return true;
            }
        );
    });
});
