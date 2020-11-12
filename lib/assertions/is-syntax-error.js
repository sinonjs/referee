"use strict";

var actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
  referee.add("isSyntaxError", {
    assert: function (actual) {
      return actual instanceof SyntaxError;
    },
    assertMessage: "${customMessage}Expected ${actual} to be a SyntaxError",
    refuteMessage: "${customMessage}Expected ${actual} not to be a SyntaxError",
    expectation: "toBeSyntaxError",
    values: actualMessageValues,
  });
};
