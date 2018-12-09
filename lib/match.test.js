"use strict";

var assert = require("assert");
var samsam = require("@sinonjs/samsam");
var referee = require("./referee");

describe("match", function() {
    it("should be createMatcher from @sinonjs/samsam", function() {
        assert.strictEqual(referee.match, samsam.createMatcher);
    });

    context("with assert.equals", function() {
        it("should pass match.string in object", function() {
            var object = { foo: 1, bar: "test" };

            referee.assert.equals(object, {
                foo: 1,
                bar: referee.match.string
            });
        });

        it("should fail match.string in object", function() {
            var object = { foo: 1, bar: true };

            assert.throws(
                function() {
                    referee.assert.equals(object, {
                        foo: 1,
                        bar: referee.match.string
                    });
                },
                function(error) {
                    assert.equal(error.code, "ERR_ASSERTION");
                    assert.equal(
                        error.message,
                        '[assert.equals] { bar: true, foo: 1 } expected to be equal to { bar: typeOf("string"), foo: 1 }'
                    );
                    assert.equal(error.name, "AssertionError");
                    assert.equal(error.operator, "assert.equals");
                    return true;
                }
            );
        });
    });

    context("with refute.equals", function() {
        it("should pass match.string in object", function() {
            var object = { foo: 1, bar: true };

            referee.refute.equals(object, {
                foo: 1,
                bar: referee.match.string
            });
        });

        it("should fail match.string in object", function() {
            var object = { foo: 1, bar: "test" };

            assert.throws(
                function() {
                    referee.refute.equals(object, {
                        foo: 1,
                        bar: referee.match.string
                    });
                },
                function(error) {
                    assert.equal(error.code, "ERR_ASSERTION");
                    assert.equal(
                        error.message,
                        '[refute.equals] { bar: "test", foo: 1 } expected not to be equal to { bar: typeOf("string"), foo: 1 }'
                    );
                    assert.equal(error.name, "AssertionError");
                    assert.equal(error.operator, "refute.equals");
                    return true;
                }
            );
        });
    });
});
