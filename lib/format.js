"use strict";

var formatio = require("@sinonjs/formatio");

// Setup formatter the same way as Sinon does:
var formatter = formatio.configure({
    quoteStrings: false,
    limitChildrenCount: 250
});

var customFormatter;

function format() {
    if (customFormatter) {
        return customFormatter.apply(null, arguments);
    }

    return formatter.ascii.apply(formatter, arguments);
}

format.setFormatter = function(aCustomFormatter) {
    if (typeof aCustomFormatter !== "function") {
        throw new Error("format.setFormatter must be called with a function");
    }

    customFormatter = aCustomFormatter;
};

format.reset = function() {
    customFormatter = null;
};

module.exports = format;
