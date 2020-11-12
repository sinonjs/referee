"use strict";

var actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
  referee.add("isIntlNumberFormat", {
    assert: function (actual) {
      return actual instanceof Intl.NumberFormat;
    },
    assertMessage:
      "${customMessage}Expected ${actual} to be an Intl.NumberFormat",
    refuteMessage:
      "${customMessage}Expected ${actual} not to be an Intl.NumberFormat",
    expectation: "toBeIntlNumberFormat",
    values: actualMessageValues,
  });
};
