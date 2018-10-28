"use strict";

var referee = require("../referee");

describe("assert.resolves", function() {
    it("should resolve and pass when identical", function() {
        return referee.assert.resolves(Promise.resolve("test"), "test");
    });

    it("should reject and fail when not identical", function() {
        return referee.assert
            .resolves(Promise.resolve("test"), "test2")
            .catch(function(e) {
                referee.assert.isError(e);
            });
    });

    it("should reject and fail when input is not a promise", function() {
        return referee.assert.resolves({}, "test").catch(function(e) {
            referee.assert.isError(e);
        });
    });

    it("should reject and fail if the input promise rejects", function() {
        return referee.assert
            .resolves(Promise.reject(), "test")
            .catch(function(e) {
                referee.assert.isError(e);
            });
    });
});

describe("refute.resolves", function() {
    it("should resolve and pass when not identical", function() {
        return referee.refute.resolves(Promise.resolve("test"), "test2");
    });

    it("should reject and fail when identical", function() {
        return referee.refute
            .resolves(Promise.resolve("test"), "test")
            .catch(function(e) {
                referee.assert.isError(e);
            });
    });

    it("should reject and fail when input is not a promise", function() {
        return referee.refute.resolves({}, "test").catch(function(e) {
            referee.assert.isError(e);
        });
    });

    it("should reject and fail if the input promise rejects", function() {
        return referee.refute
            .resolves(Promise.reject(), "test")
            .catch(function(e) {
                referee.assert.isError(e);
            });
    });
});
