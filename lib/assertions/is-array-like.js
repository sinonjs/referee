"use strict";

const isArguments = require("lodash.isarguments");
const actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
  /**
   * @param {unknown} object
   */
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
    assert(actual) {
      return isArrayLike(actual);
    },
    assertMessage: "${customMessage}Expected ${actual} to be array like",
    refuteMessage: "${customMessage}Expected ${actual} not to be array like",
    expectation: "toBeArrayLike",
    values: actualMessageValues,
  });
};
