"use strict";

const assert = require("assert");
const samsam = require("@sinonjs/samsam");
const referee = require("./referee");

describe("equals", function () {
  it("should be deepEqual from @sinonjs/samsam", function () {
    assert.strictEqual(referee.equals, samsam.deepEqual);
  });
});
