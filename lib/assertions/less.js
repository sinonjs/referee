"use strict";

const actualAndExpectedMessageValues = require("../actual-and-expected-message-values");

module.exports = function (referee) {
  referee.add("less", {
    assert(actual, expected) {
      return actual < expected;
    },

    assertMessage:
      "${customMessage}Expected ${actual} to be less than ${expected}",
    refuteMessage:
      "${customMessage}Expected ${actual} to be greater than or equal to ${expected}",
    expectation: "toBeLessThan",
    values: actualAndExpectedMessageValues,
  });
};
