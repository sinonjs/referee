"use strict";

var toString = Object.prototype.toString;

function actualForMatch(actual, match) {
    if (
        toString.call(actual) === "[object Object]" &&
        toString.call(match) === "[object Object]"
    ) {
        var copy = {};
        Object.keys(match).forEach(function(key) {
            copy[key] = actual[key];
        });
        return copy;
    }
    return actual;
}

module.exports = actualForMatch;
