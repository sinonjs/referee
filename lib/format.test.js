"use strict";

var assert = require("assert");
var format = require("./format");
var referee = require("..");

describe("format", function() {
    afterEach(function() {
        format.reset();
    });

    it("formats with formatio by default", function() {
        assert.equal(format({ id: 42 }), "{ id: 42 }");
    });

    // eslint-disable-next-line mocha/no-skipped-tests
    it.skip("should configure formatio to use maximum 250 entries", function() {
        // not sure how we can verify this integration with the current setup
        // where sinon.js calls formatio as part of its loading
        // extracting sinon.format into a separate module would make this a lot
        // easier
    });

    it("formats strings without quotes", function() {
        assert.equal(format("Hey"), "Hey");
    });

    describe("format.setFormatter", function() {
        it("sets custom formatter", function() {
            format.setFormatter(function() {
                return "formatted";
            });
            assert.equal(format("Hey"), "formatted");
        });

        it("throws if custom formatter is not a function", function() {
            assert.throws(
                function() {
                    format.setFormatter("foo");
                },
                function(err) {
                    assert.equal(
                        err.message,
                        "format.setFormatter must be called with a function"
                    );
                    return true;
                }
            );
        });

        it("exposes method on referee", function() {
            assert.equal(referee.setFormatter, format.setFormatter);
        });
    });
});
