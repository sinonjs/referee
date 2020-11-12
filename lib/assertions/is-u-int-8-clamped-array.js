"use strict";

var actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
  referee.add("isUint8ClampedArray", {
    assert: function (actual) {
      return actual instanceof Uint8ClampedArray;
    },
    assertMessage:
      "${customMessage}Expected ${actual} to be a Uint8ClampedArray",
    refuteMessage:
      "${customMessage}Expected ${actual} not to be a Uint8ClampedArray",
    expectation: "toBeUint8ClampedArray",
    values: actualMessageValues,
  });
};
