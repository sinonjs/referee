"use strict";

function createAsyncAssertion(thenFunc, catchFunc) {
    function asyncAssertion(promise, expected) {
        var self = this;
        this.expected = expected;
        function applyCallback(callback, context) {
            return function(actual) {
                self.actual = actual;
                callback.apply(context, [actual, expected]);
            };
        }
        var assertionPromise = new Promise(function(resolve, reject) {
            try {
                var context = { resolve: resolve, reject: reject };
                promise.then(
                    applyCallback(thenFunc, context),
                    applyCallback(catchFunc, context)
                );
            } catch (error) {
                reject(error.message);
            }
        }).catch(function(message) {
            self.fail(message);
        });

        return assertionPromise;
    }

    return asyncAssertion;
}

module.exports = createAsyncAssertion;
