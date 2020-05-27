"use strict";

var assert = require("assert");
var samsam = require("@sinonjs/samsam");
var referee = require("./referee");

describe("equals", function() {
    it("should be deepEqual from @sinonjs/samsam", function() {
        assert.strictEqual(referee.equals, samsam.deepEqual);
    });
});
