"use strict";

var assert = require("assert");
var sinon = require("sinon");

var factory = require("./keys");

describe("keys factory", function () {
  // by defining this here, it only exists inside this closure and cannot
  // accidentally be modified by other tests
  function Klass(o) {
    for (var key in o) {
      if (o.hasOwnProperty(key)) {
        this[key] = o[key];
      }
    }
  }
  // eslint-disable-next-line no-empty-function, mocha/no-setup-in-describe
  Klass.prototype.methodA = function () {};
  // eslint-disable-next-line no-empty-function, mocha/no-setup-in-describe
  Klass.prototype.methodB = function () {};

  beforeEach(function () {
    this.fakeReferee = {
      add: sinon.fake(),
    };

    factory(this.fakeReferee);

    this.options = this.fakeReferee.add.args[0][1];
  });

  it("calls referee.add with 'keys' as name", function () {
    assert(this.fakeReferee.add.calledWith("keys"));
  });

  describe(".assert", function () {
    context("when keys are exact", function () {
      it("returns true", function () {
        assert(this.options.assert({ a: 1, b: 2, c: 3 }, ["a", "b", "c"]));
      });
    });

    context("when there are no keys", function () {
      it("returns true", function () {
        assert(this.options.assert({}, []));
      });
    });

    context("when values are special", function () {
      it("returns true", function () {
        assert(
          this.options.assert({ a: -1, b: null, c: undefined }, [
            "a",
            "b",
            "c",
          ]),
        );
      });
    });

    it("ignores prototype methods", function () {
      assert(
        this.options.assert(new Klass({ a: 1, b: 2, c: 3 }), ["a", "b", "c"]),
      );
    });

    it("allows overriding prototype methods", function () {
      assert(
        this.options.assert(new Klass({ a: 1, methodA: 2 }), ["a", "methodA"]),
      );
    });

    context("when keys are missing", function () {
      it("returns false", function () {
        assert.equal(
          this.options.assert({ a: 1, b: 2, c: 3 }, ["a", "b"]),
          false,
        );
      });
    });

    context("when there are excess keys", function () {
      it("returns false", function () {
        assert.equal(
          this.options.assert({ a: 1, b: 2, c: 3 }, ["a", "b", "c", "d"]),
          false,
        );
      });
    });

    context("when keys are not exact", function () {
      it("returns false", function () {
        assert.equal(
          this.options.assert({ a: 1, b: 2, c: 3 }, ["a", "b", "d"]),
          false,
        );
      });
    });
  });

  describe(".assertMessage", function () {
    it("is '${customMessage}Expected ${actualObject} to have exact keys ${expected}'", function () {
      assert.equal(
        this.options.assertMessage,
        "${customMessage}Expected ${actualObject} to have exact keys ${expected}",
      );
    });
  });

  describe(".refuteMessage", function () {
    it("is '${customMessage}Expected not to have exact keys ${expected}'", function () {
      assert.equal(
        this.options.refuteMessage,
        "${customMessage}Expected not to have exact keys ${expected}",
      );
    });
  });

  describe(".expectation", function () {
    it("is 'toHaveKeys'", function () {
      assert.equal(this.options.expectation, "toHaveKeys");
    });
  });

  describe(".values", function () {
    it("is a ternary function", function () {
      assert.equal(typeof this.options.values, "function");
      assert.equal(this.options.values.length, 3);
    });

    it("returns a values object", function () {
      var actual = "ae7ab1bf-9127-4796-8ee2-a2df2dbc0c1b";
      var keys = "f7c4145d-c358-4dcc-87d4-5308086ef1f5";
      var message = "9ce0c066-ecf7-43a5-ad85-5c20555b4e68";
      var result = this.options.values(actual, keys, message);

      assert.equal(typeof result, "object");
    });

    it("returns the actual argument as the actualObject property", function () {
      var actual = "b37c7885-572e-4a8e-83bd-f22346426c50";
      var keys = "4a04c64e-01d7-4096-b5e3-619c80ac4145";
      var message = "b7cef6b7-44ac-4cef-bb0c-dc6ba2108448";
      var result = this.options.values(actual, keys, message);

      assert.equal(result.actualObject, actual);
    });

    it("returns the keys of actual argument as the actual property", function () {
      var actual = {
        one: "05951a97-4845-4d56-a956-8602d668aab4",
        two: "a81b03c6-1431-40d3-9513-9a2b596f674d",
      };
      var keys = "e33178a1-cd66-4fa3-a04d-5970fe7d6cad";
      var message = "bed89d3c-2f95-4e8f-9a7f-322b02db8708";
      var result = this.options.values(actual, keys, message);

      assert.equal(
        JSON.stringify(result.actual),
        JSON.stringify(Object.keys(actual)),
      );
    });

    it("returns the keys argument as the expected property", function () {
      var actual = "d912a671-e5af-47f2-8cc9-46d928ab0529";
      var keys = "c725c913-82e8-4bdf-a768-8e58edc4d95d";
      var message = "1d863f70-ee16-4485-9bbf-0f4803a44abb";
      var result = this.options.values(actual, keys, message);

      assert.equal(result.expected, keys);
    });

    it("returns the message argument as the customMessage property", function () {
      var actual = "d912a671-e5af-47f2-8cc9-46d928ab0529";
      var keys = "c725c913-82e8-4bdf-a768-8e58edc4d95d";
      var message = "1d863f70-ee16-4485-9bbf-0f4803a44abb";
      var result = this.options.values(actual, keys, message);

      assert.equal(result.customMessage, message);
    });
  });
});
