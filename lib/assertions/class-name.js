"use strict";

var noClassNameMessage =
  "${customMessage}Expected object to have className property";

module.exports = function (referee) {
  referee.add("className", {
    assert: function (element, name) {
      if (typeof element.className === "undefined") {
        return this.fail(noClassNameMessage);
      }

      var expected = typeof name === "string" ? name.split(" ") : name;
      var actual = element.className.split(" ");
      var i, l;
      for (i = 0, l = expected.length; i < l; i++) {
        if (!actual.includes(expected[i])) {
          return false;
        }
      }

      return true;
    },
    assertMessage:
      "${customMessage}Expected object's className to include ${expected} " +
      "but was ${actual}",
    refuteMessage:
      "${customMessage}Expected object's className not to include ${expected}",
    expectation: "toHaveClassName",
    values: function (element, className, message) {
      return {
        actualElement: element,
        actual: element.className,
        expected: className,
        customMessage: message,
      };
    },
  });
};
