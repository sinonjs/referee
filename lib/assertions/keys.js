"use strict";

module.exports = function (referee) {
  /**
   * @param {Record<string, unknown>} object
   * @param {string[]} keys
   */
  function exactKeys(object, keys) {
    const keyMap = {};
    let keyCnt = 0;
    for (const key of keys) {
      keyMap[key] = true;
      keyCnt += 1;
    }
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        if (!keyMap[key]) {
          return false;
        }
        keyCnt -= 1;
      }
    }
    return keyCnt === 0;
  }

  referee.add("keys", {
    assert(actual, keys) {
      return exactKeys(actual, keys);
    },
    assertMessage:
      "${customMessage}Expected ${actualObject} to have exact keys ${expected}",
    refuteMessage:
      "${customMessage}Expected not to have exact keys ${expected}",
    expectation: "toHaveKeys",
    values(actual, keys, message) {
      return {
        actualObject: actual,
        actual: Object.keys(actual),
        expected: keys,
        customMessage: message,
      };
    },
  });
};
