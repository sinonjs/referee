"use strict";

var assert = require("assert");
var sinon = require("sinon");
var referee = require("./referee");

describe("add", function () {
  context("when passed an invalid name argument", function () {
    it("should throw a TypeError", function () {
      var expected =
        "'name' argument must be a non-empty string matching /^[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/";
      var error;
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
      var expected = "'options' argument must be a non-empty object";
      var options = {};
      var error;

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
      var expected =
        "'assert' option must be a Function, taking at least one argument";
      var options = {
        // eslint-disable-next-line no-empty-function
        assert: function () {},
      };
      var error;

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
      var expected =
        "'refute' option must be a Function, taking at least one argument";
      var options = {
        assert: function (actual) {
          return actual;
        },
        // eslint-disable-next-line no-empty-function
        refute: function () {},
      };
      var error;

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
      var expected = "'assertMessage' option must be a non-empty String";
      var options = {
        assert: function (actual) {
          return actual;
        },
        refute: function (actual) {
          return actual;
        },
        assertMessage: "",
      };
      var error;

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
      var expected = "'refuteMessage' option must be a non-empty String";
      var options = {
        assert: function (actual) {
          return actual;
        },
        refute: function (actual) {
          return actual;
        },
        assertMessage: "apple pie",
        refuteMessage: "",
      };
      var error;

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
      var then = sinon.fake();
      var options = {
        assert: function (thing) {
          return thing && new Promise(then);
        },
        assertMessage: "returning a promise",
        refuteMessage: "not returning a promise",
      };
      referee.add("returningPromise", options);

      var result = referee.assert.returningPromise(1);

      assert(result instanceof Promise);

      then.firstCall.args[0](); // Get coverage on then handler
    });
  });
});
