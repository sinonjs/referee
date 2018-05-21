"use strict";

var actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
    referee.add("isWeakMap", {
        assert: function (actual) {
            // eslint-disable-next-line ie11/no-weak-collections
            return actual instanceof WeakMap;
        },
        assertMessage: "${customMessage}Expected ${actual} to be a WeakMap",
        refuteMessage: "${customMessage}Expected ${actual} not to be a WeakMap",
        expectation: "toBeWeakMap",
        values: actualMessageValues
    });
};
