"use strict";

var samsam = require("@sinonjs/samsam");
var actualForMatch = require("../actual-for-match");
var format = require("../format");

var exceptionMessage = "${customMessage}${exceptionMessage}";

module.exports = function(referee) {
    referee.match = function(actual, matcher) {
        try {
            return samsam.match(actual, matcher);
        } catch (e) {
            throw new Error(
                "Matcher (" +
                    format(matcher) +
                    ") was not a string, a number, a function, " +
                    "a boolean or an object"
            );
        }
    };

    referee.add("match", {
        assert: function(actual, matcher) {
            var passed;

            try {
                passed = referee.match(actual, matcher);
            } catch (e) {
                this.exceptionMessage = e.message;
                return this.fail(exceptionMessage);
            }

            return passed;
        },

        refute: function(actual, matcher) {
            var passed;

            try {
                passed = referee.match(actual, matcher);
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
