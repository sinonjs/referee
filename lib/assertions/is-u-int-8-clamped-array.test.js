"use strict";

var assert = require("assert");
var proxyquire = require("proxyquire").noCallThru();
var sinon = require("sinon");

var captureArgs = require("../test-helper/capture-args");

describe("isUint8ClampedArray factory", function () {
  beforeEach(function () {
    this.fakeActualMessageValues = "a4bf1905-489e-4f10-a47e-5b79b7cf173a";

    this.factory = proxyquire("./is-u-int-8-clamped-array", {
      "../actual-message-values": this.fakeActualMessageValues,
    });

    this.fakeReferee = {
      add: sinon.fake(),
    };

    this.factory(this.fakeReferee);

    this.options = this.fakeReferee.add.args[0][1];
  });

  it("calls referee.add with 'isUint8ClampedArray' as name", function () {
    assert(this.fakeReferee.add.calledWith("isUint8ClampedArray"));
  });

  describe(".assert", function () {
    describe("when actual is an instance of Uint8ClampedArray", function () {
      it("returns true", function () {
        var result = this.options.assert(new Uint8ClampedArray());

        assert.equal(result, true);
      });
    });

    describe("when actual is not an instance of Uint8ClampedArray", function () {
      it("returns false", function () {
        var t = this;

        [
          new Uint16Array(),
          new Uint32Array(),
          new Uint8Array(),
          [],
          {},
          captureArgs(),
        ].forEach(function (value) {
          var result = t.options.assert(value);

          assert.equal(result, false);
        });
      });
    });
  });

  describe(".assertMessage", function () {
    it("is '${customMessage}Expected ${actual} to be a Uint8ClampedArray'", function () {
      assert.equal(
        this.options.assertMessage,
        "${customMessage}Expected ${actual} to be a Uint8ClampedArray"
      );
    });
  });

  describe(".refuteMessage", function () {
    it("is '${customMessage}Expected ${actual} not to be a Uint8ClampedArray'", function () {
      assert.equal(
        this.options.refuteMessage,
        "${customMessage}Expected ${actual} not to be a Uint8ClampedArray"
      );
    });
  });

  describe(".expectation", function () {
    it("is 'toBeUint8ClampedArray'", function () {
      assert.equal(this.options.expectation, "toBeUint8ClampedArray");
    });
  });

  describe(".values", function () {
    it("delegates to '../actual-message-values'", function () {
      assert.equal(this.options.values, this.fakeActualMessageValues);
    });
  });
});
