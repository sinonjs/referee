"use strict";
/* eslint-disable jsdoc/require-param-type */

const assertArgNum = require("../assert-arg-num");
const interpolatePosArg = require("./interpolate-pos-arg");
const interpolateProperties = require("./interpolate-properties");
const getMessage = require("./get-message");

/**
 *
 * @param referee
 * @param type
 * @param name
 * @param func
 * @param minArgs
 * @param messageValues
 */
function createAssertion(referee, type, name, func, minArgs, messageValues) {
  const assertion = function (...args) {
    const fullName = `${type}.${name}`;
    let failed = false;

    assertArgNum(referee.fail, fullName, args, minArgs);

    let namedValues = {};

    const ctx = {
      fail(msg) {
        if (typeof messageValues === "function") {
          namedValues = messageValues.apply(this, args);
        }

        failed = true;
        delete this.fail;

        let message = getMessage(referee, type, name, msg);

        message = interpolatePosArg(message, args);
        message = interpolateProperties(referee, message, this);
        message = interpolateProperties(referee, message, namedValues);
        const operator = `${type}.${name}`;
        const errorProperties = {
          operator,
        };
        if (type === "assert") {
          if (
            namedValues.hasOwnProperty("actual") &&
            namedValues.hasOwnProperty("expected")
          ) {
            errorProperties.actual = namedValues.actual;
            errorProperties.expected = namedValues.expected;
          }
        }
        referee.fail(`[${operator}] ${message}`, errorProperties);
        return false;
      },
    };

    const result = func.apply(ctx, args);

    if (typeof Promise === "function" && result instanceof Promise) {
      // Here we need to return the promise in order to tell test
      // runners that this is an asychronous assertion.
      return result.then(() => {
        referee.pass(["pass", fullName].concat(args));
      });
    }

    if (!result && !failed) {
      // when a function returns false and hasn't already failed with a custom message,
      // fail with default message
      ctx.fail("message");
    }

    if (!failed) {
      referee.pass(["pass", fullName].concat(args));
    }

    return undefined;
  };

  return assertion;
}

// Internal helper. Not the most elegant of functions, but it takes
// care of all the nitty-gritty of assertion functions: counting,
// verifying parameter count, interpolating messages with actual
// values and so on.
/**
 *
 * @param referee
 * @param type
 * @param name
 * @param func
 * @param minArgs
 * @param messageValues
 */
function defineAssertion(referee, type, name, func, minArgs, messageValues) {
  referee[type][name] = function (...args) {
    const assertion = createAssertion(
      referee,
      type,
      name,
      func,
      minArgs,
      messageValues,
    );
    return assertion(...args);
  };
}

module.exports = defineAssertion;
