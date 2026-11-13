"use strict";

const assert = require("../referee").assert;
const refute = require("../referee").refute;

require("./has-arity");

describe("hasArity assertion", function () {
  describe("integration", function () {
    it("should be available as hasArity", function () {
      assert.isFunction(assert.hasArity);
      assert.isFunction(refute.hasArity);
    });
  });

  describe("assert.hasArity", function () {
    it("should accept function with matching arity", function () {
      const functions = [
        function (one) {
          return [one];
        },
        function (one, two) {
          return [one, two];
        },
        function (one, two, three) {
          return [one, two, three];
        },
      ];

      functions.forEach((func, index) => {
        const expectedArity = index + 1;

        assert.hasArity(func, expectedArity);
      });
    });

    it("should refuse function with mismatching arity", function () {
      const functions = [
        function (one) {
          return [one];
        },
        function (one, two) {
          return [one, two];
        },
        function (one, two, three) {
          return [one, two, three];
        },
      ];

      functions.forEach((func, index) => {
        assert.exception(() => {
          assert.hasArity(func, index);
        });
      });
    });

    describe("when actual is not a Function", function () {
      it("should throw a TypeError", function () {
        const nonFunctions = [
          null,
          undefined,
          "hello",
          123,
          new Date(),
          new Set(),
          [],
          {},
        ];

        function verify(nonFunc) {
          assert.exception(
            () => {
              assert.hasArity(nonFunc, 1);
            },
            {
              message: 'hasArity expects "actual" argument to be a Function',
              name: "TypeError",
            },
          );
        }

        nonFunctions.forEach(verify);
      });
    });

    describe("when arity is not a non-negative Number", function () {
      it("should throw a TypeError", function () {
        const invalidNumbers = [
          -123,
          null,
          undefined,
          "hello",
          new Date(),
          new Set(),
          [],
          {},
        ];

        function noop() {
          return null;
        }

        function verify(arity) {
          assert.exception(
            () => {
              assert.hasArity(noop, arity);
            },
            {
              message:
                'hasArity expected "expected" argument to be a non-negative Number',
              name: "TypeError",
            },
          );
        }

        invalidNumbers.forEach(verify);
      });
    });
  });
});
