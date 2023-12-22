"use strict";

var referee = require("./referee");

describe("assert.exception unexpected exception", function () {
  it("fails with custom message", function () {
    try {
      referee.assert.exception(
        function () {
          throw new Error("apple pie");
        },
        { name: "TypeError" },
        "Wow",
      );
      throw new Error("Expected to throw");
    } catch (e) {
      referee.assert.match(
        e.message,
        "Wow: Expected { name: 'TypeError' } but threw 'Error' ('apple pie')",
      );
    }
  });

  it("fails with custom message when message is wrong", function () {
    try {
      referee.assert.exception(
        function () {
          throw new Error("apple pie");
        },
        { name: "Error", message: "Aww" },
        "Wow",
      );
      throw new Error("Expected to throw");
    } catch (e) {
      referee.assert.match(
        e.message,
        "Wow: Expected { name: 'Error', message: 'Aww' } but threw 'Error' ('apple pie')",
      );
    }
  });
});
