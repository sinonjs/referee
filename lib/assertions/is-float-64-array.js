"use strict";

var actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
  referee.add("isFloat64Array", {
    assert: function (actual) {
      return actual instanceof Float64Array;
    },
    assertMessage: "${customMessage}Expected ${actual} to be a Float64Array",
    refuteMessage:
      "${customMessage}Expected ${actual} not to be a Float64Array",
    expectation: "toBeFloat64Array",
    values: actualMessageValues,
  });
};
