"use strict";

const format = require("./format");

// Interpolate positional arguments. Replaces occurences of ${<index>} in
// the string with the corresponding entry in values[<index>]
/**
 * @param {string} message
 * @param {unknown[]} values
 */
function interpolatePosArg(message, values) {
  return message.replaceAll(/\${([0-9]+)}/gi, (match, num) => {
    const index = parseInt(num, 10);
    const value = values[index];
    return format(value);
  });
}

module.exports = interpolatePosArg;
