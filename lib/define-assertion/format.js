"use strict";

const inspect = require("util").inspect;

/**
 * @param {unknown} object
 */
function format(object) {
  if (object instanceof Error) {
    return object.name;
  }

  const formatted = inspect(object);

  if (object instanceof ArrayBuffer || object instanceof DataView) {
    return formatted
      .replaceAll("[byteLength]:", "byteLength:")
      .replaceAll("[byteOffset]:", "byteOffset:")
      .replaceAll("[buffer]:", "buffer:");
  }

  return formatted;
}

module.exports = format;
