"use strict";

module.exports = function (referee) {
  referee.add("isInfinity", {
    assert(actual) {
      return actual === Infinity;
    },
    assertMessage: "${customMessage}Expected ${actual} to be Infinity",
    refuteMessage: "${customMessage}Expected ${actual} not to be Infinity",
    expectation: "toBeInfinity",
    values(actual, message) {
      return {
        actual,
        expected: Infinity,
        customMessage: message,
      };
    },
  });
};
