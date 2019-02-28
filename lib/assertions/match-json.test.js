"use strict";

var assert = require("assert");
var referee = require("../referee");

describe("assert.matchJson", function() {
    it("should pass when json string matches object", function() {
        referee.assert.matchJson('{"key":"value","and":42}', {
            key: "value"
        });
    });

    it("should fail when json string does not equal object", function() {
        assert.throws(
            function() {
                referee.assert.matchJson("", '{"key":"value","and":42}', {
                    key: "different"
                });
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.matchJson] [object Object]: Expected (empty string) to be valid JSON"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.matchJson");
                return true;
            }
        );
    });

    it("should fail when json string cannot be parsed", function() {
        assert.throws(
            function() {
                referee.assert.matchJson("{something:not parsable}", {});
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.matchJson] Expected {something:not parsable} to be valid JSON"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.matchJson");
                return true;
            }
        );
    });
});
