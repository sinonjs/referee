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
            var actual;
            try {
                referee.assert.isArrayBuffer([]);
            } catch (error) {
                actual = error;
            }

            assert.equal(actual.code, "ERR_ASSERTION");
            assert.equal(
                actual.message,
                "[assert.isArrayBuffer] Expected [] to be an ArrayBuffer"
            );
            assert.equal(actual.name, "AssertionError");
            assert.equal(actual.operator, "assert.isArrayBuffer");
        });
    });

    context("when called with Object", function() {
        it("should fail", function() {
            var actual;
            try {
                referee.assert.isArrayBuffer({});
            } catch (error) {
                actual = error;
            }

            assert.equal(actual.code, "ERR_ASSERTION");
            assert.equal(
                actual.message,
                "[assert.isArrayBuffer] Expected {  } to be an ArrayBuffer"
            );
            assert.equal(actual.name, "AssertionError");
            assert.equal(actual.operator, "assert.isArrayBuffer");
        });
    });

    context("when called with arguments", function() {
        it("should fail", function() {
            var actual;
            try {
                referee.assert.isArrayBuffer(captureArgs());
            } catch (error) {
                actual = error;
            }

            assert.equal(actual.code, "ERR_ASSERTION");
            assert.equal(
                actual.message,
                "[assert.isArrayBuffer] Expected {  } to be an ArrayBuffer"
            );
            assert.equal(actual.name, "AssertionError");
            assert.equal(actual.operator, "assert.isArrayBuffer");
        });
    });
});
