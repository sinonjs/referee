"use strict";

const actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
  referee.add("isWeakSet", {
    assert(actual) {
      return actual instanceof WeakSet;
    },
    assertMessage: "${customMessage}Expected ${actual} to be a WeakSet",
    refuteMessage: "${customMessage}Expected ${actual} not to be a WeakSet",
    expectation: "toBeWeakSet",
    values: actualMessageValues,
  });
};
