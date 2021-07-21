"use strict";

var defineAssertion = require("./define-assertion");

// taken from https://stackoverflow.com/questions/2008279/validate-a-javascript-function-name/2008444#2008444
var validFunctionName = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;

function verifyArguments(name, options) {
  if (typeof name !== "string" || !validFunctionName.test(name)) {
    throw new TypeError(
      `'name' argument must be a non-empty string matching ${validFunctionName.toString()}`
    );
  }

  if (typeof options !== "object" || Object.keys(options).length === 0) {
    throw new TypeError("'options' argument must be a non-empty object");
  }

  if (typeof options.assert !== "function" || options.assert.length === 0) {
    throw new TypeError(
      "'assert' option must be a Function, taking at least one argument"
    );
  }

  if (
    typeof options.refute !== "undefined" &&
    (typeof options.refute !== "function" || options.refute.length === 0)
  ) {
    throw new TypeError(
      "'refute' option must be a Function, taking at least one argument"
    );
  }

  ["assertMessage", "refuteMessage"].forEach((m) => {
    if (!isValidMessageOption(options[m])) {
      throw new TypeError(
        `'${m}' option must be a non-empty String or Function`
      );
    }
  });
}

/**
 * returns true when message option is considered valid,
 * i.e. when it is a function or a non-empty string
 *
 * @private
 * @param  {*}  message
 * @returns {boolean}
 */
function isValidMessageOption(message) {
  if (typeof message === "undefined") {
    return true;
  }

  if (typeof message === "function") {
    return true;
  }

  if (typeof message === "string" && message.length > 0) {
    return true;
  }

  return false;
}

function createAdd(referee) {
  function add(name, options) {
    verifyArguments(name, options);

    var refuteArgs = options.refute
      ? options.refute.length
      : options.assert.length;

    if (!options.refute) {
      options.refute = function () {
        return !options.assert.apply(this, arguments);
      };
    }

    defineAssertion(
      referee,
      "assert",
      name,
      options.assert,
      options.assert.length,
      options.values
    );
    defineAssertion(
      referee,
      "refute",
      name,
      options.refute,
      refuteArgs,
      options.values
    );

    // Refactor: pass this down to where it is needed, so it is not part of the public api
    referee.assert[name].message = options.assertMessage;
    referee.refute[name].message = options.refuteMessage;

    if (!options.expectation) {
      return;
    }

    referee.assert[name].expectationName = options.expectation;
    referee.refute[name].expectationName = options.expectation;
  }

  return add;
}

module.exports = createAdd;
