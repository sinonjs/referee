"use strict";

const samsam = require("@sinonjs/samsam");

/**
 * @param {(actual: unknown, expected: unknown) => void} thenFunc
 * @param {(actual: unknown, expected: unknown) => void} catchFunc
 */
function createAsyncAssertion(thenFunc, catchFunc) {
  /**
   * @param {Promise<unknown>} promise
   */
  function asyncAssertion(promise) {
    const self = this;
    this.expected = arguments.length === 1 ? samsam.match.any : arguments[1];
    /**
     * @param {(actual: unknown, expected: unknown) => void} callback
     * @param {{reject: (message: unknown) => void, resolve: (value: unknown) => void}} context
     */
    function applyCallback(callback, context) {
      return function (actual) {
        self.actual = actual;
        try {
          callback.apply(context, [actual, self.expected]);
        } catch (error) {
          context.reject(error.message);
        }
      };
    }
    const assertionPromise = new Promise((resolve, reject) => {
      try {
        const context = { resolve, reject };
        promise.then(
          applyCallback(thenFunc, context),
          applyCallback(catchFunc, context),
        );
      } catch (error) {
        reject(error.message);
      }
    }).catch((message) => {
      self.fail(message);
    });

    return assertionPromise;
  }

  return asyncAssertion;
}

module.exports = createAsyncAssertion;
