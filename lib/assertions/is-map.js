"use strict";

const actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
  referee.add("isMap", {
    assert(actual) {
      return actual instanceof Map;
    },
    assertMessage: "${customMessage}Expected ${actual} to be a Map",
    refuteMessage: "${customMessage}Expected ${actual} not to be a Map",
    expectation: "toBeMap",
    values: actualMessageValues,
  });
};
