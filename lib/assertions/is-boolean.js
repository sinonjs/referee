"use strict";

var actualAndTypeOfMessageValues = require("../actual-and-type-of-message-values");

module.exports = function (referee) {
    referee.add("isBoolean", {
        assert: function (actual) {
            return typeof actual === "boolean";
        },
        assertMessage: "${customMessage}Expected ${actual} (${actualType}) to be boolean",
        refuteMessage: "${customMessage}Expected ${actual} not to be boolean",
        expectation: "toBeBoolean",
        values: actualAndTypeOfMessageValues
    });
};
