"use strict";

/**
 * @param {{emit: (...args: unknown[]) => void}} referee
 */
function createPass(referee) {
  /**
   * @param {unknown[]} args
   */
  function pass(args) {
    referee.emit.apply(referee, args);
  }

  return pass;
}

module.exports = createPass;
