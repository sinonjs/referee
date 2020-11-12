"use strict";

var actualAndExpectedMessageValues = require("../actual-and-expected-message-values");

module.exports = function (referee) {
  referee.add("greater", {
    assert: function (actual, expected) {
      return actual > expected;
    },

    assertMessage:
      "${customMessage}Expected ${actual} to be greater than ${expected}",
    refuteMessage:
      "${customMessage}Expected ${actual} to be less than or equal to ${expected}",
    expectation: "toBeGreaterThan",
    values: actualAndExpectedMessageValues,
  });
};
