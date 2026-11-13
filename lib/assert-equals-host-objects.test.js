"use strict";

const referee = require("../lib/referee");
const sinon = require("sinon");

if (typeof document === "undefined") {
  return;
}

describe("assert.equals host objects", function () {
  beforeEach(function () {
    sinon.spy(referee, "fail");
    this.okListener = sinon.spy();
    referee.on("pass", this.okListener);
    this.failListener = sinon.spy();
    referee.on("failure", this.failListener);
  });

  afterEach(function () {
    sinon.restore();
    referee.removeAllListeners();
    referee.count = 0;
    delete referee.throwOnFailure;
  });

  it("should pass when comparing DOM element to itself", function () {
    const element = document.createElement("div");

    referee.assert.equals(element, element);
  });

  it("should fail when comparing different DOM elements", function () {
    const div = document.createElement("div");
    const span = document.createElement("span");

    referee.assert.exception(() => {
      referee.assert.equals(div, span);
    });
  });
});
