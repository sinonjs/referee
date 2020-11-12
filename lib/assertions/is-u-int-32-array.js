"use strict";

var actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
  referee.add("isUint32Array", {
    assert: function (actual) {
      return actual instanceof Uint32Array;
    },
    assertMessage: "${customMessage}Expected ${actual} to be a Uint32Array",
    refuteMessage: "${customMessage}Expected ${actual} not to be a Uint32Array",
    expectation: "toBeUint32Array",
    values: actualMessageValues,
  });
};
