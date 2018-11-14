"use strict";

var samsam = require("@sinonjs/samsam");
var createAsyncAssertion = require("../create-async-assertion");

module.exports = function(referee) {
    function catchCallback() {
        this.reject("${0} does not resolve, it rejects instead");
    }
    referee.add("resolves", {
        assert: createAsyncAssertion(function(actual, expected) {
            if (!samsam.identical(actual, expected)) {
                this.reject(referee.assert.resolves.message);
            }
            this.resolve();
        }, catchCallback),
        refute: createAsyncAssertion(function(actual, expected) {
            if (samsam.identical(actual, expected)) {
                this.reject(referee.refute.resolves.message);
            }
            this.resolve();
        }, catchCallback),
        /*
        assert: function(promise, expected) {
            this.expected = expected;
            var self = this;
            return new Promise(function(resolve, reject) {
                try {
                    promise
                        .then(function(actual) {
                            self.actual = actual;
                            if (!samsam.identical(actual, expected)) {
                                reject(
                                    "${actual} is not identical to ${expected}"
                                );
                            }
                            resolve();
                        })
                        .catch(function() {
                            reject(
                                "Promise does not resolve it rejects instead"
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
                        .then(function(actual) {
                            self.actual = actual;
                            if (samsam.identical(actual, expected)) {
                                reject("${actual} is identical to ${expected}");
                            }
                            resolve();
                        })
                        .catch(function() {
                            reject(
                                "Promise does not resolve it rejects instead"
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
