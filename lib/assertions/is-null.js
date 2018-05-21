"use strict";

var actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
    referee.add("isNull", {
        assert: function (actual) {
            return actual === null;
        },
        assertMessage: "${customMessage}Expected ${actual} to be null",
        refuteMessage: "${customMessage}Expected not to be null",
        expectation: "toBeNull",
        values: actualMessageValues
    });
};
