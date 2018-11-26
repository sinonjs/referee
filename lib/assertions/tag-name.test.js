"use strict";

var assert = require("assert");
var referee = require("../referee");

describe("tagName", function() {
    it("should pass for matching tag names", function() {
        referee.assert.tagName({ tagName: "li" }, "li");
    });

    it("should pass for case-insensitive matching tag names", function() {
        referee.assert.tagName({ tagName: "LI" }, "li");
    });

    it("should pass for case-insensitive matching tag names #2", function() {
        referee.assert.tagName({ tagName: "li" }, "LI");
    });

    if (typeof document !== "undefined") {
        it("should pass for DOM elements", function() {
            referee.assert.tagName(document.createElement("li"), "li");
        });
    }

    it("should pass for uppercase matching tag names", function() {
        referee.assert.tagName({ tagName: "LI" }, "LI");
    });

    it("should fail if no tag name is passed", function() {
        assert.throws(
            function() {
                referee.assert.tagName({}, "LI");
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.tagName] Expected {  } to have tagName property"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.tagName");
                return true;
            }
        );
    });

    it("should fail for non-matching tag names", function() {
        assert.throws(
            function() {
                referee.assert.tagName({ tagName: "li" }, "p");
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.tagName] Expected tagName to be p but was li"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.tagName");
                return true;
            }
        );
    });

    it("should fail for substring matches in tag names", function() {
        assert.throws(
            function() {
                referee.assert.tagName({ tagName: "li" }, "i");
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.tagName] Expected tagName to be i but was li"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.tagName");
                return true;
            }
        );
    });
});
