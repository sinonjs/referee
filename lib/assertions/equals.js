"use strict";

var samsam = require("@sinonjs/samsam");

module.exports = function (referee) {
  referee.add("equals", {
    // Uses arguments[2] because the function's .length is used to determine
    // the minimum required number of arguments.
    assert: function (actual, expected) {
      if (typeof expected === "undefined") {
        return this.fail(
          "Expectation for equals should not be undefined. Use assert.isUndefined instead."
        );
      }
      return samsam.deepEqual(actual, expected);
    },
    assertMessage:
      "${customMessage}${actual} expected to be equal to ${expected}",
    refuteMessage:
      "${customMessage}${actual} expected not to be equal to ${expected}",
    expectation: "toEqual",
    values: function (actual, expected, message) {
      return {
        actual: actual,
        expected: expected,
        customMessage: message,
      };
    },
  });

  referee.assert.equals.multiLineStringHeading =
    "${customMessage}Expected multi-line strings to be equal:\n";
};
