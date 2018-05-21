"use strict";

var actualAndTypeOfMessageValues = require("../actual-and-type-of-message-values");
var toString = Object.prototype.toString;

module.exports = function (referee) {
    referee.add("isDataView", {
        assert: function (actual) {
            return toString.call(actual) === "[object DataView]";
        },
        assertMessage: "${customMessage}Expected ${actual} to be a DataView",
        refuteMessage: "${customMessage}Expected ${actual} not to be a DataView",
        expectation: "toBeDataView",
        values: actualAndTypeOfMessageValues
    });
};
