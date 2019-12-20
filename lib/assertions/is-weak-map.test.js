"use strict";

var referee = require("../referee");
var assert = require("assert");

describe("assert.isWeakMap", function() {
    it("should pass for WeakMap", function() {
        // eslint-disable-next-line ie11/no-weak-collections
        referee.assert.isWeakMap(new WeakMap());
    });
    it("should fail for Map", function() {
        assert.throws(
            function() {
                referee.assert.isWeakMap(new Map());
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isWeakMap] Expected Map [] to be a WeakMap"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isWeakMap");
                return true;
            }
        );
    });
    it("should fail for array", function() {
        assert.throws(
            function() {
                referee.assert.isWeakMap([]);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isWeakMap] Expected [] to be a WeakMap"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isWeakMap");
                return true;
            }
        );
    });
    it("should fail for object with a custom message", function() {
        assert.throws(
            function() {
                referee.assert.isWeakMap({}, "custom message");
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isWeakMap] custom message: Expected {  } to be a WeakMap"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isWeakMap");
                return true;
            }
        );
    });
    it("should fail for arguments", function() {
        assert.throws(
            function() {
                referee.assert.isWeakMap(arguments);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isWeakMap] Expected {  } to be a WeakMap"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isWeakMap");
                return true;
            }
        );
    });
});
