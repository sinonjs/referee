"use strict";

var interpolate = require("./interpolate");
var reduce = require("@sinonjs/commons").prototypes.array.reduce;

// Interpolate positional arguments. Replaces occurences of ${<index>} in
// the string with the corresponding entry in values[<index>]
function interpolatePosArg(message, values) {
    return reduce(
        values,
        function(msg, value, index) {
            return interpolate(msg, index, String(value));
        },
        message
    );
}

module.exports = interpolatePosArg;
