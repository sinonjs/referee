"use strict";

var actualAndExpectedMessageValues = require("../actual-and-expected-message-values");

module.exports = function (referee) {
  referee.add("hasPrototype", {
    assert: function (actual, protoObj) {
      return protoObj.isPrototypeOf(actual);
    },
    assertMessage:
      "${customMessage}Expected ${actual} to have ${expected} on its prototype chain",
    refuteMessage:
      "${customMessage}Expected ${actual} not to have ${expected} on its " +
      "prototype chain",
    expectation: "toHavePrototype",
    values: actualAndExpectedMessageValues,
  });
};
