"use strict";

var assert = require("assert");
var sinon = require("sinon");
var assertArgNum = require("./assert-arg-num");

describe("assertArgNum", function () {
  describe("when number of arguments is equal to expected", function () {
    it("should return true", function () {
      var defaultFail = sinon.fake();
      var name = "14ea32a5-8465-4396-8c14-5421da8c2b52";
      var expected = 2;
      var args = new Array(expected);
      var actual = assertArgNum(defaultFail, name, args, expected);

      assert.equal(actual, true);
    });

    it("should not call `defaultFail` argument", function () {
      var defaultFail = sinon.fake();
      var name = "14ea32a5-8465-4396-8c14-5421da8c2b52";
      var expected = 2;
      var args = new Array(expected);

      assertArgNum(defaultFail, name, args, expected);

      assert.equal(defaultFail.called, false);
    });
  });

  describe("when number of arguments is greater than expected", function () {
    it("should return true", function () {
      var fail = sinon.fake();
      var name = "14ea32a5-8465-4396-8c14-5421da8c2b52";
      var expected = 3;
      var greaterThanExpected = expected + 1;
      var args = new Array(greaterThanExpected);
      var actual = assertArgNum(fail, name, args, expected);

      assert.equal(actual, true);
    });
  });

  describe("when number of arguments is smaller than expected", function () {
    it("should call defaultFail with message", function () {
      var fail = sinon.fake();
      var name = "14ea32a5-8465-4396-8c14-5421da8c2b52";
      var expected = 1;
      var smallerThanExpected = expected - 1;
      var args = new Array(smallerThanExpected);

      assertArgNum(fail, name, args, expected);

      var expectedMessage = `[${name}] Expected to receive at least ${expected} argument(s)`;

      assert.equal(fail.calledOnce, true);
      assert.equal(fail.getCall(0).args[0], expectedMessage);
    });
  });
});
