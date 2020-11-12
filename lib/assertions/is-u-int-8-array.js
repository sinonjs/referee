"use strict";

var actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
  referee.add("isUint8Array", {
    assert: function (actual) {
      return actual instanceof Uint8Array;
    },
    assertMessage: "${customMessage}Expected ${actual} to be a Uint8Array",
    refuteMessage: "${customMessage}Expected ${actual} not to be a Uint8Array",
    expectation: "toBeUint8Array",
    values: actualMessageValues,
  });
};
