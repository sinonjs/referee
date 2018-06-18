"use strict";

module.exports = function (referee) {
    referee.add("matchJson", {
        assert: function (actual, matcher) {
            var parsed;
            try {
                parsed = JSON.parse(actual);
            } catch (e) {
                return this.fail("jsonParseExceptionMessage");
            }
            try {
                return referee.match(parsed, matcher);
            } catch (e) {
                this.exceptionMessage = e.message;
                return this.fail("exceptionMessage");
            }
        },
        assertMessage: "${customMessage}Expected ${actual} to match ${expected}",
        refuteMessage: "${customMessage}Expected ${actual} not to match ${expected}",
        expectation: "toMatchJson",
        values: function (actual, matcher, message) {
            return {
                actual: actual,
                expected: JSON.stringify(matcher),
                customMessage: message
            };
        }
    });

    referee.assert.matchJson.jsonParseExceptionMessage = "${customMessage}Expected ${actual} to be valid JSON";
    referee.refute.matchJson.jsonParseExceptionMessage = referee.assert.json.jsonParseExceptionMessage;
};
