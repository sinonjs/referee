"use strict";

var isArguments = require("lodash.isarguments");
var actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
  function isArrayLike(object) {
    return (
      Array.isArray(object) ||
      (Boolean(object) &&
        typeof object.length === "number" &&
        typeof object.splice === "function") ||
      isArguments(object)
    );
  }

  referee.add("isArrayLike", {
    assert: function (actual) {
      return isArrayLike(actual);
    },
    assertMessage: "${customMessage}Expected ${actual} to be array like",
    refuteMessage: "${customMessage}Expected ${actual} not to be array like",
    expectation: "toBeArrayLike",
    values: actualMessageValues,
  });
};
