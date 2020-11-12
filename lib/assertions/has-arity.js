"use strict";

var actualAndExpectedMessageValues = require("../actual-and-expected-message-values");

function addHasArity(referee) {
  referee.add("hasArity", {
    assert: function assert(actual, expected) {
      if (typeof actual !== "function") {
        throw new TypeError(
          'hasArity expects "actual" argument to be a Function'
        );
      }

      if (typeof expected !== "number" || expected < 0) {
        throw new TypeError(
          'hasArity expected "expected" argument to be a non-negative Number'
        );
      }

      this.arity = actual.length;
      this.name = actual.name;

      return this.arity === expected;
    },
    assertMessage: "Expected ${name} to have arity of ${1} but was ${arity}",
    refuteMessage: "Expected ${name} to not have arity of ${1}",
    expectation: "toHaveArity",
    values: actualAndExpectedMessageValues,
  });
}

module.exports = addHasArity;
