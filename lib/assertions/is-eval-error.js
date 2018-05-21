"use strict";

var actualAndTypeOfMessageValues = require("../actual-and-type-of-message-values");

module.exports = function (referee) {
    referee.add("isEvalError", {
        assert: function (actual) {
            return actual instanceof EvalError;
        },
        assertMessage: "${customMessage}Expected ${actual} to be an EvalError",
        refuteMessage: "${customMessage}Expected ${actual} not to be an EvalError",
        expectation: "toBeEvalError",
        values: actualAndTypeOfMessageValues
    });
};
