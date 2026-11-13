"use strict";

const samsam = require("@sinonjs/samsam");

/**
 * @param {(actual: unknown, expected: unknown) => void} thenFunc
 * @param {(actual: unknown, expected: unknown) => void} catchFunc
 */
function createAsyncAssertion(thenFunc, catchFunc) {
  /**
   * @param {Promise<unknown>} promise
   * @param {...unknown} rest the optional expected value
   */
  // rest parameters keep asyncAssertion.length at 1, which add() uses as minArgs
  function asyncAssertion(promise, ...rest) {
    const self = this;
    this.expected = rest.length === 0 ? samsam.match.any : rest[0];
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
