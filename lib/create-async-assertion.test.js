"use strict";

var referee = require("./referee");
var sinon = require("sinon");
var createAsyncAssertion = require("./create-async-assertion");
// eslint-disable-next-line no-empty-function
var noop = function () {};

describe("createAsyncAssertion", function () {
  it("should return a Function with arity 1", function () {
    var func = createAsyncAssertion(noop, noop);
    referee.assert.isFunction(func);
    referee.assert.hasArity(func, 1);
  });

  it("should result in a promise", function () {
    var func = createAsyncAssertion(noop, noop);
    var promise = func.call({}, Promise.resolve(), "test");
    referee.assert.isPromise(promise);
  });

  it("should fail when input is not a promise", function () {
    var fail = sinon.spy();
    var func = createAsyncAssertion(noop, noop);
    var context = {
      fail: fail,
    };
    var promise = func.call(context, {}, "test");
    return promise.then(function () {
      referee.assert.isTrue(
        fail.calledOnceWith("promise.then is not a function")
      );
    });
  });

  describe("applyCallback", function () {
    /* eslint-disable mocha/no-setup-in-describe */
    var resolve = function () {
      this.resolve();
    };
    var thenCallback = sinon.spy(resolve);
    var catchCallback = sinon.spy(resolve);
    var func = createAsyncAssertion(thenCallback, catchCallback);
    /* eslint-enable mocha/no-setup-in-describe */

    beforeEach(function () {
      thenCallback.resetHistory();
      catchCallback.resetHistory();
    });

    it("should apply and call the given `thenCallback`", function () {
      var promise = func.call({}, Promise.resolve("test"), "test");
      return promise.then(function () {
        referee.assert.isTrue(thenCallback.calledOnceWith("test", "test"));
        referee.refute.isTrue(catchCallback.called);
      });
    });

    it("should apply and call the given `catchCallback`", function () {
      // eslint-disable-next-line prefer-promise-reject-errors -- temporary, long term this should use Error
      var promise = func.call({}, Promise.reject("test"), "test");
      return promise.then(function () {
        referee.assert.isTrue(catchCallback.calledOnceWith("test", "test"));
        referee.refute.isTrue(thenCallback.called);
      });
    });
  });
});
