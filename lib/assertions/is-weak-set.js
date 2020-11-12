"use strict";

var actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
  referee.add("isWeakSet", {
    assert: function (actual) {
      // eslint-disable-next-line ie11/no-weak-collections
      return actual instanceof WeakSet;
    },
    assertMessage: "${customMessage}Expected ${actual} to be a WeakSet",
    refuteMessage: "${customMessage}Expected ${actual} not to be a WeakSet",
    expectation: "toBeWeakSet",
    values: actualMessageValues,
  });
};
