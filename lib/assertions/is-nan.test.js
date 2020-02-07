"use strict";

var assert = require("assert");
var referee = require("../referee");
var captureArgs = require("../test-helper/capture-args");

function noop() {}

describe("assert.isNaN", function() {
    it("should pass for NaN", function() {
        referee.assert.isNaN(NaN);
    });

    it("should fail for null", function() {
        assert.throws(
            function() {
                referee.assert.isNaN(null);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isNaN] Expected null to be NaN"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isNaN");
                return true;
            }
        );
    });

    it("should fail for undefined", function() {
        assert.throws(
            function() {
                referee.assert.isNaN(undefined);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isNaN] Expected undefined to be NaN"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isNaN");
                return true;
            }
        );
    });

    it("should fail for Infinity", function() {
        assert.throws(
            function() {
                referee.assert.isNaN(Infinity);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isNaN] Expected Infinity to be NaN"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isNaN");
                return true;
            }
        );
    });

    it("should fail for -Infinity", function() {
        assert.throws(
            function() {
                referee.assert.isNaN(-Infinity);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isNaN] Expected -Infinity to be NaN"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isNaN");
                return true;
            }
        );
    });

    it("should fail for zero", function() {
        assert.throws(
            function() {
                referee.assert.isNaN(0);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isNaN] Expected 0 to be NaN"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isNaN");
                return true;
            }
        );
    });

    it("should fail for Number", function() {
        assert.throws(
            function() {
                referee.assert.isNaN(42);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isNaN] Expected 42 to be NaN"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isNaN");
                return true;
            }
        );
    });

    it("should fail for String", function() {
        assert.throws(
            function() {
                referee.assert.isNaN("apple pie");
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isNaN] Expected 'apple pie' to be NaN"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isNaN");
                return true;
            }
        );
    });

    it("should fail for Function", function() {
        assert.throws(
            function() {
                referee.assert.isNaN(noop);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isNaN] Expected [Function: noop] to be NaN"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isNaN");
                return true;
            }
        );
    });

    it("should fail for Array", function() {
        assert.throws(
            function() {
                referee.assert.isNaN([]);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isNaN] Expected [] to be NaN"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isNaN");
                return true;
            }
        );
    });

    it("should fail for Object", function() {
        assert.throws(
            function() {
                referee.assert.isNaN({});
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isNaN] Expected {} to be NaN"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isNaN");
                return true;
            }
        );
    });

    it("should fail for arguments", function() {
        assert.throws(
            function() {
                referee.assert.isNaN(captureArgs());
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isNaN] Expected [Arguments] {} to be NaN"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isNaN");
                return true;
            }
        );
    });

    it("should fail with custom error", function() {
        var message = "eb919d57-c96b-4ed1-a253-369efaf87e48";

        assert.throws(
            function() {
                referee.assert.isNaN(null, message);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isNaN] " + message + ": Expected null to be NaN"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isNaN");
                return true;
            }
        );
    });
});

describe("refute.isNaN", function() {
    it("should fail for NaN", function() {
        assert.throws(
            function() {
                referee.refute.isNaN(NaN);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.isNaN] Expected not to be NaN"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.isNaN");
                return true;
            }
        );
    });

    it("should pass for null", function() {
        referee.refute.isNaN(null);
    });

    it("should pass for undefined", function() {
        referee.refute.isNaN(undefined);
    });

    it("should pass for Infinity", function() {
        referee.refute.isNaN(Infinity);
    });

    it("should pass for -Infinity", function() {
        referee.refute.isNaN(-Infinity);
    });

    it("should pass for zero", function() {
        referee.refute.isNaN(0);
    });

    it("should pass for Number", function() {
        referee.refute.isNaN(42);
    });

    it("should pass for String", function() {
        referee.refute.isNaN("apple pie");
    });

    it("should pass for Function", function() {
        referee.refute.isNaN(noop);
    });

    it("should pass for Array", function() {
        referee.refute.isNaN([]);
    });

    it("should pass for Object", function() {
        referee.refute.isNaN({});
    });

    it("should pass for arguments", function() {
        referee.refute.isNaN(captureArgs());
    });

    it("should fail with custom error", function() {
        var message = "b5124f48-5270-41ba-8a58-8619563c0f84";

        assert.throws(
            function() {
                referee.refute.isNaN(NaN, message);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.isNaN] " + message + ": Expected not to be NaN"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.isNaN");
                return true;
            }
        );
    });
});
