"use strict";

var inspect = require("util").inspect;

function format(object) {
  if (object instanceof Error) {
    return object.name;
  }

  return inspect(object);
}

module.exports = format;
