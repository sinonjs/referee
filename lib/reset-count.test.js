"use strict";

var assert = require("assert");
var referee = require("./referee");

describe("resetCount", function() {
    it("should reset referee.count to zero", function() {
        referee.assert(true);
        assert.equal(referee.count, 1);

        referee.resetCount();
        assert.equal(referee.count, 0);
    });
});
