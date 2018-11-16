"use strict";

var referee = require("../referee");

describe("assert.resolves", function() {
    it("should return a promise", function() {
        var assertion = referee.assert.resolves(
            Promise.resolve("test"),
            "test"
        );
        referee.assert.isPromise(assertion);
    });

    context("when promise argument resolves to value argument", function() {
        it("should resolve the returned promise", function() {
            return referee.assert.resolves(Promise.resolve("test"), "test");
        });
    });

    context(
        "when promise argument does not resolves to value argument",
        function() {
            it("should reject the returned promise", function() {
                return referee.assert
                    .resolves(Promise.resolve("test"), "test2")
                    .catch(function(e) {
                        referee.assert.isError(e);
                    });
            });
        }
    );

    context("when promise argument is not a promise", function() {
        it("should reject the returned promise", function() {
            return referee.assert.resolves({}, "test").catch(function(e) {
                referee.assert.isError(e);
            });
        });
    });

    context("when promise argument does not resolve", function() {
        it("should reject the returned promise", function() {
            return referee.assert
                .resolves(Promise.reject(), "test")
                .catch(function(e) {
                    referee.assert.isError(e);
                });
        });
    });
});

describe("refute.resolves", function() {
    it("should return a promise", function() {
        var refutation = referee.refute.resolves(
            Promise.resolve("test"),
            "test"
        );
        referee.assert.isPromise(refutation);
    });

    context(
        "when promise argument does not resolve to value argument",
        function() {
            it("should resolve the returned promise", function() {
                return referee.refute.resolves(
                    Promise.resolve("test"),
                    "test2"
                );
            });
        }
    );

    context("when promise argument resolves to value argument", function() {
        it("should reject the returned promise", function() {
            return referee.refute
                .resolves(Promise.resolve("test"), "test")
                .catch(function(e) {
                    referee.assert.isError(e);
                });
        });
    });

    context("when promise argument is not a promise", function() {
        it("should reject the returned promise", function() {
            return referee.refute.resolves({}, "test").catch(function(e) {
                referee.assert.isError(e);
            });
        });
    });

    context("when promise argument does not resolve", function() {
        it("should reject the returned promise", function() {
            return referee.refute
                .resolves(Promise.reject(), "test")
                .catch(function(e) {
                    referee.assert.isError(e);
                });
        });
    });
});
