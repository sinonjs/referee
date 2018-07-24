"use strict";

module.exports = function(referee) {
    referee.add("isFunction", {
        assert: function(actual) {
            return typeof actual === "function";
        },
        assertMessage:
            "${customMessage}${actual} (${actualType}) expected to be function",
        refuteMessage: "${customMessage}${actual} expected not to be function",
        expectation: "toBeFunction",
        values: function(actual, message) {
            return {
                actual: String(actual).replace("\n", ""),
                actualType: typeof actual,
                customMessage: message
            };
        }
    });
};
