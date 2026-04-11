"use strict";

var toString = require("@sinonjs/commons").prototypes.object.toString;

/**
 * @param {unknown} actual
 * @param {unknown} match
 */
function actualForMatch(actual, match) {
  if (
    toString(actual) === "[object Object]" &&
    toString(match) === "[object Object]"
  ) {
    var copy = {};
    Object.keys(match).forEach(function (key) {
      copy[key] = actual[key];
    });
    return copy;
  }
  return actual;
}

module.exports = actualForMatch;
