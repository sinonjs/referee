"use strict";

var assert = require("assert");
var format = require("./format");
var referee = require("./referee");

describe("getFormatter", function() {
    it("should return the format function", function() {
        assert.strictEqual(referee.getFormatter(), format);
    });
});
