"use strict";

var samsam = require("@sinonjs/samsam");
var createAsyncAssertion = require("../create-async-assertion");

var assertMessage = "${actual} is not identical to ${expected}";
var refuteMessage = "${actual} is identical to ${expected}";

module.exports = function(referee) {
    function thenCallback() {
        this.reject("${0} did not reject, it resolved instead");
    }
    referee.add("rejects", {
        assert: createAsyncAssertion(thenCallback, function(actual, expected) {
            if (!samsam.identical(actual, expected)) {
                this.reject(assertMessage);
                return;
            }
            this.resolve();
        }),
        refute: createAsyncAssertion(thenCallback, function(actual, expected) {
            if (samsam.identical(actual, expected)) {
                this.reject(refuteMessage);
                return;
            }
            this.resolve();
        }),
        assertMessage: assertMessage,
        refuteMessage: refuteMessage
    });
};
