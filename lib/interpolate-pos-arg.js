"use strict";

var interpolate = require("./interpolate");
var reduce = require("@sinonjs/commons").prototypes.array.reduce;

// Interpolate positional arguments. Replaces occurences of ${<index>} in
// the string with the corresponding entry in values[<index>]
function interpolatePosArg(message, values) {
    return reduce(
        values,
        function(msg, value, index) {
            var stringifiedMessage =
                value && value.toString ? String(value) : JSON.stringify(value);
            return interpolate(msg, index, stringifiedMessage);
        },
        message
    );
}

module.exports = interpolatePosArg;
