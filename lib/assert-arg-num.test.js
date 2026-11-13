"use strict";

const assert = require("assert");
const sinon = require("sinon");
const assertArgNum = require("./assert-arg-num");

describe("assertArgNum", function () {
  describe("when number of arguments is equal to expected", function () {
    it("should return true", function () {
      const defaultFail = sinon.fake();
      const name = "14ea32a5-8465-4396-8c14-5421da8c2b52";
      const expected = 2;
      const args = new Array(expected);
      const actual = assertArgNum(defaultFail, name, args, expected);

      assert.equal(actual, true);
    });

    it("should not call `defaultFail` argument", function () {
      const defaultFail = sinon.fake();
      const name = "14ea32a5-8465-4396-8c14-5421da8c2b52";
      const expected = 2;
      const args = new Array(expected);

      assertArgNum(defaultFail, name, args, expected);

      assert.equal(defaultFail.called, false);
    });
  });

  describe("when number of arguments is greater than expected", function () {
    it("should return true", function () {
      const fail = sinon.fake();
      const name = "14ea32a5-8465-4396-8c14-5421da8c2b52";
      const expected = 3;
      const greaterThanExpected = expected + 1;
      const args = new Array(greaterThanExpected);
      const actual = assertArgNum(fail, name, args, expected);

      assert.equal(actual, true);
    });
  });

  describe("when number of arguments is smaller than expected", function () {
    it("should call defaultFail with message", function () {
      const fail = sinon.fake();
      const name = "14ea32a5-8465-4396-8c14-5421da8c2b52";
      const expected = 1;
      const smallerThanExpected = expected - 1;
      const args = new Array(smallerThanExpected);

      assertArgNum(fail, name, args, expected);

      const expectedMessage = `[${name}] Expected to receive at least ${expected} argument(s)`;

      assert.equal(fail.calledOnce, true);
      assert.equal(fail.getCall(0).args[0], expectedMessage);
    });
  });
});
