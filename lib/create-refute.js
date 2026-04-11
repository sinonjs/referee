"use strict";

var assertArgNum = require("./assert-arg-num");

/**
 * @param {{emit: (eventName: string, ...args: unknown[]) => void, fail: (message: string) => never}} referee
 */
function createRefute(referee) {
  /**
   * @param {unknown} actual
   * @param {string} message
   */
  function refute(actual, message) {
    assertArgNum(referee.fail, "refute", arguments, 1);

    if (actual) {
      referee.fail(
        message || `[refute] Expected ${String(actual)} to be falsy`,
      );
      return;
    }

    referee.emit("pass", "refute", message || "", actual);
  }

  refute.toString = function () {
    return "referee.refute()";
  };

  return refute;
}

module.exports = createRefute;
