"use strict";

var assert = require("assert");
var proxyquire = require("proxyquire").noCallThru();
var sinon = require("sinon");

describe("less factory", function() {
    beforeEach(function() {
        this.fakeActualAndExpectedMessageValues =
            "bbedde65-07b1-451a-9ba1-afe28b07786d";

        this.factory = proxyquire("./less", {
            "../actual-and-expected-message-values": this
                .fakeActualAndExpectedMessageValues
        });

        this.fakeReferee = {
            add: sinon.fake()
        };

        this.factory(this.fakeReferee);

        this.options = this.fakeReferee.add.args[0][1];
    });

    it("calls referee.add with 'less' as name", function() {
        assert(this.fakeReferee.add.calledWith("less"));
    });

    describe(".assert", function() {
        context("when less than", function() {
            it("returns true", function() {
                assert(this.options.assert(1, 2));
            });
        });

        context("when greater than", function() {
            it("returns false", function() {
                assert.equal(this.options.assert(2, 1), false);
            });
        });

        context("when equal", function() {
            it("returns false", function() {
                assert.equal(this.options.assert(2, 2), false);
            });
        });
    });

    describe(".assertMessage", function() {
        it("is '${customMessage}Expected ${actual} to be less than ${expected}'", function() {
            assert.equal(
                this.options.assertMessage,
                "${customMessage}Expected ${actual} to be less than ${expected}"
            );
        });
    });

    describe(".refuteMessage", function() {
        it("is '${customMessage}Expected ${actual} to be greater than or equal to ${expected}'", function() {
            assert.equal(
                this.options.refuteMessage,
                "${customMessage}Expected ${actual} to be greater than or equal to ${expected}"
            );
        });
    });

    describe(".expectation", function() {
        it("is 'toBeLessThan'", function() {
            assert.equal(this.options.expectation, "toBeLessThan");
        });
    });

    describe(".values", function() {
        it("delegates to '../actual-and-expected-message-values'", function() {
            assert.equal(this.options.values, this.fakeActualAndExpectedMessageValues);
        });
    });
});
