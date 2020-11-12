"use strict";

module.exports = function (referee) {
  referee.add("isFunction", {
    assert: function (actual) {
      return typeof actual === "function";
    },
    assertMessage:
      "${customMessage}${value} (${actual}) expected to be function",
    refuteMessage: "${customMessage}${value} expected not to be function",
    expectation: "toBeFunction",
    values: function (actual, message) {
      return {
        value: String(actual)
          .replace("function(", "function (")
          .replace("\n", ""),
        actual: typeof actual,
        expected: "function",
        customMessage: message,
      };
    },
  });
};
