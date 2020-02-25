"use strict";

var assert = require("assert");
var proxyquire = require("proxyquire").noCallThru();
var sinon = require("sinon");

describe("assert.match", function() {
    beforeEach(function() {
        this.fakeSamsam = {
            match: sinon.fake.returns("07228bdd-f7c1-48a3-a7bc-b4c6d6d900f5")
        };
        this.fakeActualForMatch = sinon.fake.returns(
            "52efec5b-aab3-4c14-b4cb-4b0d26fdcf56"
        );

        this.factory = proxyquire("./match", {
            "@sinonjs/samsam": this.fakeSamsam,
            "../actual-for-match": this.fakeActualForMatch
        });

        this.fakeReferee = {
            add: sinon.fake()
        };

        this.factory(this.fakeReferee);

        this.options = this.fakeReferee.add.args[0][1];
    });

    afterEach(function() {
        sinon.resetHistory();
    });

    it("calls referee.add with 'match' as name", function() {
        assert(this.fakeReferee.add.calledWith("match"));
    });

    describe(".assert", function() {
        it("calls samsam.match with `actual` and `matcher` arguments", function() {
            var actual = {};
            var matcher = {};

            this.options.assert(actual, matcher);

            assert(this.fakeSamsam.match.calledOnce);
            assert(this.fakeSamsam.match.calledWith(actual, matcher));
        });

        it("returns the return value of samsam.match", function() {
            var actual = {};
            var matcher = {};
            var result = this.options.assert(actual, matcher);

            assert.equal(result, this.fakeSamsam.match.returnValues[0]);
        });
    });

    describe(".assertMessage", function() {
        it("is '${customMessage}${actual} expected to match ${expected}", function() {
            assert.equal(
                this.options.assertMessage,
                "${customMessage}${actual} expected to match ${expected}"
            );
        });
    });

    describe(".refuteMessage", function() {
        it("is '${customMessage}${actual} expected not to match ${expected}", function() {
            assert.equal(
                this.options.refuteMessage,
                "${customMessage}${actual} expected not to match ${expected}"
            );
        });
    });

    describe(".expectation", function() {
        it("is 'toMatch'", function() {
            assert.equal(this.options.expectation, "toMatch");
        });
    });

    describe(".values", function() {
        it("is a ternary function", function() {
            assert.equal(typeof this.options.values, "function");
            assert.equal(this.options.values.length, 3);
        });

        it("returns a values object", function() {
            var actual = "1f774102-1478-4c8d-91a3-e564558bd0a8";
            var matcher = "122c315e-578f-4063-a6be-70898a379637";
            var message = "27f5d147-b403-4778-a4b4-c851da0fa677";
            var result = this.options.values(actual, matcher, message);

            assert.equal(typeof result, "object");
        });

        it("calls actualForMatch with `actual`, `matcher` arguments", function() {
            var actual = "8d2b1903-ec44-4c4f-8e6d-d223b6412c09";
            var matcher = "39b545c0-46ea-4221-b5f5-73d76a98c9fb";
            var message = "6770d8f4-bd2c-4bdb-8839-77fca389a94f";

            this.options.values(actual, matcher, message);

            assert(this.fakeActualForMatch.calledOnce);
            assert(this.fakeActualForMatch.calledWith(actual, matcher));
        });

        it("returns the return value of actualForMatch as the `actual` property", function() {
            var actual = "be4b7ea4-2d58-49e0-8c96-09e4f34e3d63";
            var matcher = "4367d84d-8dab-4510-808a-c5e368b21b99";
            var message = "c6308fee-81f7-4e1e-9d8d-8d8f598466b1";
            var result = this.options.values(actual, matcher, message);

            assert.equal(
                result.actual,
                this.fakeActualForMatch.returnValues[0]
            );
        });

        it("returns `matcher` argument as `expected` property", function() {
            var actual = "1a5cdd2a-b54f-49e7-aae3-d714796f1c7b";
            var matcher = "341c11a8-298f-4b90-9c10-206dabe577ce";
            var message = "d2f80b1b-a735-48af-b9a7-26eed8c9742b";
            var result = this.options.values(actual, matcher, message);

            assert.equal(result.expected, matcher);
        });

        it("returns `message` argument as `customMessage` property", function() {
            var actual = "1a5cdd2a-b54f-49e7-aae3-d714796f1c7b";
            var matcher = "341c11a8-298f-4b90-9c10-206dabe577ce";
            var message = "d2f80b1b-a735-48af-b9a7-26eed8c9742b";
            var result = this.options.values(actual, matcher, message);

            assert.equal(result.expected, matcher);
        });
    });
});
