"use strict";

var assert = require("assert");
var referee = require("../referee");

function captureArgs() {
    return arguments;
}

var arrayLike = {
    length: 4,
    "0": "One",
    "1": "Two",
    "2": "Three",
    "3": "Four",
    splice: function() {}
};

describe("assert.isArrayLike", function() {
    it("should pass for array", function() {
        referee.assert.isArrayLike([]);
    });

    it("should pass for arguments", function() {
        referee.assert.isArrayLike(captureArgs());
    });

    it("should pass for array like", function() {
        referee.assert.isArrayLike(arrayLike);
    });

    it("should fail for object", function() {
        assert.throws(
            function() {
                referee.assert.isArrayLike({});
            },
            {
                code: "ERR_ASSERTION",
                message: "[assert.isArrayLike] Expected {  } to be array like",
                name: "AssertionError",
                operator: "assert.isArrayLike"
            }
        );
    });

    it("should fail with custom message", function() {
        assert.throws(
            function() {
                referee.assert.isArrayLike({}, "Here!");
            },
            {
                code: "ERR_ASSERTION",
                message:
                    "[assert.isArrayLike] Here! Expected {  } to be array like",
                name: "AssertionError",
                operator: "assert.isArrayLike"
            }
        );
    });
});

describe("refute.isArrayLike", function() {
    it("should fail for array", function() {
        assert.throws(
            function() {
                referee.refute.isArrayLike([]);
            },
            {
                code: "ERR_ASSERTION",
                message:
                    "[refute.isArrayLike] Expected [] not to be array like",
                name: "AssertionError",
                operator: "refute.isArrayLike"
            }
        );
    });

    it("should fail for arguments", function() {
        assert.throws(
            function() {
                referee.refute.isArrayLike(captureArgs());
            },
            {
                code: "ERR_ASSERTION",
                message:
                    "[refute.isArrayLike] Expected {  } not to be array like",
                name: "AssertionError",
                operator: "refute.isArrayLike"
            }
        );
    });

    it("should fail for array like", function() {
        assert.throws(
            function() {
                referee.refute.isArrayLike(arrayLike);
            },
            {
                code: "ERR_ASSERTION",
                message:
                    '[refute.isArrayLike] Expected { 0: "One", 1: "Two", 2: "Three", 3: "Four", length: 4, splice: function splice() {} } not to be array like',
                name: "AssertionError",
                operator: "refute.isArrayLike"
            }
        );
    });

    it("should fail with custom message", function() {
        assert.throws(
            function() {
                referee.refute.isArrayLike(arrayLike, "apple pie");
            },
            {
                code: "ERR_ASSERTION",
                message:
                    '[refute.isArrayLike] apple pie: Expected { 0: "One", 1: "Two", 2: "Three", 3: "Four", length: 4, splice: function splice() {} } not to be array like',
                name: "AssertionError",
                operator: "refute.isArrayLike"
            }
        );
    });

    it("should pass for object", function() {
        referee.refute.isArrayLike({});
    });
});
