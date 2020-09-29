"use strict";

var assert = require("assert");
var sinon = require("sinon");

var factory = require("./rejects");

describe("rejects factory", function() {
    beforeEach(function() {
        this.fakeReferee = {
            add: sinon.fake()
        };

        factory(this.fakeReferee);

        this.options = this.fakeReferee.add.args[0][1];
    });

    it("calls referee.add with 'rejects' as name", function() {
        assert(this.fakeReferee.add.calledWith("rejects"));
    });

    describe(".assert", function() {
        it("should return a promise", function() {
            var result = this.options.assert(Promise.reject("test"), "test");

            assert(result instanceof Promise);

            return result;
        });

        context("when promise argument rejects to value argument", function() {
            it("should resolve the returned promise", function() {
                return this.options.assert(Promise.reject("test"), "test");
            });
        });

        context(
            "when promise argument does not reject to value argument",
            function() {
                it("should reject the returned promise", function() {
                    return this.options
                        .assert(Promise.reject("test"), "test2")
                        .catch(function(e) {
                            assert(e instanceof Error);
                        });
                });
            }
        );

        context("when promise argument is not a promise", function() {
            it("should reject the returned promise", function() {
                return this.options.assert({}, "test").catch(function(e) {
                    assert(e instanceof Error);
                });
            });
        });

        context("when promise argument does not reject", function() {
            it("should reject the returned promise", function() {
                return this.options
                    .assert(Promise.resolve(), "test")
                    .catch(function(e) {
                        assert(e instanceof Error);
                    });
            });
        });
    });

    describe(".refute", function() {
        it("should return a promise", function() {
            var result = this.options.refute(Promise.reject("test"), "test2");

            assert(result instanceof Promise);

            return result;
        });

        context(
            "when promise argument does not rejects to value argument",
            function() {
                it("should resolve the returned promise", function() {
                    return this.options.refute(Promise.reject("test"), "test2");
                });
            }
        );

        context("when promise argument rejects to value argument", function() {
            it("should reject the returned promise", function() {
                return this.options
                    .refute(Promise.reject("test"), "test")
                    .catch(function(e) {
                        assert(e instanceof Error);
                    });
            });
        });

        context("when promise argument is not a promise", function() {
            it("should reject the returned promise", function() {
                return this.options.refute({}, "test").catch(function(e) {
                    assert(e instanceof Error);
                });
            });
        });

        context("when promise argument does not reject", function() {
            it("should reject the returned promise", function() {
                return this.options
                    .refute(Promise.resolve(), "test")
                    .catch(function(e) {
                        assert(e instanceof Error);
                    });
            });
        });
    });

    describe(".assertMessage", function() {
        it("is '${actual} is not identical to ${expected}'", function() {
            assert.equal(
                this.options.assertMessage,
                "${actual} is not identical to ${expected}"
            );
        });
    });

    describe(".refuteMessage", function() {
        it("is '${actual} is identical to ${expected}'", function() {
            assert.equal(
                this.options.refuteMessage,
                "${actual} is identical to ${expected}"
            );
        });
    });

    describe(".expectation", function() {
        it("is 'toRejectWith'", function() {
            assert.equal(this.options.expectation, "toRejectWith");
        });
    });

    describe(".values", function() {
        it("does not define a values property", function() {
            assert.equal(this.options.values, undefined);
        });
    });
});
