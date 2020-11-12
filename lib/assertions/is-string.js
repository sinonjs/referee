"use strict";

module.exports = function (referee) {
  referee.add("isString", {
    assert: function (actual) {
      return typeof actual === "string";
    },
    assertMessage: "${customMessage}Expected ${value} (${actual}) to be string",
    refuteMessage: "${customMessage}Expected ${value} not to be string",
    expectation: "toBeString",
    values: function (actual, message) {
      return {
        value: actual,
        actual: typeof actual,
        expected: "string",
        customMessage: message,
      };
    },
  });
};
