"use strict";
module.exports = function (referee) {
  referee.add("near", {
    assert: function (actual, expected, delta) {
      return Math.abs(actual - expected) <= delta;
    },
    assertMessage:
      "${customMessage}Expected ${actual} to be equal to ${expected} +/- ${delta}",
    refuteMessage:
      "${customMessage}Expected ${actual} not to be equal to ${expected} +/- ${delta}",
    expectation: "toBeNear",
    values: function (actual, expected, delta, message) {
      return {
        actual: actual,
        expected: expected,
        delta: delta,
        customMessage: message,
      };
    },
  });
};
