"use strict";

const actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
  referee.add("isEvalError", {
    assert(actual) {
      return actual instanceof EvalError;
    },
    assertMessage: "${customMessage}Expected ${actual} to be an EvalError",
    refuteMessage: "${customMessage}Expected ${actual} not to be an EvalError",
    expectation: "toBeEvalError",
    values: actualMessageValues,
  });
};
