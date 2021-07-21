"use strict";

/**
 * Returns a message string for interpolation
 *
 * @param  {object} referee
 * @param  {string} type
 * @param  {string} name
 * @param  {string} msg
 *
 * @private
 *
 * @returns {string}         [description]
 */
function getMessage(referee, type, name, msg) {
  switch (typeof referee[type][name][msg]) {
    case "function":
      return referee[type][name][msg]();
    case "string":
      return referee[type][name][msg] || msg;
    default:
      return msg;
  }
}

module.exports = getMessage;
