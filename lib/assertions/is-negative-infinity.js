"use strict";

module.exports = function (referee) {
  referee.add("isNegativeInfinity", {
    assert: function (actual) {
      return actual === -Infinity;
    },
    assertMessage: "${customMessage}Expected ${actual} to be -Infinity",
    refuteMessage: "${customMessage}Expected ${actual} not to be -Infinity",
    expectation: "toBeNegativeInfinity",
    values: function (actual, message) {
      return {
        actual: actual,
        expected: -Infinity,
        customMessage: message,
      };
    },
  });
};
