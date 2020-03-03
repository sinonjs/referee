/* eslint-disable ie11/no-weak-collections */
"use strict";

var assert = require("assert");
var proxyquire = require("proxyquire").noCallThru();
var sinon = require("sinon");

describe("isWeakSet factory", function() {
    before(function() {
        if (typeof WeakSet === "undefined") {
            this.skip();
        }
    });

    beforeEach(function() {
        this.fakeActualMessageValues = "f9f4851c-7a48-4712-ae23-a2502d8ee159";

        this.factory = proxyquire("./is-weak-set", {
            "../actual-message-values": this.fakeActualMessageValues
        });

        this.fakeReferee = {
            add: sinon.fake()
        };

        this.factory(this.fakeReferee);

        this.options = this.fakeReferee.add.args[0][1];
    });

    it("calls referee.add with 'isWeakSet' as name", function() {
        assert(this.fakeReferee.add.calledWith("isWeakSet"));
    });

    describe(".assert", function() {
        context("when called with a WeakSet instance", function() {
            it("returns true", function() {
                var result = this.options.assert(new WeakSet());

                assert.equal(result, true);
            });
        });

        context("when called with a non-WeakSet instance", function() {
            it("retunrns false", function() {
                var t = this;
                var nonWeakSetValues = [
                    [],
                    {},
                    Set,
                    WeakSet,
                    new WeakMap(),
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
        it("is '${customMessage}Expected ${actual} to be a WeakSet'", function() {
            assert.equal(
                this.options.assertMessage,
                "${customMessage}Expected ${actual} to be a WeakSet"
            );
        });
    });

    describe(".refuteMessage", function() {
        it("is '${customMessage}Expected ${actual} not to be a WeakSet'", function() {
            assert.equal(
                this.options.refuteMessage,
                "${customMessage}Expected ${actual} not to be a WeakSet"
            );
        });
    });

    describe(".expectation", function() {
        it("is 'toBeWeakSet'", function() {
            assert.equal(this.options.expectation, "toBeWeakSet");
        });
    });

    describe(".values", function() {
        it("delegates to '../actual-message-values'", function() {
            assert.equal(this.options.values, this.fakeActualMessageValues);
        });
    });
});
