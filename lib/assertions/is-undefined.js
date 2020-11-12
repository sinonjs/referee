"use strict";

var actualAndTypeOfMessageValues = require("../actual-and-type-of-message-values");

module.exports = function (referee) {
  referee.add("isUndefined", {
    assert: function (actual) {
      return typeof actual === "undefined";
    },
    assertMessage:
      "${customMessage}Expected ${actual} (${actualType}) to be undefined",
    refuteMessage:
      "${customMessage}Expected ${actual} (${actualType}) not to be undefined",
    expectation: "toBeUndefined",
    values: actualAndTypeOfMessageValues,
  });
};
