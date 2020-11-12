"use strict";

var noTagNameMessage =
  "${customMessage}Expected ${actualElement} to have tagName property";

module.exports = function (referee) {
  referee.add("tagName", {
    assert: function (element, tagName) {
      // Uses arguments[2] because the function's .length is used to
      // determine the minimum required number of arguments.
      if (!element.tagName) {
        return this.fail(noTagNameMessage);
      }

      return (
        tagName.toLowerCase &&
        tagName.toLowerCase() === element.tagName.toLowerCase()
      );
    },
    assertMessage:
      "${customMessage}Expected tagName to be ${expected} but was ${actual}",
    refuteMessage: "${customMessage}Expected tagName not to be ${actual}",
    expectation: "toHaveTagName",
    values: function (element, tagName, message) {
      return {
        actualElement: element,
        actual: element.tagName,
        expected: tagName,
        customMessage: message,
      };
    },
  });
};
