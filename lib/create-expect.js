"use strict";

var expectImpl = require("./expect");

function createExpect(referee) {
  function expect() {
    expectImpl.init(referee);
    return expectImpl.apply(referee, arguments);
  }

  return expect;
}

module.exports = createExpect;
