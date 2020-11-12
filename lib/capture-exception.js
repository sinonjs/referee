"use strict";

function captureException(callback) {
  try {
    callback();
  } catch (e) {
    return e;
  }
  return null;
}

module.exports = captureException;
