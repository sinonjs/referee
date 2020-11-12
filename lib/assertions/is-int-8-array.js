"use strict";

var actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
  referee.add("isInt8Array", {
    assert: function (actual) {
      return actual instanceof Int8Array;
    },
    assertMessage: "${customMessage}Expected ${actual} to be an Int8Array",
    refuteMessage: "${customMessage}Expected ${actual} not to be an Int8Array",
    expectation: "toBeInd8Array",
    values: actualMessageValues,
  });
};
