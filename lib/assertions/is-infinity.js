"use strict";

var actualMessageValues = require("../actual-message-values");

module.exports = function(referee) {
    referee.add("isInfinity", {
        assert: function(actual) {
            return actual === Infinity;
        },
        assertMessage: "${customMessage}Expected ${actual} to be Infinity",
        refuteMessage: "${customMessage}Expected ${actual} not to be Infinity",
        expectation: "toBeInfinity",
        values: actualMessageValues
    });
};
