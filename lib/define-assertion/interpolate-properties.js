"use strict";

const hasOwnProperty =
  require("@sinonjs/commons").prototypes.object.hasOwnProperty;
const format = require("./format");

/**
 * @param {string} message
 */
function prepareMessage(message) {
  if (!message) {
    return "";
  }
  return message + (/[.:!?]$/.test(message) ? " " : ": ");
}

/**
 * @param {object} referee
 * @param {string} message
 * @param {Record<string, unknown>} properties
 */
function interpolateProperties(referee, message, properties) {
  return message.replaceAll(
    /\${(\.\.\.|!)?([a-z]+)}/gi,
    (match, prefix, name) => {
      if (!hasOwnProperty(properties, name)) {
        return match;
      }
      const value = properties[name];
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
    },
  );
}

module.exports = interpolateProperties;
