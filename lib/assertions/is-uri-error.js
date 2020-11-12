"use strict";

var actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
  referee.add("isURIError", {
    assert: function (actual) {
      return actual instanceof URIError;
    },
    assertMessage: "${customMessage}Expected ${actual} to be a URIError",
    refuteMessage: "${customMessage}Expected ${actual} not to be a URIError",
    expectation: "toBeURIError",
    values: actualMessageValues,
  });
};
