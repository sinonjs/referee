"use strict";

function expect(actual) {
  var expectation = Object.assign(Object.create(expect.expectation), {
    actual: actual,
    assertMode: true,
  });

  expectation.not = Object.assign(Object.create(expectation), {
    assertMode: false,
  });

  return expectation;
}

expect.expectation = Object.create(null);

expect.wrapAssertion = function wrapAssertion(assertion, expectation, referee) {
  expect.expectation[expectation] = function () {
    var args = [this.actual].concat(Array.from(arguments));
    var type = this.assertMode ? "assert" : "refute";
    var callFunc;

    if (assertion === "assert") {
      callFunc = this.assertMode ? referee.assert : referee.refute;
    } else if (assertion === "refute") {
      callFunc = this.assertMode ? referee.refute : referee.assert;
    } else {
      callFunc = referee[type][assertion];
    }

    try {
      return callFunc.apply(referee.expect, args);
    } catch (e) {
      e.message = e.message.replace(
        `[${type}.${assertion}]`,
        `[expect.${this.assertMode ? "" : "not."}${expectation}]`,
      );
      throw e;
    }
  };
};

expect.init = function init(referee) {
  Object.keys(referee.assert).forEach(function (name) {
    var expectationName = referee.assert[name].expectationName;
    if (expectationName) {
      expect.wrapAssertion(name, expectationName, referee);
    }
  });

  expect.wrapAssertion("assert", "toBeTruthy", referee);
  expect.wrapAssertion("refute", "toBeFalsy", referee);
};

module.exports = expect;
