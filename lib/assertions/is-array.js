"use strict";

var actualAndTypeOfMessageValues = require("../actual-and-type-of-message-values");

module.exports = function(referee) {
    referee.add("isArray", {
        assert: function(actual) {
            return Array.isArray(actual);
        },
        assertMessage: "${customMessage}Expected ${actual} to be array",
        refuteMessage: "${customMessage}Expected ${actual} not to be array",
        expectation: "toBeArray",
        values: actualAndTypeOfMessageValues
    });
};
