"use strict";

var actualAndTypeOfMessageValues = require("../actual-and-type-of-message-values");

module.exports = function(referee) {
    referee.add("isString", {
        assert: function(actual) {
            return typeof actual === "string";
        },
        assertMessage:
            "${customMessage}Expected ${actual} (${actualType}) to be string",
        refuteMessage: "${customMessage}Expected ${actual} not to be string",
        expectation: "toBeString",
        values: actualAndTypeOfMessageValues
    });
};
