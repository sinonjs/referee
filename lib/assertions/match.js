"use strict";

var actualForMatch = require("../actual-for-match");
var match = require("../match");

var exceptionMessage = "${customMessage}${exceptionMessage}";

module.exports = function(referee) {
    referee.add("match", {
        assert: function(actual, matcher) {
            var passed;

            try {
                passed = match(actual, matcher);
            } catch (e) {
                this.exceptionMessage = e.message;
                return this.fail(exceptionMessage);
            }

            return passed;
        },

        refute: function(actual, matcher) {
            var passed;

            try {
                passed = match(actual, matcher);
            } catch (e) {
                this.exceptionMessage = e.message;
                return this.fail(exceptionMessage);
            }

            return !passed;
        },

        assertMessage:
            "${customMessage}${actual} expected to match ${expected}",
        refuteMessage:
            "${customMessage}${actual} expected not to match ${expected}",
        expectation: "toMatch",
        values: function(actual, matcher, message) {
            return {
                actual: actualForMatch(actual, matcher),
                expected: matcher,
                customMessage: message
            };
        }
    });
};
