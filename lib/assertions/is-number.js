"use strict";

var actualAndTypeOfMessageValues = require("../actual-and-type-of-message-values");

module.exports = function(referee) {
    referee.add("isNumber", {
        assert: function(actual) {
            return typeof actual === "number" && !isNaN(actual);
        },
        assertMessage:
            "${customMessage}Expected ${actual} (${actualType}) to be a non-NaN number",
        refuteMessage:
            "${customMessage}Expected ${actual} to be NaN or a non-number value",
        expectation: "toBeNumber",
        values: actualAndTypeOfMessageValues
    });
};
