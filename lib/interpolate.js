"use strict";

function interpolate(string, prop, value) {
    return string.replace(new RegExp("\\$\\{" + prop + "\\}", "g"), value);
}

module.exports = interpolate;
