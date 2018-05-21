"use strict";

var interpolate = require("./interpolate");
var reduce = Array.prototype.reduce;

function interpolateProperties(referee, message, properties) {
    return reduce.call(Object.keys(properties), function (str, name) {
        var formattedValue = name === "customMessage"
            ? referee.prepareMessage(properties[name])
            : referee.format(properties[name]);
        return interpolate(str, name, formattedValue);
    }, message || "");
}

module.exports = interpolateProperties;
