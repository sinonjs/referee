"use strict";

var actualAndTypeOfMessageValues = require("../actual-and-type-of-message-values");

module.exports = function(referee) {
    referee.add("isFloat32Array", {
        assert: function(actual) {
            return actual instanceof Float32Array;
        },
        assertMessage:
            "${customMessage}Expected ${actual} to be a Float32Array",
        refuteMessage:
            "${customMessage}Expected ${actual} not to be a Float32Array",
        expectation: "toBeFloat32Array",
        values: actualAndTypeOfMessageValues
    });
};
