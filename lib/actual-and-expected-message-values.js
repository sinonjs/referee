"use strict";

function actualAndExpectedMessageValues(actual, expected, message) {
  return {
    actual: actual,
    expected: expected,
    customMessage: message,
  };
}

module.exports = actualAndExpectedMessageValues;
