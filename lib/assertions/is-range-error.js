"use strict";

var actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
  referee.add("isRangeError", {
    assert: function (actual) {
      return actual instanceof RangeError;
    },
    assertMessage: "${customMessage}Expected ${actual} to be a RangeError",
    refuteMessage: "${customMessage}Expected ${actual} not to be a RangeError",
    expectation: "toBeRangeError",
    values: actualMessageValues,
  });
};
