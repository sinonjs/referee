"use strict";

var assert = require("assert");
var proxyquire = require("proxyquire").noCallThru();
var sinon = require("sinon");

var captureArgs = require("../test-helper/capture-args");

describe("isURIError factory", function() {
    beforeEach(function() {
        this.fakeActualMessageValues = "2e88944c-d6a6-4925-8f74-bb9703f56a51";

        this.factory = proxyquire("./is-uri-error", {
            "../actual-message-values": this.fakeActualMessageValues
        });

        this.fakeReferee = {
            add: sinon.fake()
        };

        this.factory(this.fakeReferee);

        this.options = this.fakeReferee.add.args[0][1];
    });

    it("calls referee.add with 'isURIError' as name", function() {
        assert(this.fakeReferee.add.calledWith("isURIError"));
    });

    describe(".assert", function() {
        context("when called with a URIError instance", function() {
            it("returns true", function() {
                var result = this.options.assert(new URIError());

                assert.equal(result, true);
            });
        });

        context("when called with a non-URIError instance", function() {
            it("retunrns false", function() {
                var t = this;
                var nonURIErrorValues = [
                    [],
                    {},
                    "7b210c59-abb9-44b2-8c89-f6d3d5880d0f",
                    URIError,
                    new Error(),
                    new EvalError(),
                    new RangeError(),
                    new ReferenceError(),
                    new SyntaxError(),
                    new TypeError(),
                    captureArgs()
                ];

                nonURIErrorValues.forEach(function(value) {
                    assert.equal(t.options.assert(value), false);
                });
            });
        });
    });

    describe(".assertMessage", function() {
        it("is '${customMessage}Expected ${actual} to be a URIError'", function() {
            assert.equal(
                this.options.assertMessage,
                "${customMessage}Expected ${actual} to be a URIError"
            );
        });
    });

    describe(".refuteMessage", function() {
        it("is '${customMessage}Expected ${actual} not to be a URIError'", function() {
            assert.equal(
                this.options.refuteMessage,
                "${customMessage}Expected ${actual} not to be a URIError"
            );
        });
    });

    describe(".expectation", function() {
        it("is 'toBeURIError'", function() {
            assert.equal(this.options.expectation, "toBeURIError");
        });
    });

    describe(".values", function() {
        it("delegates to '../actual-message-values'", function() {
            assert.equal(this.options.values, this.fakeActualMessageValues);
        });
    });
});
