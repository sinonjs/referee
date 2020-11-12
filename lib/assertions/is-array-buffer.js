"use strict";

var actualMessageValues = require("../actual-message-values");
var toString = require("@sinonjs/commons").prototypes.object.toString;

module.exports = function (referee) {
  referee.add("isArrayBuffer", {
    assert: function (actual) {
      return toString(actual) === "[object ArrayBuffer]";
    },
    assertMessage: "${customMessage}Expected ${actual} to be an ArrayBuffer",
    refuteMessage:
      "${customMessage}Expected ${actual} not to be an ArrayBuffer",
    expectation: "toBeArrayBuffer",
    values: actualMessageValues,
  });
};
