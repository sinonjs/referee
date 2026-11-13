"use strict";

const actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
  referee.add("isDate", {
    assert(actual) {
      return actual instanceof Date;
    },
    assertMessage: "${customMessage}Expected ${actual} to be a Date",
    refuteMessage: "${customMessage}Expected ${actual} not to be a Date",
    expectation: "toBeDate",
    values: actualMessageValues,
  });
};
