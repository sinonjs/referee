"use strict";

const samsam = require("@sinonjs/samsam");

const parseErrorMessage = "${customMessage}Expected ${actual} to be valid JSON";

module.exports = function (referee) {
  referee.add("json", {
    assert(actual, expected) {
      let parsed;
      try {
        parsed = JSON.parse(actual);
      } catch {
        return this.fail(parseErrorMessage);
      }
      return samsam.deepEqual(parsed, expected);
    },
    assertMessage: "${customMessage}Expected ${actual} to equal ${expected}",
    refuteMessage:
      "${customMessage}Expected ${actual} not to equal ${expected}",
    expectation: "toEqualJson",
    values(actual, expected, message) {
      let parsed;
      try {
        parsed = JSON.parse(actual);
      } catch {
        // Do nothing
      }
      return {
        actualRaw: actual,
        actual: parsed || actual,
        expected,
        customMessage: message,
      };
    },
  });
};
