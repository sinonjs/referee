"use strict";

var hasOwnProperty = require("@sinonjs/commons").prototypes.object
    .hasOwnProperty;
var format = require("./format");

function prepareMessage(message) {
    if (!message) {
        return "";
    }
    return message + (/[.:!?]$/.test(message) ? " " : ": ");
}

function interpolateProperties(referee, message, properties) {
    return message.replace(/\${?([a-z]+)}/gi, function (match, name) {
        if (!hasOwnProperty(properties, name)) {
            return match;
        }
        var value = properties[name];
        if (name === 'customMessage') {
            return prepareMessage(value);
        }
        return format(value);
    });
}

module.exports = interpolateProperties;
