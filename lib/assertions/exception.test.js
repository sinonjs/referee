"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "exception", function(pass, fail, msg) {
    pass("when callback throws", function() {
        throw new Error();
    });
    fail("when callback does not throw", function() {});

    msg(
        "fail with message",
        "[assert.exception] Expected exception",
        function() {}
    );

    pass(
        "when callback throws expected name",
        function() {
            throw new TypeError("Oh hmm");
        },
        { name: "TypeError" }
    );

    fail(
        "when callback does not throw expected name",
        function() {
            throw new Error();
        },
        { name: "TypeError" }
    );

    fail(
        "when thrown message does not match",
        function() {
            throw new Error("Aright");
        },
        { message: "Aww" }
    );

    pass(
        "when message and type matches",
        function() {
            throw new TypeError("Aright");
        },
        { name: "Type", message: "Ar" }
    );

    fail(
        "when callback does not throw and specific type is expected",
        function() {},
        { name: "TypeError" }
    );

    msg(
        "fail with message when not throwing",
        '[assert.exception] Expected { name: "TypeError" } but no exception was thrown',
        function() {},
        { name: "TypeError" }
    );

    msg(
        "fail with custom message",
        "[assert.exception] Hmm: Expected exception",
        function() {},
        "Hmm"
    );

    msg(
        "fail with matcher and custom message",
        '[assert.exception] Hmm: Expected { name: "TypeError" } but no exception was thrown',
        function() {},
        { name: "TypeError" },
        "Hmm"
    );

    pass(
        "when matcher function returns true",
        function() {
            throw new TypeError("Aright");
        },
        function(err) {
            return err.name === "TypeError";
        }
    );

    fail(
        "when matcher function returns truthy",
        function() {
            throw new TypeError("Aright");
        },
        function(err) {
            return err.name;
        }
    );

    fail(
        "when matcher function returns false",
        function() {
            throw new TypeError("Aright");
        },
        function(err) {
            return err.name === "Error";
        }
    );

    msg(
        "when matcher function fails",
        "[assert.exception] Expected thrown TypeError (Aright) to pass matcher function",
        function() {
            throw new TypeError("Aright");
        },
        function(err) {
            return err.name === "Error";
        }
    );

    msg(
        "if not passed arguments",
        "[assert.exception] Expected to receive at least 1 argument(s)"
    );

    pass(
        "when matcher regexp matches",
        function() {
            throw new TypeError("Aright");
        },
        /right/
    );

    fail(
        "when matcher regexp does not match",
        function() {
            throw new TypeError("Aright");
        },
        /nope/
    );

    function Matcher() {
        this.name = "TypeError";
    }
    Matcher.prototype.message = "Nope";
    pass(
        "when non own property of object does not match",
        function() {
            throw new TypeError("Aright");
        },
        new Matcher()
    );
});

testHelper.assertionTests("refute", "exception", function(pass, fail, msg) {
    fail("when callback throws", function() {
        throw new Error("Yo, Malcolm");
    });

    pass("when callback does not throw", function() {});
    pass("with message when callback does not throw", function() {}, "Oh noes");

    msg(
        "fail with message",
        "[refute.exception] Expected not to throw but threw Error (:()",
        function() {
            throw new Error(":(");
        }
    );

    msg(
        "fail with custom message",
        "[refute.exception] Jeez: Expected not to throw but threw Error (:()",
        function() {
            throw new Error(":(");
        },
        "Jeez"
    );

    msg(
        "fail if not passed arguments",
        "[refute.exception] Expected to receive at least 1 argument(s)"
    );
});
