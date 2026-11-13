"use strict";

const expectImpl = require("./expect");

/**
 * @param {object} referee
 */
function createExpect(referee) {
  /**
   * @param {...unknown} args the actual value
   */
  function expect(...args) {
    expectImpl.init(referee);
    return expectImpl.apply(referee, args);
  }

  return expect;
}

module.exports = createExpect;
