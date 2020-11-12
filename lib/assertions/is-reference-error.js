"use strict";

var actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
  referee.add("isReferenceError", {
    assert: function (actual) {
      return actual instanceof ReferenceError;
    },
    assertMessage: "${customMessage}Expected ${actual} to be a ReferenceError",
    refuteMessage:
      "${customMessage}Expected ${actual} not to be a ReferenceError",
    expectation: "toBeReferenceError",
    values: actualMessageValues,
  });
};
