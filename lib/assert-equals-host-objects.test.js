"use strict";

var referee = require("../lib/referee");
var sinon = require("sinon");

if (typeof document === "undefined") {
    return;
}

describe("assert.equals host objects", function() {
    beforeEach(function() {
        sinon.spy(referee, "fail");
        this.okListener = sinon.spy();
        referee.on("pass", this.okListener);
        this.failListener = sinon.spy();
        referee.on("failure", this.failListener);
    });

    afterEach(function() {
        sinon.restore();
        referee.off();
        referee.count = 0;
        delete referee.throwOnFailure;
    });

    it("should pass when comparing DOM element to itself", function() {
        var element = document.createElement("div");

        referee.assert.equals(element, element);
    });

    it("should fail when comparing different DOM elements", function() {
        var div = document.createElement("div");
        var span = document.createElement("span");

        referee.assert.exception(function() {
            referee.assert.equals(div, span);
        });
    });
});
