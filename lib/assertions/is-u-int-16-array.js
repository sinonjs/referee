"use strict";

var actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
  referee.add("isUint16Array", {
    assert: function (actual) {
      return actual instanceof Uint16Array;
    },
    assertMessage: "${customMessage}Expected ${actual} to be a Uint16Array",
    refuteMessage: "${customMessage}Expected ${actual} not to be a Uint16Array",
    expectation: "toBeUint16Array",
    values: actualMessageValues,
  });
};
