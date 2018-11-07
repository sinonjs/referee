"use strict";

var formatio = require("@sinonjs/formatio");

// Setup formatter the same way as Sinon does:
var formatter = formatio.configure({
    quoteStrings: false,
    limitChildrenCount: 250
});

function format(object) {
    return formatter.ascii(object);
}

module.exports = format;
