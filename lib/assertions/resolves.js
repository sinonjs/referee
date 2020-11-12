"use strict";

var samsam = require("@sinonjs/samsam");
var createAsyncAssertion = require("../create-async-assertion");

var assertMessage = "${actual} is not equal to ${expected}";
var refuteMessage = "${actual} is equal to ${expected}";

module.exports = function (referee) {
  function catchCallback() {
    this.reject("${0} did not resolve, it rejected instead");
  }
  referee.add("resolves", {
    assert: createAsyncAssertion(function (actual, expected) {
      if (!samsam.deepEqual(actual, expected)) {
        this.reject(assertMessage);
        return;
      }
      this.resolve();
    }, catchCallback),
    refute: createAsyncAssertion(function (actual, expected) {
      if (samsam.deepEqual(actual, expected)) {
        if (expected === samsam.match.any) {
          this.reject("${0} resolved unexpectedly");
        } else {
          this.reject(refuteMessage);
        }
        return;
      }
      this.resolve();
    }, catchCallback),
    expectation: "toResolveWith",
    assertMessage: assertMessage,
    refuteMessage: refuteMessage,
  });
};
