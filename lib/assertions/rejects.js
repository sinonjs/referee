"use strict";

var samsam = require("@sinonjs/samsam");
var createAsyncAssertion = require("../create-async-assertion");

module.exports = function(referee) {
    function thenCallback() {
        this.reject("${0} does not reject, it resolves instead");
    }
    referee.add("rejects", {
        assert: createAsyncAssertion(thenCallback, function(actual, expected) {
            if (!samsam.identical(actual, expected)) {
                this.reject(referee.assert.rejects.message);
            }
            this.resolve();
        }),
        refute: createAsyncAssertion(thenCallback, function(actual, expected) {
            if (samsam.identical(actual, expected)) {
                this.reject(referee.refute.rejects.message);
            }
            this.resolve();
        }),
        /*
        assert: function(promise, expected) {
            this.expected = expected;
            var self = this;
            return new Promise(function(resolve, reject) {
                try {
                    promise
                        .catch(function(actual) {
                            self.actual = actual;
                            if (!samsam.identical(actual, expected)) {
                                reject(
                                    "${actual} is not identical to ${expected}"
                                );
                            }
                            resolve();
                        })
                        .then(function() {
                            reject(
                                "Promise does not reject it resolves instead"
                            );
                        });
                } catch (e) {
                    reject(e);
                }
            }).catch(function(e) {
                self.fail(e);
            });
        },
        refute: function(promise, expected) {
            this.expected = expected;
            var self = this;
            return new Promise(function(resolve, reject) {
                try {
                    promise
                        .catch(function(actual) {
                            self.actual = actual;
                            if (samsam.identical(actual, expected)) {
                                reject("${actual} is identical to ${expected}");
                            }
                            resolve();
                        })
                        .then(function() {
                            reject(
                                "Promise does not reject it resolves instead"
                            );
                        });
                } catch (e) {
                    reject(e);
                }
            }).catch(function(e) {
                self.fail(e);
            });
        },
        */
        assertMessage: "${actual} is not identical to ${expected}",
        refuteMessage: "${actual} is identical to ${expected}"
    });
};
