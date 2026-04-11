"use strict";

/**
 * @param {{emit: (eventName: string, error: unknown) => void, throwOnFailure?: boolean}} referee
 */
function createFail(referee) {
  /**
   * @param {string} message
   * @param {Record<string, unknown>} [errorProperties]
   */
  function fail(message, errorProperties) {
    var exception = new Error(message);
    exception.name = "AssertionError";
    exception.code = "ERR_ASSERTION";
    if (errorProperties) {
      Object.keys(errorProperties).forEach(function (key) {
        exception[key] = errorProperties[key];
      });
    }

    try {
      throw exception;
    } catch (e) {
      referee.emit("failure", e);
    }

    if (typeof referee.throwOnFailure !== "boolean" || referee.throwOnFailure) {
      throw exception;
    }
  }

  return fail;
}

module.exports = createFail;
