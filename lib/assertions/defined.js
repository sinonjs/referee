"use strict";

var actualAndTypeOfMessageValues = require("../actual-and-type-of-message-values");

module.exports = function(referee) {
    referee.add("defined", {
        assert: function(actual) {
            return typeof actual !== "undefined";
        },
        assertMessage: "${customMessage}Expected to be defined",
        refuteMessage:
            "${customMessage}Expected ${actual} (${actualType}) not to be defined",
        expectation: "toBeDefined",
        values: actualAndTypeOfMessageValues
    });
};
