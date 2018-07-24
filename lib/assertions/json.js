"use strict";

var samsam = require("samsam");

module.exports = function(referee) {
    referee.add("json", {
        assert: function(actual, expected) {
            var parsed;
            try {
                parsed = JSON.parse(actual);
            } catch (e) {
                return this.fail("jsonParseExceptionMessage");
            }
            return samsam.deepEqual(parsed, expected);
        },
        assertMessage:
            "${customMessage}Expected ${actual} to equal ${expected}",
        refuteMessage:
            "${customMessage}Expected ${actual} not to equal ${expected}",
        expectation: "toEqualJson",
        values: function(actual, expected, message) {
            return {
                actual: actual,
                expected: JSON.stringify(expected),
                customMessage: message
            };
        }
    });

    referee.assert.json.jsonParseExceptionMessage =
        "${customMessage}Expected ${actual} to be valid JSON";
    referee.refute.json.jsonParseExceptionMessage =
        referee.assert.json.jsonParseExceptionMessage;
};
