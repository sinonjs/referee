"use strict";

var assert = require("assert");
var referee = require("../referee");

function captureArgs() {
    return arguments;
}

describe("assert.isArrayBuffer", function() {
    context("when called with an ArrayBuffer instance", function() {
        it("should pass", function() {
            referee.assert.isArrayBuffer(new global.ArrayBuffer(8));
        });
    });

    context("when called with Array", function() {
        it("should fail", function() {
            assert.throws(
                function() {
                    referee.assert.isArrayBuffer([]);
                },
                {
                    code: "ERR_ASSERTION",
                    message:
                        "[assert.isArrayBuffer] Expected [] to be an ArrayBuffer",
                    name: "AssertionError",
                    operator: "assert.isArrayBuffer"
                }
            );
        });
    });

    context("when called with Object", function() {
        it("should fail", function() {
            assert.throws(
                function() {
                    referee.assert.isArrayBuffer({});
                },
                {
                    code: "ERR_ASSERTION",
                    message:
                        "[assert.isArrayBuffer] Expected {  } to be an ArrayBuffer",
                    name: "AssertionError",
                    operator: "assert.isArrayBuffer"
                }
            );
        });
    });

    context("when called with arguments", function() {
        it("should fail", function() {
            assert.throws(
                function() {
                    referee.assert.isArrayBuffer(captureArgs());
                },
                {
                    code: "ERR_ASSERTION",
                    message:
                        "[assert.isArrayBuffer] Expected {  } to be an ArrayBuffer",
                    name: "AssertionError",
                    operator: "assert.isArrayBuffer"
                }
            );
        });
    });
});

describe("refute.isArrayBuffer", function() {
    context("when called with an ArrayBuffer instance", function() {
        it("should fail", function() {
            assert.throws(
                function() {
                    referee.refute.isArrayBuffer(new global.ArrayBuffer(8));
                },
                {
                    code: "ERR_ASSERTION",
                    message:
                        "[refute.isArrayBuffer] Expected [ArrayBuffer] {  } not to be an ArrayBuffer",
                    name: "AssertionError",
                    operator: "refute.isArrayBuffer"
                }
            );
        });
    });

    context("when called with Array", function() {
        it("should pass", function() {
            referee.refute.isArrayBuffer([]);
        });
    });

    context("when called with Object", function() {
        it("should pass", function() {
            referee.refute.isArrayBuffer({});
        });
    });

    context("when called with arguments", function() {
        it("should pass", function() {
            referee.refute.isArrayBuffer(captureArgs());
        });
    });
});
