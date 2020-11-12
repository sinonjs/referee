"use strict";

var actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
  referee.add("isFalse", {
    assert: function (actual) {
      return actual === false;
    },
    assertMessage: "${customMessage}Expected ${actual} to be false",
    refuteMessage: "${customMessage}Expected ${actual} to not be false",
    expectation: "toBeFalse",
    values: actualMessageValues,
  });
};
