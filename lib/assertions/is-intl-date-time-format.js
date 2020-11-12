"use strict";

var actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
  referee.add("isIntlDateTimeFormat", {
    assert: function (actual) {
      return actual instanceof Intl.DateTimeFormat;
    },
    assertMessage:
      "${customMessage}Expected ${actual} to be an Intl.DateTimeFormat",
    refuteMessage:
      "${customMessage}Expected ${actual} not to be an Intl.DateTimeFormat",
    expectation: "toBeIntlDateTimeFormat",
    values: actualMessageValues,
  });
};
