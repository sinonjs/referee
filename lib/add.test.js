"use strict";

const assert = require("assert");
const sinon = require("sinon");
const referee = require("./referee");

describe("add", function () {
  context("when passed an invalid name argument", function () {
    it("should throw a TypeError", function () {
      const expected =
        "'name' argument must be a non-empty string matching /^[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/";
      let error;
      try {
        referee.add("invalid name");
      } catch (err) {
        error = err;
      }

      assert.equal(error.message, expected);
      assert(error instanceof TypeError);
    });
  });

  context("when passed an invalid options argument", function () {
    it("should throw a TypeError", function () {
      const expected = "'options' argument must be a non-empty object";
      const options = {};
      let error;

      try {
        referee.add("isApplePie", options);
      } catch (err) {
        error = err;
      }

      assert.equal(error.message, expected);
      assert(error instanceof TypeError);
    });
  });

  context("when called with invalid assert option", function () {
    it("should throw a TypeError", function () {
      const expected =
        "'assert' option must be a Function, taking at least one argument";
      const options = {
        // eslint-disable-next-line no-empty-function
        assert() {},
      };
      let error;

      try {
        referee.add("isApplePie", options);
      } catch (err) {
        error = err;
      }

      assert.equal(error.message, expected);
      assert(error instanceof TypeError);
    });
  });

  context("when called with invalid refute option", function () {
    it("should throw a TypeError", function () {
      const expected =
        "'refute' option must be a Function, taking at least one argument";
      const options = {
        assert(actual) {
          return actual;
        },
        // eslint-disable-next-line no-empty-function
        refute() {},
      };
      let error;

      try {
        referee.add("isApplePie", options);
      } catch (err) {
        error = err;
      }

      assert.equal(error.message, expected);
      assert(error instanceof TypeError);
    });
  });

  context("when called with invalid assertMessage option", function () {
    it("should throw a TypeError", function () {
      const expected =
        "'assertMessage' option must be a non-empty String or Function";
      const options = {
        assert(actual) {
          return actual;
        },
        refute(actual) {
          return actual;
        },
        assertMessage: "",
      };
      let error;

      try {
        referee.add("isApplePie", options);
      } catch (err) {
        error = err;
      }

      assert.equal(error.message, expected);
      assert(error instanceof TypeError);
    });
  });

  context("when called with invalid refuteMessage option", function () {
    it("should throw a TypeError", function () {
      const expected =
        "'refuteMessage' option must be a non-empty String or Function";
      const options = {
        assert(actual) {
          return actual;
        },
        refute(actual) {
          return actual;
        },
        assertMessage: "apple pie",
        refuteMessage: "",
      };
      let error;

      try {
        referee.add("isApplePie", options);
      } catch (err) {
        error = err;
      }

      assert.equal(error.message, expected);
      assert(error instanceof TypeError);
    });
  });

  context("with assert returning a promise", function () {
    before(function () {
      if (typeof Promise === "undefined") {
        this.skip();
      }
    });

    it("returns a promise and calls referee.pass when resolved", function () {
      const then = sinon.fake();
      const options = {
        assert(thing) {
          return thing && new Promise(then);
        },
        assertMessage: "returning a promise",
        refuteMessage: "not returning a promise",
      };
      referee.add("returningPromise", options);

      const result = referee.assert.returningPromise(1);

      assert(result instanceof Promise);

      then.firstCall.args[0](); // Get coverage on then handler
    });
  });
});
