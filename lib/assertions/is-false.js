"use strict";

const actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
  referee.add("isFalse", {
    assert(actual) {
      return actual === false;
    },
    assertMessage: "${customMessage}Expected ${actual} to be false",
    refuteMessage: "${customMessage}Expected ${actual} to not be false",
    expectation: "toBeFalse",
    values: actualMessageValues,
  });
};
