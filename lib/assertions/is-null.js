"use strict";

module.exports = function (referee) {
  referee.add("isNull", {
    assert(actual) {
      return actual === null;
    },
    assertMessage: "${customMessage}Expected ${actual} to be null",
    refuteMessage: "${customMessage}Expected not to be null",
    expectation: "toBeNull",
    values(actual, message) {
      return {
        actual,
        expected: null,
        customMessage: message,
      };
    },
  });
};
