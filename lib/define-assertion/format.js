"use strict";

var inspect = require("util").inspect;

/**
 * @param {unknown} object
 */
function format(object) {
  if (object instanceof Error) {
    return object.name;
  }

  var formatted = inspect(object);

  if (object instanceof ArrayBuffer || object instanceof DataView) {
    return formatted
      .replace(/\[byteLength\]:/g, "byteLength:")
      .replace(/\[byteOffset\]:/g, "byteOffset:")
      .replace(/\[buffer\]:/g, "buffer:");
  }

  return formatted;
}

module.exports = format;
