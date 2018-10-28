"use strict";

var referee = require("../referee");

describe("assert.rejects", function() {
    it("should resolve and pass when identical", function() {
        return referee.assert.rejects(Promise.reject("test"), "test");
    });

    it("should reject and fail when not identical", function() {
        return referee.assert
            .rejects(Promise.reject("test"), "test2")
            .catch(function(e) {
                referee.assert.isError(e);
            });
    });

    it("should reject and fail when input is not a promise", function() {
        return referee.assert.rejects({}, "test").catch(function(e) {
            referee.assert.isError(e);
        });
    });

    it("should reject and fail if the input promise resolves", function() {
        return referee.assert
            .rejects(Promise.resolve(), "test")
            .catch(function(e) {
                referee.assert.isError(e);
            });
    });
});

describe("refute.rejects", function() {
    it("should resolve and pass when not identical", function() {
        return referee.refute.rejects(Promise.reject("test"), "test2");
    });

    it("should reject and fail when identical", function() {
        return referee.refute
            .rejects(Promise.reject("test"), "test")
            .catch(function(e) {
                referee.assert.isError(e);
            });
    });

    it("should reject and fail when input is not a promise", function() {
        return referee.refute.rejects({}, "test").catch(function(e) {
            referee.assert.isError(e);
        });
    });

    it("should reject and fail if the input promise resolves", function() {
        return referee.assert
            .rejects(Promise.resolve(), "test")
            .catch(function(e) {
                referee.assert.isError(e);
            });
    });
});
