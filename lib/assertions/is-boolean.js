"use strict";

module.exports = function (referee) {
  referee.add("isBoolean", {
    assert: function (actual) {
      return typeof actual === "boolean";
    },
    assertMessage:
      "${customMessage}Expected ${value} (${actual}) to be boolean",
    refuteMessage: "${customMessage}Expected ${value} not to be boolean",
    expectation: "toBeBoolean",
    values: function (actual, message) {
      return {
        value: actual,
        actual: typeof actual,
        expected: "boolean",
        customMessage: message,
      };
    },
  });
};
