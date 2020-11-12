"use strict";

var actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
  referee.add("isInt16Array", {
    assert: function (actual) {
      return actual instanceof Int16Array;
    },
    assertMessage: "${customMessage}Expected ${actual} to be an Int16Array",
    refuteMessage: "${customMessage}Expected ${actual} not to be an Int16Array",
    expectation: "toBeInt16Array",
    values: actualMessageValues,
  });
};
