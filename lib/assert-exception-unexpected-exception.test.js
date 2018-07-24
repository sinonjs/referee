"use strict";

var referee = require("./referee");

describe("assert.exception unexpected exception", function() {
    it("fails with custom message", function() {
        try {
            referee.assert.exception(
                function() {
                    throw new Error(":(");
                },
                { name: "TypeError" },
                "Wow"
            );
            throw new Error("Expected to throw");
        } catch (e) {
            referee.assert.match(
                e.message,
                "[assert.exception] Wow: Expected " +
                    "[object Object] but threw Error " +
                    "(:()\nError: :(\n"
            );
        }
    });

    it("fails with custom message when message is wrong", function() {
        try {
            referee.assert.exception(
                function() {
                    throw new Error(":(");
                },
                { name: "Error", message: "Aww" },
                "Wow"
            );
            throw new Error("Expected to throw");
        } catch (e) {
            referee.assert.match(
                e.message,
                "[assert.exception] Wow: Expected " +
                    "[object Object] but threw " +
                    "Error (:()\nError: :(\n"
            );
        }
    });
});
