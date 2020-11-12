"use strict";

var samsam = require("@sinonjs/samsam");
var createAsyncAssertion = require("../create-async-assertion");

var assertMessage = "${actual} is not equal to ${expected}";
var refuteMessage = "${actual} is equal to ${expected}";

module.exports = function (referee) {
  function thenCallback() {
    this.reject("${0} did not reject, it resolved instead");
  }
  referee.add("rejects", {
    assert: createAsyncAssertion(thenCallback, function (actual, expected) {
      if (!samsam.deepEqual(actual, expected)) {
        this.reject(assertMessage);
        return;
      }
      this.resolve();
    }),
    refute: createAsyncAssertion(thenCallback, function (actual, expected) {
      if (samsam.deepEqual(actual, expected)) {
        if (expected === samsam.match.any) {
          this.reject("${0} rejected unexpectedly");
        } else {
          this.reject(refuteMessage);
        }
        return;
      }
      this.resolve();
    }),
    expectation: "toRejectWith",
    assertMessage: assertMessage,
    refuteMessage: refuteMessage,
  });
};
