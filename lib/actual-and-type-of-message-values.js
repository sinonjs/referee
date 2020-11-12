"use strict";

function actualAndTypeOfMessageValues(actual, message) {
  return {
    actual: actual,
    actualType: typeof actual,
    customMessage: message,
  };
}

module.exports = actualAndTypeOfMessageValues;
