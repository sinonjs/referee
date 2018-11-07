"use strict";

var samsam = require("@sinonjs/samsam");
var format = require("./format");

module.exports = function match(actual, matcher) {
    try {
        return samsam.match(actual, matcher);
    } catch (e) {
        throw new Error(
            "Matcher (" +
                format(matcher) +
                ") was not a string, a number, a function, " +
                "a boolean or an object"
        );
    }
};
