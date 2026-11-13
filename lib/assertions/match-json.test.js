"use strict";

const assert = require("assert");
const proxyquire = require("proxyquire").noCallThru();
const sinon = require("sinon");

function prepareTest(t, fakeActualForMatch) {
  t.fakeSamsam = {
    match: sinon.fake.returns("c7288c0f-b8c7-443f-bdee-c78098283ed1"),
  };
  t.fakeActualForMatch =
    fakeActualForMatch ||
    sinon.fake.returns("aea9cafb-23d1-4953-97a2-d8c7134ebfde");

  const factory = proxyquire("./match-json", {
    "@sinonjs/samsam": t.fakeSamsam,
    "../actual-for-match": t.fakeActualForMatch,
  });

  t.fakeReferee = {
    add: sinon.fake(),
    fail: sinon.fake(),
  };

  factory(t.fakeReferee);

  t.options = t.fakeReferee.add.args[0][1];
}

describe("matchJson factory", function () {
  beforeEach(function () {
    prepareTest(this);
  });

  it("calls referee.add with 'matchJson' as name", function () {
    assert(this.fakeReferee.add.calledWith("matchJson"));
  });

  describe(".assert", function () {
    context("when json string is parsable", function () {
      it("returns the result of calling samsam.match with the parsed string and the matcher", function () {
        assert.equal(
          this.options.assert('{"key":"value","and":42}', {
            key: "value",
          }),
          this.fakeSamsam.match.returnValues[0],
        );
      });
    });

    context("when json string cannot be parsed", function () {
      it("it calls the fail helper", function () {
        this.options.assert.call(
          this.fakeReferee,
          "{something:not parsable}",
          {},
        );

        assert(
          this.fakeReferee.fail.calledOnceWithExactly,
          "${customMessage}Expected ${actual} to be valid JSON",
        );
      });
    });
  });

  describe(".assertMessage", function () {
    it("is '${customMessage}Expected ${actual} to match ${expected}'", function () {
      assert.equal(
        this.options.assertMessage,
        "${customMessage}Expected ${actual} to match ${expected}",
      );
    });
  });

  describe(".refuteMessage", function () {
    it("is '${customMessage}Expected ${actual} not to match ${expected}'", function () {
      assert.equal(
        this.options.refuteMessage,
        "${customMessage}Expected ${actual} not to match ${expected}",
      );
    });
  });

  describe(".expectation", function () {
    it("is 'toMatchJson'", function () {
      assert.equal(this.options.expectation, "toMatchJson");
    });
  });

  describe(".values", function () {
    it("is a ternary function", function () {
      assert.equal(typeof this.options.values, "function");
      assert.equal(this.options.values.length, 3);
    });

    it("returns a values object", function () {
      const actual = "8effa0bb-0cf3-49d5-92f6-051fe72d7e49";
      const matcher = "58b507b6-c895-4822-a865-7e57d72e7839";
      const message = "d41cb10d-9c11-467f-bb1b-ba419fbb0416";
      const result = this.options.values(actual, matcher, message);

      assert.equal(typeof result, "object");
    });

    it("returns actual argument as actualRaw property", function () {
      const actual = "34106ea7-68ff-4a65-b26d-84786f0d0584";
      const matcher = "31aa8559-2cd0-4ce8-b0da-7d5dba8c621a";
      const message = "f6781da4-8adf-435e-ac47-bb623c7e30f4";
      const result = this.options.values(actual, matcher, message);

      assert.equal(result.actualRaw, actual);
    });

    context("when actualForMatch returns a truthy value", function () {
      beforeEach("", function () {
        this.expected = "014ada52-5c1f-4f37-aa26-9ad15abf3c50";
        prepareTest(this, sinon.fake.returns(this.expected));
      });

      it("returns the result of actualForMatch as the actual property", function () {
        const actual = "33a9105d-7631-4b79-a376-b5a7879692e7";
        const matcher = "6f8b8300-7f5e-462e-bbf3-c83973202403";
        const message = "a758b0b6-1044-4a1d-8081-446c36bdb06e";
        const result = this.options.values(actual, matcher, message);

        assert.equal(result.actual, this.expected);
      });
    });

    context("when actualForMatch returns a falsy value", function () {
      beforeEach("", function () {
        this.expected = undefined;
        prepareTest(this, sinon.fake.returns(this.expected));
      });

      it("returns actual argument as the actual property", function () {
        const actual = "081d6837-d9b2-49c5-a037-395e2e6b5efa";
        const matcher = "d847fd58-2452-44cd-86b6-a448ba6cac69";
        const message = "d1dbae8d-4ec8-490b-a8ce-9e4293b75b2b";
        const result = this.options.values(actual, matcher, message);

        assert.equal(result.actual, actual);
      });
    });

    it("returns matcher argument as expected property", function () {
      const actual = "2ebfbeb5-a484-47c7-81e4-cffa11714bc0";
      const matcher = "271bab10-c7c1-48e0-94e9-78e2a9da2a43";
      const message = "689c8c8d-1208-4151-900b-ff820fec8ca7";
      const result = this.options.values(actual, matcher, message);

      assert.equal(result.expected, matcher);
    });

    it("returns message argument as customMessage property", function () {
      const actual = "6855652d-1579-4e8e-8633-38d899bd5dd5";
      const matcher = "c70d1c50-034f-47c1-8564-eaf64a7a0d6c";
      const message = "d2d531cb-3195-4c08-878f-46ea9bb87d98";
      const result = this.options.values(actual, matcher, message);

      assert.equal(result.customMessage, message);
    });
  });
});
