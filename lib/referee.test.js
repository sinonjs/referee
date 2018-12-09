"use strict";

var referee = require("./referee");
var assert = require("assert");

describe("API", function() {
    describe(".add", function() {
        it("should be a binary Function named 'add'", function() {
            assert.equal(typeof referee.add, "function");
            assert.equal(referee.add.length, 2);
        });
    });

    describe(".assert", function() {
        it("should be a binary Function named 'assert'", function() {
            assert.equal(typeof referee.assert, "function");
            assert.equal(referee.assert.length, 2);
        });
    });

    describe(".refute", function() {
        it("should be a binary Function named 'refute'", function() {
            assert.equal(typeof referee.refute, "function");
            assert.equal(referee.refute.length, 2);
        });
    });

    describe(".expect", function() {
        it("should be a zero-arity Function named 'expect'", function() {
            assert.equal(typeof referee.expect, "function");
            assert.equal(referee.expect.length, 0);
        });
    });

    describe(".fail", function() {
        it("should be a binary Function named 'fail'", function() {
            assert.equal(typeof referee.fail, "function");
            assert.equal(referee.fail.length, 2);
        });
    });

    describe(".pass", function() {
        it("should be a unary Function named 'pass'", function() {
            assert.equal(typeof referee.pass, "function");
            assert.equal(referee.pass.length, 1);
        });
    });

    describe(".verifier", function() {
        it("should be a zero-arity Function named 'verifier'", function() {
            assert.equal(typeof referee.verifier, "function");
            assert.equal(referee.verifier.length, 0);
        });
    });

    // this prevents accidental expansions of the public API
    it("should only have expected properties", function() {
        var expectedProperties = JSON.stringify([
            "add",
            "assert",
            "bind",
            "captureException",
            "emit",
            "errback",
            "errbacks",
            "expect",
            "fail",
            "listeners",
            "off",
            "on",
            "once",
            "pass",
            "refute",
            "supervisors",
            "verifier"
        ]);
        var actualProperties = JSON.stringify(Object.keys(referee).sort());

        assert.equal(actualProperties, expectedProperties);
    });
});
