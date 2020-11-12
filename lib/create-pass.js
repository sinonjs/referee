"use strict";

function createPass(referee) {
  function pass(message) {
    referee.emit.apply(referee, message);
  }

  return pass;
}

module.exports = createPass;
