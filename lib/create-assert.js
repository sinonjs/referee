"use strict";

var assertArgNum = require("./assert-arg-num");

function createAssert(referee) {
  function assert(actual, message) {
    assertArgNum(referee.fail, "assert", arguments, 1);

    if (!actual) {
      referee.fail(
        message || `[assert] Expected ${String(actual)} to be truthy`
      );
      return;
    }

    referee.emit("pass", "assert", message || "", actual);
  }

  assert.toString = function () {
    return "referee.assert()";
  };

  return assert;
}

module.exports = createAssert;
