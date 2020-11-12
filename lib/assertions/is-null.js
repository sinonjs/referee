"use strict";

module.exports = function (referee) {
  referee.add("isNull", {
    assert: function (actual) {
      return actual === null;
    },
    assertMessage: "${customMessage}Expected ${actual} to be null",
    refuteMessage: "${customMessage}Expected not to be null",
    expectation: "toBeNull",
    values: function (actual, message) {
      return {
        actual: actual,
        expected: null,
        customMessage: message,
      };
    },
  });
};
