"use strict";

var actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
  referee.add("isTypeError", {
    assert: function (actual) {
      return actual instanceof TypeError;
    },
    assertMessage: "${customMessage}Expected ${actual} to be a TypeError",
    refuteMessage: "${customMessage}Expected ${actual} not to be a TypeError",
    expectation: "toBeTypeError",
    values: actualMessageValues,
  });
};
