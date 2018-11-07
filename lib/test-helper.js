"use strict";

var referee = require("./referee");
var sinon = require("sinon");
var slice = require("@sinonjs/commons").prototypes.array.slice;
var assert = require("assert");
var formatio = require("@sinonjs/formatio");

var formatter = formatio.configure({
    quoteStrings: false
});

var testHelper = {
    setUp: function() {
        sinon.spy(referee, "fail");

        referee.format = sinon.spy(function(object) {
            return formatter.ascii(object);
        });

        testHelper.okListener = sinon.spy();
        referee.on("pass", testHelper.okListener);
        testHelper.failListener = sinon.spy();
        referee.on("failure", testHelper.failListener);
    },

    tearDown: function() {
        sinon.restore();
        delete testHelper.okListener;
        delete testHelper.failListener;
        delete referee.listeners;
        referee.count = 0;
        delete referee.throwOnFailure;
    },

    // eslint-disable-next-line no-use-before-define
    assertionFailureEventTest: assertionFailureEventTest,
    // eslint-disable-next-line no-use-before-define
    assertionTests: assertionTests
};

function assertFailureEvent(callback) {
    var fails = this.failListener.callCount;
    var passes = this.okListener.callCount;
    referee.throwOnFailure = false;

    try {
        callback();
    } catch (e) {
        assert.fail("Assertion threw when it should not: " + e.message);
    }

    assert.equal(
        this.failListener.callCount,
        fails + 1,
        "Fail listener was not called once: " +
            this.failListener.callCount -
            fails
    );
    assert.equal(
        this.okListener.callCount,
        passes,
        "Pass listener was unexpectedly called"
    );
}

function assertionFailureEventTest(callback) {
    return function() {
        assertFailureEvent.call(this, callback);
    };
}

function passingAssertionTest(type, assertion, args) {
    return function() {
        var initialCount = referee.count;
        var argsAsStrings = args.map(function(value) {
            if (value && value.toString) {
                return value.toString();
            }

            return value;
        });
        var callStr =
            type + "." + assertion + "(" + argsAsStrings.join(", ") + ")";

        try {
            referee[type][assertion].apply(referee, args);
            // eslint-disable-next-line no-empty
        } catch (e) {}

        assert.equal(
            testHelper.okListener.callCount,
            1,
            "Expected referee to emit the pass event once for " + callStr
        );
        sinon.assert.calledWith(testHelper.okListener, type + "." + assertion);
        assert.equal(referee.count - initialCount, 1);
        sinon.assert.notCalled(referee.fail);
        sinon.assert.notCalled(testHelper.failListener);
    };
}

function failingAssertionTest(type, assertion, args) {
    return function() {
        var initialCount = referee.count;
        var callStr = type + "." + assertion + "(" + args.join(", ") + ")";

        try {
            referee[type][assertion].apply(referee, args);

            // eslint-disable-next-line no-console
            console.log("Unexpectedly passed: " + callStr);
            // eslint-disable-next-line no-empty
        } catch (e) {}

        assert.equal(
            referee.fail.callCount,
            1,
            "Expected referee.fail to be called once for " +
                callStr +
                ", was called " +
                referee.fail.callCount +
                " times"
        );

        assert.equal(referee.count - initialCount, 1);
        sinon.assert.notCalled(testHelper.okListener);
        sinon.assert.calledOnce(testHelper.failListener);

        assertFailureEvent.call(testHelper, function() {
            referee[type][assertion].apply(referee, args);
        });
    };
}

function assertionMessageTest(type, assertion, message, args) {
    var test = function() {
        var msg;

        try {
            referee[type][assertion].apply(referee, args);
            throw new Error(type + "." + assertion + " expected to fail");
        } catch (e) {
            assert.equal(e.name, "AssertionError", e.name + ": " + e.message);
            assert.equal(
                e.message,
                message,
                "Message was " + e.message + ", " + "expected " + message
            );
            msg = e.message;
        }

        var expected = test.expectedFormats;

        if (typeof expected !== "number") {
            expected = args.length;

            if (typeof args[args.length - 1] === "string") {
                expected -= 1;
            }
        }

        assert(referee.format.callCount >= expected);

        for (var i = 0, l = expected; i < l; ++i) {
            if (!isNaN(args[i]) || !isNaN(referee.format.args[i][0])) {
                sinon.assert.calledWith(referee.format, args[i]);
            }
        }

        assert.equal(testHelper.failListener.args[0][0].name, "AssertionError");
        assert.equal(testHelper.failListener.args[0][0].message, msg);
    };

    return test;
}

function failingErrorPropertiesTest(type, assertion, properties, args) {
    return function() {
        try {
            referee[type][assertion].apply(referee, args);
            throw new Error(type + "." + assertion + " expected to fail");
        } catch (e) {
            assert.equal(e.name, "AssertionError", e.name + ": " + e.message);
            Object.keys(properties).forEach(function(key) {
                assert.deepEqual(
                    e[key],
                    properties[key],
                    "AssertionError." +
                        key +
                        " " +
                        e[key] +
                        " == " +
                        properties[key]
                );
            });
            Object.keys(e).forEach(function(key) {
                if (!properties.hasOwnProperty(key) && key !== "name") {
                    throw new Error(
                        type +
                            "." +
                            assertion +
                            " defined unexpected property '" +
                            key +
                            "'' on error"
                    );
                }
            });
        }
    };
}

function assertionTests(type, assertion, callback) {
    var tests = {
        setUp: testHelper.setUp,
        tearDown: testHelper.tearDown
    };

    function pass(name) {
        var label = "should pass " + name;
        it(
            label,
            passingAssertionTest(type, assertion, slice(arguments, 1), name)
        );
    }

    function fail(name) {
        var label = "should fail " + name;
        it(label, failingAssertionTest(type, assertion, slice(arguments, 1)));
    }

    function msg(name, message) {
        var label = "should fail " + name;
        var test = assertionMessageTest(
            type,
            assertion,
            message,
            slice(arguments, 2)
        );
        it(label, test);
        return test;
    }

    function error(name, properties) {
        var label = "should fail " + name + " with correct error properties";
        var test = failingErrorPropertiesTest(
            type,
            assertion,
            properties,
            slice(arguments, 2)
        );
        it(label, test);
    }

    describe(type + "." + assertion, function() {
        beforeEach(testHelper.setUp);
        afterEach(testHelper.tearDown);

        return callback.call(tests, pass, fail, msg, error);
    });

    return;
}

module.exports = testHelper;
