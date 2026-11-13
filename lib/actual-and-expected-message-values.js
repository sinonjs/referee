"use strict";

/**
 * @param {unknown} actual
 * @param {unknown} expected
 * @param {unknown} message
 */
function actualAndExpectedMessageValues(actual, expected, message) {
  return {
    actual,
    expected,
    customMessage: message,
  };
}

module.exports = actualAndExpectedMessageValues;
