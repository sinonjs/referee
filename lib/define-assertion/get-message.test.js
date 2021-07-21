"use strict";

const assert = require("assert");
const sinon = require("sinon");
const getMessage = require("./get-message");

describe("getMessage", function () {
  context("when referee[type][name][msg] is a function", function () {
    it("returns the result of calling the function", function () {
      const expected = "apple pie";
      const referee = {
        type: {
          name: {
            msg: sinon.fake.returns(expected),
          },
        },
      };
      const actual = getMessage(referee, "type", "name", "msg");

      assert.equal(actual, expected);
    });
  });

  context("when referee[type][name][msg] is non-empty string", function () {
    it("returns that string", function () {
      const expected = "cherry pie";
      const referee = {
        type: {
          name: {
            msg: expected,
          },
        },
      };
      const actual = getMessage(referee, "type", "name", "msg");

      assert.equal(actual, expected);
    });
  });

  context("when referee[type][name][msg] is an empty string", function () {
    it("returns the 'msg' argument", function () {
      const expected = "msg";
      const referee = {
        type: {
          name: {
            msg: "",
          },
        },
      };
      const actual = getMessage(referee, "type", "name", expected);

      assert.equal(actual, expected);
    });
  });

  it("returns the 'msg' argument", function () {
    const expected = "peach pie";
    const referee = {
      type: {
        name: {
          msg: null,
        },
      },
    };
    const actual = getMessage(referee, "type", "name", expected);

    assert.equal(actual, expected);
  });
});
