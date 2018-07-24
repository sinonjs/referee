"use strict";

var actualAndTypeOfMessageValues = require("../actual-and-type-of-message-values");

module.exports = function(referee) {
    referee.add("isObject", {
        assert: function(actual) {
            return typeof actual === "object" && !!actual;
        },
        assertMessage:
            "${customMessage}${actual} (${actualType}) expected to be object and not null",
        refuteMessage:
            "${customMessage}${actual} expected to be null or not an object",
        expectation: "toBeObject",
        values: actualAndTypeOfMessageValues
    });
};
