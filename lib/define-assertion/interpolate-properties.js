"use strict";

var hasOwnProperty =
  require("@sinonjs/commons").prototypes.object.hasOwnProperty;
var format = require("./format");

function prepareMessage(message) {
  if (!message) {
    return "";
  }
  return message + (/[.:!?]$/.test(message) ? " " : ": ");
}

function interpolateProperties(referee, message, properties) {
  return message.replace(
    /\${(\.\.\.|!)?([a-z]+)}/gi,
    function (match, prefix, name) {
      if (!hasOwnProperty(properties, name)) {
        return match;
      }
      var value = properties[name];
      if (prefix === "!") {
        return value;
      }
      if (prefix === "..." && Array.isArray(value)) {
        return value.map(format).join(", ");
      }
      if (name === "customMessage") {
        return prepareMessage(value);
      }
      return format(value);
    }
  );
}

module.exports = interpolateProperties;
