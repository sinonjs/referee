"use strict";

var samsam = require("@sinonjs/samsam");

function createAsyncAssertion(thenFunc, catchFunc) {
  function asyncAssertion(promise) {
    var self = this;
    this.expected = arguments.length === 1 ? samsam.match.any : arguments[1];
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
    var assertionPromise = new Promise(function (resolve, reject) {
      try {
        var context = { resolve: resolve, reject: reject };
        promise.then(
          applyCallback(thenFunc, context),
          applyCallback(catchFunc, context)
        );
      } catch (error) {
        reject(error.message);
      }
    }).catch(function (message) {
      self.fail(message);
    });

    return assertionPromise;
  }

  return asyncAssertion;
}

module.exports = createAsyncAssertion;
