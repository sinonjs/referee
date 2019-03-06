"use strict";

var actualAndTypeOfMessageValues = require("../actual-and-type-of-message-values");
var deprecated = require("@sinonjs/commons").deprecated;

module.exports = function(referee) {
    function definedAssert(actual) {
        return typeof actual !== "undefined";
    }
    referee.add("defined", {
        assert: function(actual) {
            return deprecated.wrap(
                definedAssert,
                "defined is deprecated and will be removed in the future. Please use isUndefined instead."
            )(actual);
        },
        assertMessage: "${customMessage}Expected to be defined",
        refuteMessage:
            "${customMessage}Expected ${actual} (${actualType}) not to be defined",
        expectation: "toBeDefined",
        values: actualAndTypeOfMessageValues
    });
};
