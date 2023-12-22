"use strict";

var assert = require("assert");
var sinon = require("sinon");

var factory = require("./near");

describe("near factory", function () {
  beforeEach(function () {
    this.fakeReferee = {
      add: sinon.fake(),
    };

    factory(this.fakeReferee);

    this.options = this.fakeReferee.add.args[0][1];
  });

  it("calls referee.add with 'near' as name", function () {
    assert(this.fakeReferee.add.calledWith("near"));
  });

  describe(".assert", function () {
    context("when called with equal numbers", function () {
      it("should return true", function () {
        assert(this.options.assert(3, 3, 0));
      });
    });

    context("when called with numbers in delta range", function () {
      it("should return true", function () {
        assert(this.options.assert(2, 3, 1));
      });
    });

    context("when called with numbers out of delta range", function () {
      it("should return false", function () {
        assert.equal(this.options.assert(2, 3, 0.5), false);
      });
    });
  });

  describe(".assertMessage", function () {
    it("is '${customMessage}Expected ${actual} to be equal to ${expected} +/- ${delta}'", function () {
      assert.equal(
        this.options.assertMessage,
        "${customMessage}Expected ${actual} to be equal to ${expected} +/- ${delta}",
      );
    });
  });

  describe(".refuteMessage", function () {
    it("is '${customMessage}Expected ${actual} not to be equal to ${expected} +/- ${delta}'", function () {
      assert.equal(
        this.options.refuteMessage,
        "${customMessage}Expected ${actual} not to be equal to ${expected} +/- ${delta}",
      );
    });
  });

  describe(".expectation", function () {
    it("is 'toBeNear'", function () {
      assert.equal(this.options.expectation, "toBeNear");
    });
  });

  describe(".values", function () {
    it("is function with an arity of 4", function () {
      assert.equal(typeof this.options.values, "function");
      assert.equal(this.options.values.length, 4);
    });

    it("returns a values object", function () {
      var actual = "7ebf3834-e7cf-4a1f-a79e-a49d13cf1179";
      var expected = "24f1d545-5df2-4647-93f0-d3e5a59a2cf8";
      var delta = "de264d3d-f3ac-42af-9e19-950822ffd5ab";
      var message = "f6acff98-2074-4df5-94bf-f3b424aabecb";
      var result = this.options.values(actual, expected, delta, message);

      assert.equal(typeof result, "object");
    });

    it("returns the actual argument as the actual property", function () {
      var actual = "accec083-dff6-4827-9592-91ee695c088b";
      var expected = "5dbf3ab3-472a-45b4-9b2a-1de4b4ad4606";
      var delta = "ed5ec214-9dac-4d71-b00c-849d3e2e4376";
      var message = "c228ad1a-0bc3-4147-8bce-b4f17d9263cd";
      var result = this.options.values(actual, expected, delta, message);

      assert.equal(result.actual, actual);
    });

    it("returns the expected argument as the expected property", function () {
      var actual = "a232829f-26c8-4300-a984-fdbd596418c3";
      var expected = "6ccf012b-b848-4863-b176-074654bb4fb6";
      var delta = "0f80dc73-dc3c-4c84-bdf9-9485a74510ce";
      var message = "84f73bca-4543-4a6b-abb6-808c1fb2e87a";
      var result = this.options.values(actual, expected, delta, message);

      assert.equal(result.expected, expected);
    });

    it("returns the delta argument as the delta property", function () {
      var actual = "53c5da9d-63f6-4fa9-9e39-fa98c81dd6da";
      var expected = "a7068a5d-a011-41c6-959a-13dcf740bccf";
      var delta = "c5573a4d-2956-409f-98f8-4f84022e8705";
      var message = "4d8b70ce-19a4-4595-8aaa-78628c2a2794";
      var result = this.options.values(actual, expected, delta, message);

      assert.equal(result.delta, delta);
    });

    it("returns the message argument as the customMessage property", function () {
      var actual = "5b7fe457-407b-4331-8096-5f99f9d63c9c";
      var expected = "cf7b988d-4a8c-470c-99e7-138abfe45611";
      var delta = "96391e41-b986-4389-99db-9ad60919fb47";
      var message = "7fbb1a0b-38e9-42d6-8707-9b34aef7a974";
      var result = this.options.values(actual, expected, delta, message);

      assert.equal(result.customMessage, message);
    });
  });
});
