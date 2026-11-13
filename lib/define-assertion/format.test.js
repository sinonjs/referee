"use strict";

const assert = require("assert");
const proxyquire = require("proxyquire").noCallThru();
const sinon = require("sinon");

describe("format", function () {
  beforeEach(function () {
    this.fakeInspect = sinon.fake.returns(
      "334ddc7e-9c2e-4206-8861-9253d348c81b",
    );

    this.format = proxyquire("./format", {
      util: {
        inspect: this.fakeInspect,
      },
    });
  });

  describe("when called with an instance of Error", function () {
    it("returns the name property", function () {
      const t = this;
      const ERROR_TYPES = [
        Error,
        EvalError,
        RangeError,
        ReferenceError,
        SyntaxError,
        TypeError,
        URIError,
      ];

      ERROR_TYPES.forEach((ErrorType) => {
        const error = new ErrorType("some message");
        const result = t.format(error);

        assert.equal(result, error.name);
      });
    });
  });

  describe("when called with other values", function () {
    it("formats the result using `util.inspect`", function () {
      const t = this;

      const NON_ERROR_VALUES = [
        "a0f33503-7939-4b9f-8fd7-efc8c3cad117",
        1234,
        new Date(),
        [],
        {},
        new Map(),
        new Set(),
        Promise.resolve("02142eaa-d842-4541-af9d-7e9ab323b562"),
      ];

      NON_ERROR_VALUES.forEach((value) => {
        t.fakeInspect.resetHistory();

        const result = t.format(value);

        assert(t.fakeInspect.calledOnce);
        assert(t.fakeInspect.calledWith(value));
        assert.equal(result, t.fakeInspect.returnValues[0]);
      });
    });
  });
});
