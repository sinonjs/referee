"use strict";

var assert = require("assert");
var proxyquire = require("proxyquire").noCallThru();
var sinon = require("sinon");

describe("json factory", function() {
    beforeEach(function() {
        this.fakeSamsam = {
            deepEqual: sinon.fake.returns(
                "70b2de6c-c281-4913-91f4-330f156a3ccc"
            )
        };

        var factory = proxyquire("./json", {
            "@sinonjs/samsam": this.fakeSamsam
        });

        this.fakeReferee = {
            add: sinon.fake(),
            fail: sinon.fake()
        };

        factory(this.fakeReferee);

        this.options = this.fakeReferee.add.args[0][1];
    });

    it("calls referee.add with 'json' as name", function() {
        assert(this.fakeReferee.add.calledWith("json"));
    });

    describe(".assert", function() {
        context("when json string is parsable", function() {
            it("returns the result of calling samsam.deepEqual with the parsed string and the matcher", function() {
                assert.equal(
                    this.options.assert('{"key":"value"}', { key: "value" }),
                    this.fakeSamsam.deepEqual.returnValues[0]
                );
            });
        });

        context("when json string cannot be parsed", function() {
            it("it calls the fail helper", function() {
                this.options.assert.call(
                    this.fakeReferee,
                    "{something:not parsable}",
                    {}
                );

                assert(
                    this.fakeReferee.fail.calledOnceWithExactly,
                    "${customMessage}Expected ${actual} to be valid JSON"
                );
            });
        });
    });

    describe(".assertMessage", function() {
        it("is '${customMessage}Expected ${actual} to equal ${expected}'", function() {
            assert.equal(
                this.options.assertMessage,
                "${customMessage}Expected ${actual} to equal ${expected}"
            );
        });
    });

    describe(".refuteMessage", function() {
        it("is '${customMessage}Expected ${actual} not to equal ${expected}'", function() {
            assert.equal(
                this.options.refuteMessage,
                "${customMessage}Expected ${actual} not to equal ${expected}"
            );
        });
    });

    describe(".expectation", function() {
        it("is 'toEqualJson'", function() {
            assert.equal(this.options.expectation, "toEqualJson");
        });
    });

    describe(".values", function() {
        it("is a ternary function", function() {
            assert.equal(typeof this.options.values, "function");
            assert.equal(this.options.values.length, 3);
        });

        it("returns a values object", function() {
            var actual = "56f9c024-ddfb-4184-816f-a00c16d544d4";
            var expected = "e46b227d-6ec4-4e19-9850-2ebe49c92a8b";
            var message = "15641444-8ffc-42cc-9abb-39fb6824795b";
            var result = this.options.values(actual, expected, message);

            assert.equal(typeof result, "object");
        });

        it("returns actual argument as actualRaw property", function() {
            var actual = "898878f9-29f6-41d9-b8df-bf28115a3775";
            var expected = "15472423-fc15-42f6-a74e-022670f7ad5f";
            var message = "f77075c5-e2c2-4e12-a34b-0b7fd25ad69a";
            var result = this.options.values(actual, expected, message);

            assert.equal(result.actualRaw, actual);
        });

        context("when actual argument can be parsed as JSON", function() {
            it("returns the parsed value of actual argument as actual property", function() {
                var actual = '{"name": "value"}';
                var matcher = "bf221a03-fda2-409d-99c8-63e7cf1c5ba7";
                var message = "2a5b557f-6cc7-40cd-ad0d-c14316c5d327";
                var result = this.options.values(actual, matcher, message);

                assert.equal(
                    JSON.stringify(result.actual),
                    JSON.stringify(JSON.parse(actual))
                );
            });
        });

        context("when actual argument cannot be parsed as JSON", function() {
            it("returns actual argument as actual property", function() {
                var actual = '{"unparsable"}';
                var matcher = "2f756ce6-9b2e-4751-bb8e-11cc19ec726b";
                var message = "8544eb15-31e7-4a49-9daf-4d26f9610337";
                var result = this.options.values(actual, matcher, message);

                assert.equal(result.actual, actual);
            });
        });

        it("returns expected argument as expected property", function() {
            var actual = "1cbcc519-b0da-48c3-8ac8-e4659f7adb8e";
            var matcher = "b50670b1-b576-41d8-bc2a-8772a35337c7";
            var message = "2915f974-bfd7-424a-8660-c71a9177018c";
            var result = this.options.values(actual, matcher, message);

            assert.equal(result.expected, matcher);
        });

        it("returns message argument as customMessage property", function() {
            var actual = "110a04c0-d827-4d08-bf06-e4d9bd9ad3ec";
            var matcher = "5d384546-011d-4fd7-8a49-694fb79c2ad1";
            var message = "5c2099c9-6ed3-4d92-b8f6-a06247724002";
            var result = this.options.values(actual, matcher, message);

            assert.equal(result.customMessage, message);
        });
    });
});
