"use strict";

var assert = require("assert");
var referee = require("../referee");

describe("isString", function() {
    it("should pass for string", function() {
        referee.assert.isString("Hey");
    });

    it("should fail for object", function() {
        var actual;
        try {
            referee.assert.isString({});
        } catch (err) {
            actual = err;
        }
        assert.equal(actual.code, "ERR_ASSERTION");
        assert.equal(actual.operator, "assert.isString");
    });

    it("should fail for array", function() {
        var actual;
        try {
            referee.assert.isString([]);
        } catch (err) {
            actual = err;
        }
        assert.equal(actual.code, "ERR_ASSERTION");
        assert.equal(actual.operator, "assert.isString");
    });

    it("should fail for number", function() {
        var actual;
        try {
            referee.assert.isString(34);
        } catch (err) {
            actual = err;
        }
        assert.equal(actual.code, "ERR_ASSERTION");
        assert.equal(actual.operator, "assert.isString");
    });

    it("should fail for boolean", function() {
        var actual;
        try {
            referee.assert.isString(true);
        } catch (err) {
            actual = err;
        }
        assert.equal(actual.code, "ERR_ASSERTION");
        assert.equal(actual.operator, "assert.isString");
    });
});
