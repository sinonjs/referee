"use strict";

var actualForMatch = require("../actual-for-match");

var parseErrorMessage = "${customMessage}Expected ${actual} to be valid JSON";

module.exports = function(referee) {
    referee.add("matchJson", {
        assert: function(actual, matcher) {
            var parsed;
            try {
                parsed = JSON.parse(actual);
            } catch (e) {
                return this.fail(parseErrorMessage);
            }
            try {
                return referee.match(parsed, matcher);
            } catch (e) {
                this.exceptionMessage = e.message;
                return this.fail("exceptionMessage");
            }
        },
        assertMessage:
            "${customMessage}Expected ${actual} to match ${expected}",
        refuteMessage:
            "${customMessage}Expected ${actual} not to match ${expected}",
        expectation: "toMatchJson",
        values: function(actual, matcher, message) {
            var parsed;
            try {
                parsed = JSON.parse(actual);
            } catch (e) {
                // Do nothing
            }
            if (parsed) {
                parsed = actualForMatch(parsed, matcher);
            }
            return {
                actualRaw: actual,
                actual: parsed || actual,
                expected: matcher,
                customMessage: message
            };
        }
    });
};
