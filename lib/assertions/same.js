"use strict";

const samsam = require("@sinonjs/samsam");
const actualAndExpectedMessageValues = require("../actual-and-expected-message-values");

module.exports = function (referee) {
  referee.add("same", {
    assert(actual, expected) {
      return samsam.identical(actual, expected);
    },
    assertMessage:
      "${customMessage}${actual} expected to be the same object as ${expected}",
    refuteMessage:
      "${customMessage}${actual} expected not to be the same object as ${expected}",
    expectation: "toBe",
    values: actualAndExpectedMessageValues,
  });
};
