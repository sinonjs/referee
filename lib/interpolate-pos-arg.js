"use strict";

var format = require("./format");

// Interpolate positional arguments. Replaces occurences of ${<index>} in
// the string with the corresponding entry in values[<index>]
function interpolatePosArg(message, values) {
  return message.replace(/\${([0-9]+)}/gi, function (match, num) {
    var index = parseInt(num, 10);
    var value = values[index];
    return format(value);
  });
}

module.exports = interpolatePosArg;
