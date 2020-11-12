"use strict";

module.exports = function (referee) {
  function exactKeys(object, keys) {
    var keyMap = {};
    var keyCnt = 0;
    for (var i = 0; i < keys.length; i++) {
      keyMap[keys[i]] = true;
      keyCnt += 1;
    }
    for (var key in object) {
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
    assert: function (actual, keys) {
      return exactKeys(actual, keys);
    },
    assertMessage:
      "${customMessage}Expected ${actualObject} to have exact keys ${expected}",
    refuteMessage:
      "${customMessage}Expected not to have exact keys ${expected}",
    expectation: "toHaveKeys",
    values: function (actual, keys, message) {
      return {
        actualObject: actual,
        actual: Object.keys(actual),
        expected: keys,
        customMessage: message,
      };
    },
  });
};
