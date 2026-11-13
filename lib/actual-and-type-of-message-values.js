"use strict";

/**
 * @param {unknown} actual
 * @param {unknown} message
 */
function actualAndTypeOfMessageValues(actual, message) {
  return {
    actual,
    actualType: typeof actual,
    customMessage: message,
  };
}

module.exports = actualAndTypeOfMessageValues;
