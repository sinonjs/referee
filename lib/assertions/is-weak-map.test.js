"use strict";

var assert = require("assert");
var captureArgs = require("../test-helper/capture-args");
var referee = require("../referee");

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
                    "[assert.isWeakMap] Expected [Map] {  } to be a WeakMap"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isWeakMap");
                return true;
            }
        );
    });

    it("should fail for Array", function() {
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

    it("should fail for Object", function() {
        assert.throws(
            function() {
                referee.assert.isWeakMap({});
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

    it("should fail for arguments", function() {
        assert.throws(
            function() {
                referee.assert.isWeakMap(captureArgs());
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

    it("should fail with custom message", function() {
        var message = "4a35531f-25eb-4ebe-ae80-9d8eec7d02c1";

        assert.throws(
            function() {
                referee.assert.isWeakMap(new Map(), message);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isWeakMap] " +
                        message +
                        ": Expected [Map] {  } to be a WeakMap"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isWeakMap");
                return true;
            }
        );
    });
});
