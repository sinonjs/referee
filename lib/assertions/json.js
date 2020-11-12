"use strict";

var samsam = require("@sinonjs/samsam");

var parseErrorMessage = "${customMessage}Expected ${actual} to be valid JSON";

module.exports = function (referee) {
  referee.add("json", {
    assert: function (actual, expected) {
      var parsed;
      try {
        parsed = JSON.parse(actual);
      } catch (e) {
        return this.fail(parseErrorMessage);
      }
      return samsam.deepEqual(parsed, expected);
    },
    assertMessage: "${customMessage}Expected ${actual} to equal ${expected}",
    refuteMessage:
      "${customMessage}Expected ${actual} not to equal ${expected}",
    expectation: "toEqualJson",
    values: function (actual, expected, message) {
      var parsed;
      try {
        parsed = JSON.parse(actual);
      } catch (e) {
        // Do nothing
      }
      return {
        actualRaw: actual,
        actual: parsed || actual,
        expected: expected,
        customMessage: message,
      };
    },
  });
};
