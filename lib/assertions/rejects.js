"use strict";

const samsam = require("@sinonjs/samsam");
const createAsyncAssertion = require("../create-async-assertion");

const assertMessage = "${actual} is not equal to ${expected}";
const refuteMessage = "${actual} is equal to ${expected}";

module.exports = function (referee) {
  /**
   *
   */
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
    assertMessage,
    refuteMessage,
  });
};
