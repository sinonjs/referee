"use strict";

/**
 * @param {unknown} actual
 * @param {unknown} message
 */
function actualMessageValues(actual, message) {
  return {
    actual: actual,
    customMessage: message,
  };
}

module.exports = actualMessageValues;
