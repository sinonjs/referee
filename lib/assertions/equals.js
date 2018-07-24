"use strict";

var samsam = require("samsam");
var interpolateProperties = require("../interpolate-properties");
var actualAndExpectedMessageValues = require("../actual-and-expected-message-values");

// Extract/replace with separate module that does a more detailed
// visualization of multi-line strings
function multiLineStringDiff(referee, actual, expected, message) {
    if (actual === expected) {
        return true;
    }

    var heading = referee.assert.equals.multiLineStringHeading;
    var failureText = interpolateProperties(referee, heading, {
        customMessage: message
    });
    var actualLines = actual.split("\n");
    var expectedLines = expected.split("\n");
    var lineCount = Math.max(expectedLines.length, actualLines.length);
    var lines = [];

    for (var i = 0; i < lineCount; ++i) {
        if (expectedLines[i] !== actualLines[i]) {
            lines.push(
                "line " +
                    (i + 1) +
                    ": " +
                    (expectedLines[i] || "") +
                    "\nwas:    " +
                    (actualLines[i] || "")
            );
        }
    }

    referee.fail("[assert.equals] " + failureText + lines.join("\n\n"));
    return false;
}

module.exports = function(referee) {
    referee.add("equals", {
        // Uses arguments[2] because the function's .length is used to determine
        // the minimum required number of arguments.
        assert: function(actual, expected) {
            if (
                typeof actual === "string" &&
                typeof expected === "string" &&
                (actual.indexOf("\n") >= 0 || expected.indexOf("\n") >= 0)
            ) {
                return multiLineStringDiff(
                    referee,
                    actual,
                    expected,
                    arguments[2]
                );
            }

            return samsam.deepEqual(actual, expected);
        },

        refute: function(actual, expected) {
            return !samsam.deepEqual(actual, expected);
        },

        assertMessage:
            "${customMessage}${actual} expected to be equal to ${expected}",
        refuteMessage:
            "${customMessage}${actual} expected not to be equal to ${expected}",
        expectation: "toEqual",
        values: actualAndExpectedMessageValues
    });

    referee.assert.equals.multiLineStringHeading =
        "${customMessage}Expected multi-line strings to be equal:\n";
};
