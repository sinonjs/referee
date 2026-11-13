"use strict";

const samsam = require("@sinonjs/samsam");
const actualForMatch = require("../actual-for-match");

module.exports = function (referee) {
  referee.add("match", {
    assert(actual, matcher) {
      return samsam.match(actual, matcher);
    },
    assertMessage: "${customMessage}${actual} expected to match ${expected}",
    refuteMessage:
      "${customMessage}${actual} expected not to match ${expected}",
    expectation: "toMatch",
    values(actual, matcher, message) {
      return {
        actual: actualForMatch(actual, matcher),
        expected: matcher,
        customMessage: message,
      };
    },
  });
};
