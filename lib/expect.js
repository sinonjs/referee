"use strict";

/**
 * @param {unknown} actual
 */
function expect(actual) {
  const expectation = Object.assign(Object.create(expect.expectation), {
    actual,
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
    const args = [this.actual].concat(Array.from(arguments));
    const type = this.assertMode ? "assert" : "refute";
    let callFunc;

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
  Object.keys(referee.assert).forEach((name) => {
    const expectationName = referee.assert[name].expectationName;
    if (expectationName) {
      expect.wrapAssertion(name, expectationName, referee);
    }
  });

  expect.wrapAssertion("assert", "toBeTruthy", referee);
  expect.wrapAssertion("refute", "toBeFalsy", referee);
};

module.exports = expect;
