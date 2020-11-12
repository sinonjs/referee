"use strict";

var actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
  referee.add("isError", {
    assert: function (actual) {
      return actual instanceof Error;
    },
    assertMessage: "${customMessage}Expected ${actual} to be an Error",
    refuteMessage: "${customMessage}Expected ${actual} not to be an Error",
    expectation: "toBeError",
    values: actualMessageValues,
  });
};
