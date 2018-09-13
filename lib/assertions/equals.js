"use strict";

var samsam = require("@sinonjs/samsam");

function escapeNewlines(value) {
    if (typeof value === "string") {
        return value.replace(/\n/g, "\\n");
    }
    return value;
}

module.exports = function(referee) {
    referee.add("equals", {
        // Uses arguments[2] because the function's .length is used to determine
        // the minimum required number of arguments.
        assert: function(actual, expected) {
            return samsam.deepEqual(actual, expected);
        },

        refute: function(actual, expected) {
            return !samsam.deepEqual(actual, expected);
        },

        assertMessage:
            "${customMessage}${escapedActual} expected to be equal to ${escapedExpected}",
        refuteMessage:
            "${customMessage}${escapedActual} expected not to be equal to ${escapedExpected}",
        expectation: "toEqual",
        values: function(actual, expected, message) {
            return {
                escapedActual: escapeNewlines(actual),
                escapedExpected: escapeNewlines(expected),
                actual: actual,
                expected: expected,
                customMessage: message
            };
        }
    });

    referee.assert.equals.multiLineStringHeading =
        "${customMessage}Expected multi-line strings to be equal:\n";
};
