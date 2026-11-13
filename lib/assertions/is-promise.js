"use strict";

const actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
  referee.add("isPromise", {
    assert(actual) {
      return actual instanceof Promise;
    },
    assertMessage: "${customMessage}Expected ${actual} to be a Promise",
    refuteMessage: "${customMessage}Expected ${actual} not to be a Promise",
    expectation: "toBePromise",
    values: actualMessageValues,
  });
};
