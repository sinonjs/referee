"use strict";

var interpolate = require("./interpolate");
var format = require("./format");
var reduce = require("@sinonjs/commons").prototypes.array.reduce;

function prepareMessage(message) {
    if (!message) {
        return "";
    }
    return message + (/[.:!?]$/.test(message) ? " " : ": ");
}

function interpolateProperties(referee, message, properties) {
    return reduce(
        Object.keys(properties),
        function(str, name) {
            var formattedValue =
                name === "customMessage"
                    ? prepareMessage(properties[name])
                    : format(properties[name]);
            return interpolate(str, name, formattedValue);
        },
        message || ""
    );
}

module.exports = interpolateProperties;
