"use strict";

const actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
  referee.add("isIntlCollator", {
    assert(actual) {
      return actual instanceof Intl.Collator;
    },
    assertMessage: "${customMessage}Expected ${actual} to be an Intl.Collator",
    refuteMessage:
      "${customMessage}Expected ${actual} not to be an Intl.Collator",
    expectation: "toBeIntlCollator",
    values: actualMessageValues,
  });
};
