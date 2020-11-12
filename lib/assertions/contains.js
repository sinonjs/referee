"use strict";

var includes = require("lodash.includes");
var actualAndExpectedMessageValues = require("../actual-and-expected-message-values");

module.exports = function (referee) {
  referee.add("contains", {
    assert: function (haystack, needle) {
      return includes(haystack, needle);
    },
    assertMessage: "${customMessage}Expected ${actual} to contain ${expected}",
    refuteMessage:
      "${customMessage}Expected ${actual} not to contain ${expected}",
    expectation: "toContain",
    values: actualAndExpectedMessageValues,
  });
};
