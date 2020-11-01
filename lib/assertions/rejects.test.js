"use strict";

var assert = require("assert");
var sinon = require("sinon");
var samsam = require("@sinonjs/samsam");

var factory = require("./rejects");

describe("rejects factory", function() {
    beforeEach(function() {
        this.fakeReferee = {
            add: sinon.fake()
        };

        factory(this.fakeReferee);

        this.options = this.fakeReferee.add.args[0][1];
        this.options.fail = function(message) {
            throw new Error(message);
        };
    });

    function unexpectedThen() {
        throw new Error("Unexpected then");
    }

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

            it("should pass for equal object", function() {
                return this.options.assert(Promise.reject({ foo: 1 }), {
                    foo: 1
                });
            });

            it("should pass for matching matcher", function() {
                return this.options.assert(
                    Promise.reject({ foo: 1 }),
                    samsam.match.object
                );
            });
        });

        context(
            "when promise argument does not reject to value argument",
            function() {
                it("should reject the returned promise", function() {
                    var options = this.options;
                    return options
                        .assert(Promise.reject("test"), "test2")
                        .then(unexpectedThen)
                        .catch(function(e) {
                            assert(e instanceof Error);
                            assert.equal(e.message, options.assertMessage);
                        });
                });

                it("should fail for different object", function() {
                    var options = this.options;
                    return options
                        .assert(Promise.reject({ foo: 1 }), { foo: 2 })
                        .then(unexpectedThen)
                        .catch(function(e) {
                            assert(e instanceof Error);
                            assert.equal(e.message, options.assertMessage);
                        });
                });

                it("should fail for non-matching matcher", function() {
                    var promise = Promise.reject({ foo: 1 });
                    var options = this.options;
                    return options
                        .assert(promise, samsam.match.array)
                        .then(unexpectedThen)
                        .catch(function(e) {
                            assert(e instanceof Error);
                            assert.equal(e.message, options.assertMessage);
                        });
                });
            }
        );

        context("when promise argument is not a promise", function() {
            it("should reject the returned promise", function() {
                return this.options.assert({}, "test").catch(function(e) {
                    assert(e instanceof Error);
                    assert.equal(e.message, "promise.then is not a function");
                });
            });
        });

        context("when promise argument does not reject", function() {
            it("should reject the returned promise", function() {
                return this.options
                    .assert(Promise.resolve(), "test")
                    .catch(function(e) {
                        assert(e instanceof Error);
                        assert.equal(
                            e.message,
                            "${0} did not reject, it resolved instead"
                        );
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

                it("should pass for different object", function() {
                    return this.options.refute(Promise.reject({ foo: 1 }), {
                        foo: 2
                    });
                });

                it("should pass for non-matching matcher", function() {
                    return this.options.refute(
                        Promise.reject({ foo: 1 }),
                        samsam.match.array
                    );
                });
            }
        );

        context("when promise argument rejects to value argument", function() {
            it("should reject the returned promise", function() {
                var options = this.options;
                return options
                    .refute(Promise.reject("test"), "test")
                    .then(unexpectedThen)
                    .catch(function(e) {
                        assert(e instanceof Error);
                        assert.equal(e.message, options.refuteMessage);
                    });
            });

            it("should fail for equal object", function() {
                var options = this.options;
                return options
                    .refute(Promise.reject({ foo: 1 }), { foo: 1 })
                    .then(unexpectedThen)
                    .catch(function(e) {
                        assert(e instanceof Error);
                        assert.equal(e.message, options.refuteMessage);
                    });
            });

            it("should fail for matching matcher", function() {
                var promise = Promise.reject({ foo: 1 });
                var options = this.options;
                return options
                    .refute(promise, samsam.match.object)
                    .then(unexpectedThen)
                    .catch(function(e) {
                        assert(e instanceof Error);
                        assert.equal(e.message, options.refuteMessage);
                    });
            });
        });

        context("when promise argument is not a promise", function() {
            it("should reject the returned promise", function() {
                return this.options.refute({}, "test").catch(function(e) {
                    assert(e instanceof Error);
                    assert.equal(e.message, "promise.then is not a function");
                });
            });
        });

        context("when promise argument does not reject", function() {
            it("should reject the returned promise", function() {
                return this.options
                    .refute(Promise.resolve(), "test")
                    .catch(function(e) {
                        assert(e instanceof Error);
                        assert.equal(
                            e.message,
                            "${0} did not reject, it resolved instead"
                        );
                    });
            });
        });
    });

    describe(".assertMessage", function() {
        it("is '${actual} is not equal to ${expected}'", function() {
            assert.equal(
                this.options.assertMessage,
                "${actual} is not equal to ${expected}"
            );
        });
    });

    describe(".refuteMessage", function() {
        it("is '${actual} is equal to ${expected}'", function() {
            assert.equal(
                this.options.refuteMessage,
                "${actual} is equal to ${expected}"
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
