"use strict";

module.exports = function getArrayLike() {
    return {
        length: 4,
        "0": "One",
        "1": "Two",
        "2": "Three",
        "3": "Four",
        splice: function() {}
    };
};
