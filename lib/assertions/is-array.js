"use strict";

var actualAndTypeOfMessageValues = require("../actual-and-type-of-message-values");
var toString = Object.prototype.toString;

module.exports = function (referee) {
    referee.add("isArray", {
        assert: function (actual) {
            return toString.call(actual) === "[object Array]";
        },
        assertMessage: "${customMessage}Expected ${actual} to be array",
        refuteMessage: "${customMessage}Expected ${actual} not to be array",
        expectation: "toBeArray",
        values: actualAndTypeOfMessageValues
    });
};
