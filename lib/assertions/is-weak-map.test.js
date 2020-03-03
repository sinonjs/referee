/* eslint-disable ie11/no-weak-collections */
"use strict";

var assert = require("assert");
var proxyquire = require("proxyquire").noCallThru();
var sinon = require("sinon");

describe("isWeakMap factory", function() {
    before(function() {
        if (typeof WeakMap === "undefined") {
            this.skip();
        }
    });

    beforeEach(function() {
        this.fakeActualMessageValues = "b7da1d7b-a90a-43ba-854e-199e11151437";

        this.factory = proxyquire("./is-weak-map", {
            "../actual-message-values": this.fakeActualMessageValues
        });

        this.fakeReferee = {
            add: sinon.fake()
        };

        this.factory(this.fakeReferee);

        this.options = this.fakeReferee.add.args[0][1];
    });

    it("calls referee.add with 'isWeakMap' as name", function() {
        assert(this.fakeReferee.add.calledWith("isWeakMap"));
    });

    describe(".assert", function() {
        context("when called with a WeakMap instance", function() {
            it("returns true", function() {
                var result = this.options.assert(new WeakMap());

                assert.equal(result, true);
            });
        });

        context("when called with a non-WeakMap instance", function() {
            it("retunrns false", function() {
                var t = this;
                var nonWeakSetValues = [
                    [],
                    {},
                    Set,
                    WeakSet,
                    new WeakSet(),
                    new Set(),
                    new Map()
                ];

                nonWeakSetValues.forEach(function(value) {
                    assert.equal(t.options.assert(value), false);
                });
            });
        });
    });

    describe(".assertMessage", function() {
        it("is '${customMessage}Expected ${actual} to be a WeakMap'", function() {
            assert.equal(
                this.options.assertMessage,
                "${customMessage}Expected ${actual} to be a WeakMap"
            );
        });
    });

    describe(".refuteMessage", function() {
        it("is '${customMessage}Expected ${actual} not to be a WeakMap'", function() {
            assert.equal(
                this.options.refuteMessage,
                "${customMessage}Expected ${actual} not to be a WeakMap"
            );
        });
    });

    describe(".expectation", function() {
        it("is 'toBeWeakMap'", function() {
            assert.equal(this.options.expectation, "toBeWeakMap");
        });
    });

    describe(".values", function() {
        it("delegates to '../actual-message-values'", function() {
            assert.equal(this.options.values, this.fakeActualMessageValues);
        });
    });
});
