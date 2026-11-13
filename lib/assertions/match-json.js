"use strict";

const samsam = require("@sinonjs/samsam");

const actualForMatch = require("../actual-for-match");
const parseErrorMessage = "${customMessage}Expected ${actual} to be valid JSON";

module.exports = function (referee) {
  referee.add("matchJson", {
    assert(actual, matcher) {
      let parsed;
      try {
        parsed = JSON.parse(actual);
      } catch {
        return this.fail(parseErrorMessage);
      }

      return samsam.match(parsed, matcher);
    },
    assertMessage: "${customMessage}Expected ${actual} to match ${expected}",
    refuteMessage:
      "${customMessage}Expected ${actual} not to match ${expected}",
    expectation: "toMatchJson",
    values(actual, matcher, message) {
      let parsed;
      try {
        parsed = JSON.parse(actual);
      } catch {
        // Do nothing
      }
      parsed = actualForMatch(parsed, matcher);
      return {
        actualRaw: actual,
        actual: parsed || actual,
        expected: matcher,
        customMessage: message,
      };
    },
  });
};
