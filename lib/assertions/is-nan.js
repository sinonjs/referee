"use strict";

var actualAndTypeOfMessageValues = require("../actual-and-type-of-message-values");

module.exports = function (referee) {
    referee.add("isNaN", {
        assert: function (actual) {
            return typeof actual === "number" && isNaN(actual);
        },
        assertMessage: "${customMessage}Expected ${actual} to be NaN",
        refuteMessage: "${customMessage}Expected not to be NaN",
        expectation: "toBeNaN",
        values: actualAndTypeOfMessageValues
    });
};
