"use strict";

module.exports = function (referee) {
  referee.add("isNegativeInfinity", {
    assert(actual) {
      return actual === -Infinity;
    },
    assertMessage: "${customMessage}Expected ${actual} to be -Infinity",
    refuteMessage: "${customMessage}Expected ${actual} not to be -Infinity",
    expectation: "toBeNegativeInfinity",
    values(actual, message) {
      return {
        actual,
        expected: -Infinity,
        customMessage: message,
      };
    },
  });
};
