"use strict";

var assert = require("assert");
var referee = require("../referee");
var captureArgs = require("../test-helper/capture-args");

describe("assert.isDate", function() {
    it("should pass for Date", function() {
        referee.assert.isDate(new Date("[a-z]"));
    });

    it("should fail for RegExp", function() {
        assert.throws(
            function() {
                referee.assert.isDate(new RegExp("[a-z]"));
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isDate] Expected /[a-z]/ to be a Date"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isDate");
                return true;
            }
        );
    });

    it("should fail for String", function() {
        assert.throws(
            function() {
                referee.assert.isDate("apple pie");
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isDate] Expected apple pie to be a Date"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isDate");
                return true;
            }
        );
    });

    it("should fail for Array", function() {
        assert.throws(
            function() {
                referee.assert.isDate([]);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isDate] Expected [] to be a Date"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isDate");
                return true;
            }
        );
    });

    it("should fail for Object", function() {
        assert.throws(
            function() {
                referee.assert.isDate({});
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isDate] Expected {  } to be a Date"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isDate");
                return true;
            }
        );
    });

    it("should fail for arguments", function() {
        assert.throws(
            function() {
                referee.assert.isDate(captureArgs());
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isDate] Expected {  } to be a Date"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isDate");
                return true;
            }
        );
    });

    it("should fail with custom message", function() {
        var message = "9d0346ee-490c-4bad-ad69-b925d75f5860";

        assert.throws(
            function() {
                referee.assert.isDate({}, message);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.isDate] " +
                        message +
                        ": Expected {  } to be a Date"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.isDate");
                return true;
            }
        );
    });
});

describe("refute.isDate", function() {
    it("should fail for Date", function() {
        var date = new Date(Date.UTC(0, 0, 0, 0, 0, 0));
        // In node 6+8 date.toString() uses "(UTC)" as suffix in UTC timezone
        // In node 10 date.toString() uses "(Coordinated Universal Time)"
        var suffix = date.toString().match(/\(.*\)$/)[0];
        var expectedMessage = "[refute.isDate] Expected Sun Dec 31 1899 00:00:00 GMT+0000 {suffix} not to be a Date".replace(
            "{suffix}",
            suffix
        );

        assert.throws(
            function() {
                referee.refute.isDate(date);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(error.message, expectedMessage);
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.isDate");
                return true;
            }
        );
    });

    it("should pass for RegExp", function() {
        referee.refute.isDate(new RegExp());
    });

    it("should pass for String", function() {
        referee.refute.isDate("123");
    });

    it("should pass for Array", function() {
        referee.refute.isDate([]);
    });

    it("should pass for Object", function() {
        referee.refute.isDate({});
    });

    it("should pass for arguments", function() {
        referee.refute.isDate(captureArgs());
    });

    it("should fail with custom message", function() {
        var message = "5e790207-e300-4ecc-ac94-055e85639d95";
        var date = new Date(Date.UTC(0, 0, 0, 0, 0, 0));
        // In node 6+8 date.toString() uses "(UTC)" as suffix in UTC timezone
        // In node 10 date.toString() uses "(Coordinated Universal Time)"
        var suffix = date.toString().match(/\(.*\)$/)[0];
        var expectedMessage =
            "[refute.isDate] " +
            message +
            ": Expected Sun Dec 31 1899 00:00:00 GMT+0000 {suffix} not to be a Date".replace(
                "{suffix}",
                suffix
            );

        assert.throws(
            function() {
                referee.refute.isDate(date, message);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(error.message, expectedMessage);
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.isDate");
                return true;
            }
        );
    });
});
