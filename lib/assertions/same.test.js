"use strict";

var assert = require("assert");
var proxyquire = require("proxyquire").noCallThru();
var sinon = require("sinon");

var obj = { id: 42 };
var obj2 = { id: 42 };

describe("same factory", function() {
    beforeEach(function() {
        this.fakeActualAndExpectedMessageValues =
            "866c5b01-0028-4cf2-8dd7-9ef99bbc53b0";

        var factory = proxyquire("./same", {
            "../actual-and-expected-message-values": this
                .fakeActualAndExpectedMessageValues
        });

        this.fakeReferee = {
            add: sinon.fake()
        };

        factory(this.fakeReferee);

        this.options = this.fakeReferee.add.args[0][1];
    });

    it("calls referee.add with 'same' as name", function() {
        assert(this.fakeReferee.add.calledWith("same"));
    });

    describe(".assert", function() {
        context("when comparing object to itself", function() {
            it("returns true", function() {
                assert(this.options.assert(obj, obj));
            });
        });

        context("when comparing strings", function() {
            it("returns true", function() {
                assert(this.options.assert("Hey", "Hey"));
            });
        });

        context("when comparing booleans", function() {
            it("returns true", function() {
                assert(this.options.assert(true, true));
                assert(this.options.assert(false, false));
            });
        });

        context("when comparing Infinity", function() {
            it("returns true", function() {
                assert(this.options.assert(Infinity, Infinity));
            });
        });

        context("when comparing numbers", function() {
            it("returns true", function() {
                assert(this.options.assert(32, 32));
            });
        });

        context("when comparing null with null", function() {
            it("returns true", function() {
                assert(this.options.assert(null, null));
            });
        });

        context("when comparing undefined with undefined", function() {
            it("returns true", function() {
                assert(this.options.assert(undefined, undefined));
            });
        });

        context("when comparing NaN with NaN", function() {
            it("returns true", function() {
                assert(this.options.assert(NaN, NaN));
            });
        });

        context("when comparing different objects", function() {
            it("returns false", function() {
                assert.equal(this.options.assert(obj, obj2), false);
            });
        });

        context("when comparing without coercion", function() {
            it("returns false", function() {
                assert.equal(this.options.assert(666, "666"), false);
                assert.equal(this.options.assert("666", 666), false);
            });
        });

        context("when comparing -0 to +0", function() {
            it("returns false", function() {
                assert.equal(this.options.assert(-0, +0), false);
            });
        });
    });

    describe(".assertMessage", function() {
        it("is '${customMessage}${actual} expected to be the same object as ${expected}'", function() {
            assert.equal(
                this.options.assertMessage,
                "${customMessage}${actual} expected to be the same object as ${expected}"
            );
        });
    });

    describe(".refuteMessage", function() {
        it("is '${customMessage}${actual} expected not to be the same object as ${expected}'", function() {
            assert.equal(
                this.options.refuteMessage,
                "${customMessage}${actual} expected not to be the same object as ${expected}"
            );
        });
    });

    describe(".expectation", function() {
        it("is 'toBe'", function() {
            assert.equal(this.options.expectation, "toBe");
        });
    });

    describe(".values", function() {
        it("delegates to '../actual-and-expected-message-values'", function() {
            assert.equal(this.options.values, this.fakeActualAndExpectedMessageValues);
        });
    });
});
