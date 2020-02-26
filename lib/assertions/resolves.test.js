"use strict";

var assert = require("assert");
var sinon = require("sinon");

var factory = require("./resolves");

describe("resolves factory", function() {
    beforeEach(function() {
        this.fakeReferee = {
            add: sinon.fake()
        };

        factory(this.fakeReferee);

        this.options = this.fakeReferee.add.args[0][1];
    });

    it("calls referee.add with 'resolves' as name", function() {
        assert(this.fakeReferee.add.calledWith("resolves"));
    });

    describe(".assert", function() {
        it("returns a promise", function() {
            var result = this.options.assert(
                Promise.resolve("apple pie"),
                "apple pie"
            );

            assert(result instanceof Promise);

            return result;
        });

        context("when promise argument resolves to value argument", function() {
            it("should resolve the returned promise", function() {
                return this.options.assert(Promise.resolve("test"), "test");
            });
        });

        context(
            "when promise argument does not resolves to value argument",
            function() {
                it("should reject the returned promise", function() {
                    return this.options
                        .assert(Promise.resolve("test"), "test2")
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

        context("when promise argument does not resolve", function() {
            it("should reject the returned promise", function() {
                return this.options
                    .assert(Promise.reject(), "test")
                    .catch(function(e) {
                        assert(e instanceof Error);
                    });
            });
        });
    });

    describe(".refute", function() {
        it("returns a promise", function() {
            var result = this.options.refute(Promise.resolve("test"), "test2");

            assert(result instanceof Promise);

            return result;
        });

        context(
            "when promise argument does not resolve to value argument",
            function() {
                it("resolves the returned promise", function() {
                    return this.options.refute(
                        Promise.resolve("test"),
                        "test2"
                    );
                });
            }
        );

        context("when promise argument resolves to value argument", function() {
            it("rejects the returned promise", function() {
                return this.options
                    .refute(Promise.resolve("test"), "test")
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

        context("when promise argument does not resolve", function() {
            it("should reject the returned promise", function() {
                return this.options
                    .refute(Promise.reject(), "test")
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
        it("is 'toResolveWith'", function() {
            assert.equal(this.options.expectation, "toResolveWith");
        });
    });

    describe(".values", function() {
        it("does not define a values property", function() {
            assert.equal(this.options.values, undefined);
        });
    });
});
