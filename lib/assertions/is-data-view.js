"use strict";

var actualMessageValues = require("../actual-message-values");
var toString = require("@sinonjs/commons").prototypes.object.toString;

module.exports = function (referee) {
  referee.add("isDataView", {
    assert: function (actual) {
      return toString(actual) === "[object DataView]";
    },
    assertMessage: "${customMessage}Expected ${actual} to be a DataView",
    refuteMessage: "${customMessage}Expected ${actual} not to be a DataView",
    expectation: "toBeDataView",
    values: actualMessageValues,
  });
};
