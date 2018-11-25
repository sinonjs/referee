"use strict";

var assert = require("assert");
var referee = require("../referee");

describe("isTrue", function() {
    it("should pass for true", function() {
        referee.assert.isTrue(true);
    });

    it("should fail for false", function() {
        var actual;
        try {
            referee.assert.isTrue(false);
        } catch (err) {
            actual = err;
        }
        assert.equal(actual.code, "ERR_ASSERTION");
        assert.equal(actual.operator, "assert.isTrue");
    });

    it("should fail for object", function() {
        var actual;
        try {
            referee.assert.isTrue({});
        } catch (err) {
            actual = err;
        }
        assert.equal(actual.code, "ERR_ASSERTION");
        assert.equal(actual.operator, "assert.isTrue");
    });

    it("should fail for array", function() {
        var actual;
        try {
            referee.assert.isTrue([]);
        } catch (err) {
            actual = err;
        }
        assert.equal(actual.code, "ERR_ASSERTION");
        assert.equal(actual.operator, "assert.isTrue");
    });

    it("should fail for string", function() {
        var actual;
        try {
            referee.assert.isTrue("32");
        } catch (err) {
            actual = err;
        }
        assert.equal(actual.code, "ERR_ASSERTION");
        assert.equal(actual.operator, "assert.isTrue");
    });

    it("should fail for number", function() {
        var actual;
        try {
            referee.assert.isTrue(32);
        } catch (err) {
            actual = err;
        }
        assert.equal(actual.code, "ERR_ASSERTION");
        assert.equal(actual.operator, "assert.isTrue");
    });

    it("should fail if not passed arguments", function() {
        var actual;
        try {
            referee.assert.isTrue();
        } catch (err) {
            actual = err;
        }
        assert.equal(actual.code, "ERR_ASSERTION");
        assert.equal(
            actual.message,
            "[assert.isTrue] Expected to receive at least 1 argument"
        );
    });
});
