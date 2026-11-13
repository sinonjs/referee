"use strict";

const referee = require("./referee");
const sinon = require("sinon");
const createAsyncAssertion = require("./create-async-assertion");
// eslint-disable-next-line no-empty-function
const noop = function () {};

describe("createAsyncAssertion", function () {
  it("should return a Function with arity 1", function () {
    const func = createAsyncAssertion(noop, noop);
    referee.assert.isFunction(func);
    referee.assert.hasArity(func, 1);
  });

  it("should result in a promise", function () {
    const func = createAsyncAssertion(noop, noop);
    const promise = func.call({}, Promise.resolve(), "test");
    referee.assert.isPromise(promise);
  });

  it("should fail when input is not a promise", function () {
    const fail = sinon.spy();
    const func = createAsyncAssertion(noop, noop);
    const context = {
      fail,
    };
    const promise = func.call(context, {}, "test");
    return promise.then(() => {
      referee.assert.isTrue(
        fail.calledOnceWith("promise.then is not a function"),
      );
    });
  });

  describe("applyCallback", function () {
    /* eslint-disable mocha/no-setup-in-describe */
    const resolve = function () {
      this.resolve();
    };
    const thenCallback = sinon.spy(resolve);
    const catchCallback = sinon.spy(resolve);
    const func = createAsyncAssertion(thenCallback, catchCallback);
    /* eslint-enable mocha/no-setup-in-describe */

    beforeEach(function () {
      thenCallback.resetHistory();
      catchCallback.resetHistory();
    });

    it("should apply and call the given `thenCallback`", function () {
      const promise = func.call({}, Promise.resolve("test"), "test");
      return promise.then(() => {
        referee.assert.isTrue(thenCallback.calledOnceWith("test", "test"));
        referee.refute.isTrue(catchCallback.called);
      });
    });

    it("should apply and call the given `catchCallback`", function () {
      // eslint-disable-next-line prefer-promise-reject-errors -- temporary, long term this should use Error
      const promise = func.call({}, Promise.reject("test"), "test");
      return promise.then(() => {
        referee.assert.isTrue(catchCallback.calledOnceWith("test", "test"));
        referee.refute.isTrue(thenCallback.called);
      });
    });
  });

  describe("applyCallback exception handling", function () {
    /* eslint-disable mocha/no-setup-in-describe */
    const reject = function () {
      throw new Error("Ouch!");
    };
    const func = createAsyncAssertion(reject, reject);
    const fail = sinon.spy();
    /* eslint-enable mocha/no-setup-in-describe */

    beforeEach(function () {
      fail.resetHistory();
    });

    it("should fail the test if thenCallback throws", function () {
      const promise = func.call({ fail }, Promise.resolve("test"), "test");
      return promise.then(() => {
        referee.assert.isTrue(fail.calledOnceWith("Ouch!"));
      });
    });

    it("should fail the test if catchCallback throws", function () {
      // eslint-disable-next-line prefer-promise-reject-errors -- temporary, long term this should use Error
      const promise = func.call({ fail }, Promise.reject("test"), "test");
      return promise.then(() => {
        referee.assert.isTrue(fail.calledOnceWith("Ouch!"));
      });
    });
  });
});
