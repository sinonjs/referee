"use strict";

const actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
  referee.add("isSet", {
    assert(actual) {
      return actual instanceof Set;
    },
    assertMessage: "${customMessage}Expected ${actual} to be a Set",
    refuteMessage: "${customMessage}Expected ${actual} not to be a Set",
    expectation: "toBeSet",
    values: actualMessageValues,
  });
};
