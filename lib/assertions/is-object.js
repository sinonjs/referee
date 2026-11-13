"use strict";

module.exports = function (referee) {
  referee.add("isObject", {
    assert(actual) {
      return typeof actual === "object" && Boolean(actual);
    },
    assertMessage:
      "${customMessage}${value} (${actual}) expected to be object and not null",
    refuteMessage:
      "${customMessage}${value} expected to be null or not an object",
    expectation: "toBeObject",
    values(actual, message) {
      return {
        value: actual,
        actual: typeof actual,
        expected: "object",
        customMessage: message,
      };
    },
  });
};
