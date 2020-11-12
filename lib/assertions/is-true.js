"use strict";

var actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
  referee.add("isTrue", {
    assert: function (actual) {
      return actual === true;
    },
    assertMessage: "${customMessage}Expected ${actual} to be true",
    refuteMessage: "${customMessage}Expected ${actual} to not be true",
    expectation: "toBeTrue",
    values: actualMessageValues,
  });
};
