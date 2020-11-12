"use strict";

var actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
  referee.add("isInt32Array", {
    assert: function (actual) {
      return actual instanceof Int32Array;
    },
    assertMessage: "${customMessage}Expected ${actual} to be an Int32Array",
    refuteMessage: "${customMessage}Expected ${actual} not to be an Int32Array",
    expectation: "toBeInt32Array",
    values: actualMessageValues,
  });
};
