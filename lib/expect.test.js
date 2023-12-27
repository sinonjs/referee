"use strict";

var commons = require("@sinonjs/commons");
var sinon = require("sinon");
var referee = require("./referee");
var expect = referee.expect;
var allOff = require("event-emitter/all-off");

describe("expect", function () {
  beforeEach(function () {
    sinon.spy(referee, "fail");
    this.okListener = sinon.spy();
    referee.on("pass", this.okListener);
    this.failListener = sinon.spy();
    referee.on("failure", this.failListener);
    sinon.replace(commons.deprecated, "wrap", function (f) {
      return f;
    });
  });

  afterEach(function () {
    sinon.restore();
    allOff(referee);
    delete referee.throwOnFailure;
  });

  it("should be function", function () {
    referee.assert.equals(typeof expect, "function");
  });

  it("should bind assert.equals to argument", function () {
    expect({}).toEqual({});
  });

  it("should fail assertion if a not equals b", function () {
    try {
      expect({ id: 42 }).toEqual({ bleh: "Nah" });
      throw new Error("Did not throw");
    } catch (e) {
      referee.assert.equals(
        e.message,
        "[expect.toEqual] { id: 42 } expected to be equal to { bleh: 'Nah' }",
      );
    }
  });

  it("should fail assertion by calling buster.assert.fail", function () {
    try {
      expect({ id: 42 }).toEqual({ bleh: "Nah" });
      // eslint-disable-next-line no-empty
    } catch (e) {}

    referee.assert(referee.fail.calledOnce);
  });

  it("should emit assertion pass event", function () {
    var listener = sinon.spy();
    referee.on("pass", listener);

    expect({ id: 42 }).toEqual({ id: 42 });

    referee.assert(listener.calledOnce);
  });

  it("should emit assertion fail event", function () {
    var listener = sinon.spy();
    referee.on("failure", listener);
    referee.throwOnFailure = false;

    expect({ id: 42 }).toEqual({ id: 22 });

    referee.assert(listener.calledOnce);
  });

  it("should expose refutation as expectation too", function () {
    try {
      expect({ id: 42 }).not.toEqual({ id: 42 });
      throw new Error("Did not throw");
    } catch (e) {
      referee.assert.equals(
        e.message,
        "[expect.not.toEqual] { id: 42 } expected not to be equal to { id: 42 }",
      );
    }
  });

  it("should expose all assertions", function () {
    var obj = { id: 42 };

    expect(obj).toBe(obj);
    expect(obj).not.toBe({ id: 42 });
    expect(obj).toEqual({ id: 42 });
    expect(obj).not.toEqual({});
    expect(obj).toBeObject();
    expect(false).not.toBeObject();
    // eslint-disable-next-line no-empty-function
    expect(function () {}).toBeFunction();
    expect({}).not.toBeFunction();
    expect(new RegExp("[a-z]")).toBeRegExp();
    expect({}).not.toBeRegExp();
    expect(new Date()).toBeDate();
    expect({}).not.toBeDate();
    expect(undefined).toBeUndefined();
    expect(null).not.toBeUndefined();
    expect(null).toBeNull();
    expect(42).not.toBeNull();
    expect(obj).toMatch({ id: 42 });
    expect(obj).not.toMatch({ id: 37 });
    expect(function () {
      throw new TypeError("Oops");
    }).toThrow("TypeError");
    // eslint-disable-next-line no-empty-function
    expect(function () {}).not.toThrow();
    expect({ tagName: "li" }).toHaveTagName("li");
    expect({ tagName: "ol" }).not.toHaveTagName("li");
    expect({ className: "a b c" }).toHaveClassName("b");
    expect({ className: "a b c" }).not.toHaveClassName("d");
    expect(true).toBeTruthy();
    expect(false).not.toBeTruthy();
    expect(false).toBeFalsy();
    expect(true).not.toBeFalsy();
    expect(3).toBeNear(3, 0);
    expect(2).not.toBeNear(3, 0.5);
    expect(2).toBeGreaterThan(1);
    expect(1).not.toBeGreaterThan(2);
    expect(1).toBeLessThan(2);
    expect(2).not.toBeLessThan(1);
    expect([0, 1, 2]).toContain(1);
    expect([0, 1, 2]).not.toContain(3);
    expect('{"key":"value"}').toEqualJson({ key: "value" });
    expect('{"key":"value"}').not.toEqualJson({ key: "different" });
    expect('{"key":"value","and":42}').toMatchJson({ key: "value" });
    expect('{"key":"value","and":42}').not.toMatchJson({
      key: "different",
    });
    referee.assert(true, "Avoid 'no assertions'");
  });
});
