"use strict";

var actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
    referee.add("isRegExp", {
        assert: function (actual) {
            return actual instanceof RegExp;
        },
        assertMessage: "${customMessage}Expected ${actual} to be an RegExp",
        refuteMessage: "${customMessage}Expected ${actual} not to be an RegExp",
        expectation: "toBeRegExp",
        values: actualMessageValues
    });
};
