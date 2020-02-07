"use strict";

var assert = require("assert");
var referee = require("../referee");
var captureArgs = require("../test-helper/capture-args");

describe("assert.isMap", function() {
    it("should pass for Map", function() {
        referee.assert.isMap(new Map());
    });

    it("should fail for String", function() {
        assert.throws(
            function() {
                referee.assert.isMap("apple pie");
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isMap] Expected 'apple pie' to be a Map"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isMap");
                return true;
            }
        );
    });

    it("should fail for Array", function() {
        assert.throws(
            function() {
                referee.assert.isMap([]);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isMap] Expected [] to be a Map"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isMap");
                return true;
            }
        );
    });

    it("should fail for WeakMap", function() {
        assert.throws(
            function() {
                // eslint-disable-next-line ie11/no-weak-collections
                referee.assert.isMap(new WeakMap());
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isMap] Expected WeakMap { <items unknown> } to be a Map"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isMap");
                return true;
            }
        );
    });

    it("should fail for Object", function() {
        assert.throws(
            function() {
                referee.assert.isMap({});
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isMap] Expected {} to be a Map"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isMap");
                return true;
            }
        );
    });

    it("should fail for arguments", function() {
        assert.throws(
            function() {
                referee.assert.isMap(captureArgs());
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isMap] Expected [Arguments] {} to be a Map"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isMap");
                return true;
            }
        );
    });

    it("should fail with custom message", function() {
        var message = "4eb2174d-3faa-4095-92d1-cd8dfb7e2a58";

        assert.throws(
            function() {
                referee.assert.isMap("apple pie", message);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isMap] " +
                        message +
                        ": Expected 'apple pie' to be a Map"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isMap");
                return true;
            }
        );
    });
});

describe("refute.isMap", function() {
    it("should fail for Map", function() {
        assert.throws(
            function() {
                referee.refute.isMap(new Map());
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.isMap] Expected Map {} not to be a Map"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.isMap");
                return true;
            }
        );
    });

    it("should pass for String", function() {
        referee.refute.isMap("apple pie");
    });

    it("should pass for Array", function() {
        referee.refute.isMap([]);
    });

    it("should pass for WeakMap", function() {
        // eslint-disable-next-line ie11/no-weak-collections
        referee.refute.isMap(new WeakMap());
    });

    it("should pass for Object", function() {
        referee.refute.isMap({});
    });

    it("should pass for arguments", function() {
        referee.refute.isMap(captureArgs());
    });

    it("should fail with custom message", function() {
        var message = "f84e51dd-d5af-4ef0-81ec-2d575eadd735";
        assert.throws(
            function() {
                referee.refute.isMap(new Map(), message);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.isMap] " +
                        message +
                        ": Expected Map {} not to be a Map"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.isMap");
                return true;
            }
        );
    });
});
