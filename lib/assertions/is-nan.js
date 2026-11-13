"use strict";

module.exports = function (referee) {
  referee.add("isNaN", {
    assert(actual) {
      return typeof actual === "number" && Number.isNaN(actual);
    },
    assertMessage: "${customMessage}Expected ${actual} to be NaN",
    refuteMessage: "${customMessage}Expected not to be NaN",
    expectation: "toBeNaN",
    values(actual, message) {
      return {
        actual,
        expected: "NaN",
        customMessage: message,
      };
    },
  });
};
