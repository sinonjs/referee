"use strict";

var assert = require("assert");
var referee = require("../referee");

describe("assert.json", function() {
    it("should pass when json string equal object", function() {
        referee.assert.json('{"key":"value"}', { key: "value" });
    });
    it("should fail when json string does not equal object with descriptive message", function() {
        assert.throws(
            function() {
                referee.assert.json('{"key":"value"}', { key: "different" });
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    '[assert.json] Expected { key: "value" } to equal { key: "different" }'
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.json");
                return true;
            }
        );
    });
    it("should fail when json string cannot be parsed", function() {
        assert.throws(
            function() {
                referee.assert.json("{something:not parsable}", {});
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.json] Expected {something:not parsable} to be valid JSON"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.json");
                return true;
            }
        );
    });
});
