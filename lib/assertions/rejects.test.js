"use strict";

var referee = require("../referee");

describe("assert.rejects", function() {
    it("should return a promise", function() {
        var assertion = referee.assert.rejects(Promise.reject("test"), "test");
        referee.assert.isPromise(assertion);
    });

    context("when promise argument rejects to value argument", function() {
        it("should resolve the returned promise", function() {
            return referee.assert.rejects(Promise.reject("test"), "test");
        });
    });

    context(
        "when promise argument does not reject to value argument",
        function() {
            it("should reject the returned promise", function() {
                return referee.assert
                    .rejects(Promise.reject("test"), "test2")
                    .catch(function(e) {
                        referee.assert.isError(e);
                    });
            });
        }
    );

    context("when promise argument is not a promise", function() {
        it("should reject the returned promise", function() {
            return referee.assert.rejects({}, "test").catch(function(e) {
                referee.assert.isError(e);
            });
        });
    });

    context("when promise argument does not reject", function() {
        it("should reject the returned promise", function() {
            return referee.assert
                .rejects(Promise.resolve(), "test")
                .catch(function(e) {
                    referee.assert.isError(e);
                });
        });
    });

    context("when no expected is provided", function() {
        it("should resolve the returned promise", function() {
            return referee.assert.rejects(Promise.reject(new Error("ignored")));
        });
    });
});

describe("refute.rejects", function() {
    it("should return a promise", function() {
        var refutation = referee.refute.rejects(
            Promise.reject("test"),
            "test2"
        );
        referee.assert.isPromise(refutation);
    });

    context(
        "when promise argument does not rejects to value argument",
        function() {
            it("should resolve the returned promise", function() {
                return referee.refute.rejects(Promise.reject("test"), "test2");
            });
        }
    );

    context("when promise argument rejects to value argument", function() {
        it("should reject the returned promise", function() {
            return referee.refute
                .rejects(Promise.reject("test"), "test")
                .catch(function(e) {
                    referee.assert.isError(e);
                });
        });
    });

    context("when promise argument is not a promise", function() {
        it("should reject the returned promise", function() {
            return referee.refute.rejects({}, "test").catch(function(e) {
                referee.assert.isError(e);
            });
        });
    });

    context("when promise argument does not reject", function() {
        it("should reject the returned promise", function() {
            return referee.refute
                .rejects(Promise.resolve(), "test")
                .catch(function(e) {
                    referee.assert.isError(e);
                });
        });
    });
});
