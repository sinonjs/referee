"use strict";

var referee = require("../lib/referee");
var testHelper = require("./test-helper");
var sinon = require("sinon");
var sandbox = sinon.sandbox.create();

var expect = referee.expect;
var refute = referee.refute;

if (typeof document === "undefined") {
    return;
}

describe("assert.equals host objects", function() {
    beforeEach(function () {
        sandbox.spy(referee, "fail");

        referee.format = sandbox.spy(function (object) {
            return String(object);
        });

        this.okListener = sandbox.spy();
        referee.on("pass", this.okListener);
        this.failListener = sandbox.spy();
        referee.on("failure", this.failListener);
    });

    afterEach(function () {
        sandbox.restore();
        delete referee.listeners;
        referee.count = 0;
        delete referee.throwOnFailure;
    });

    it("should pass when comparing DOM element to itself", function () {
        var element = document.createElement("div");

        referee.assert.equals(element, element);
    });

    it("should fail when comparing different DOM elements", function () {
        var div = document.createElement("div");
        var span = document.createElement("span");

        referee.assert.exception(function () {
            referee.assert.equals(div, span);
        });
    });
});
