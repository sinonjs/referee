"use strict";

module.exports = function (referee) {
  referee.add("isNumber", {
    assert(actual) {
      return typeof actual === "number" && !Number.isNaN(actual);
    },
    assertMessage:
      "${customMessage}Expected ${value} (${actual}) to be a non-NaN number",
    refuteMessage:
      "${customMessage}Expected ${value} to be NaN or a non-number value",
    expectation: "toBeNumber",
    values(actual, message) {
      return {
        value: actual,
        actual: typeof actual,
        expected: "number",
        customMessage: message,
      };
    },
  });
};
