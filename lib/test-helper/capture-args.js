"use strict";

module.exports = function captureArgs() {
  // eslint-disable-next-line prefer-rest-params -- callers need a real arguments object
  return arguments;
};
