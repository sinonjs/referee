var testHelper = (function (referee, buster) {
    if (typeof module === "object" && typeof require === "function") {
        referee = require("../lib/referee");
        buster = require("buster");
    }

    function slice(args, index) {
        return Array.prototype.slice.call(args, index);
    }

    function assertFailureEvent(callback) {
        var fails = this.failListener.callCount;
        var passes = this.okListener.callCount;
        referee.throwOnFailure = false;

        try {
            callback();
        } catch (e) {
            assert.fail("Assertion threw when it should not: " + e.message);
        }

        assert.equals(this.failListener.callCount, fails + 1,
                      "Fail listener was not called once: " +
                      this.failListener.callCount - fails);
        assert.equals(this.okListener.callCount, passes,
                      "Pass listener was unexpectedly called");
    }

    function assertionFailureEventTest(callback) {
        return function () {
            assertFailureEvent.call(this, callback);
        };
    }

    function passingAssertionTest(type, assertion, args) {
        return function () {
            var initialCount = referee.count;
            var callStr = type + "." + assertion + "(" + args.join(", ") + ")";

            try {
                referee[type][assertion].apply(referee, args);
            } catch (e) {
                if (typeof console !== "undefined") {
                    console.log("Failed: " + callStr);
                } else {
                    buster.util.puts("Failed: " + callStr);
                }
            }

            assert.equals(
                this.okListener.callCount,
                1,
                "Expected referee to emit the pass event once for " + callStr
            );
            assert.calledWith(this.okListener, type + "." + assertion);
            assert.equals(referee.count - initialCount, 1);
            refute.called(referee.fail);
            refute.called(this.failListener);
        };
    }

    function failingAssertionTest(type, assertion, args) {
        return function () {
            var initialCount = referee.count;
            var callStr = type + "." + assertion + "(" + args.join(", ") + ")";

            try {
                referee[type][assertion].apply(referee, args);

                if (typeof console !== "undefined") {
                    console.log("Unexpectedly passed: " + callStr);
                } else {
                    buster.util.puts("Unexpectedly passed: " + callStr);
                }
            } catch (e) {}

            assert.equals(
                referee.fail.callCount,
                1,
                "Expected referee.fail to be called once for " +
                    callStr + ", was called " + referee.fail.callCount +
                    " times"
            );

            assert.equals(referee.count - initialCount, 1);
            refute.called(this.okListener);
            assert.calledOnce(this.failListener);

            assertFailureEvent.call(this, function () {
                referee[type][assertion].apply(referee, args);
            });
        };
    }

    function assertionMessageTest(type, assertion, message, args) {
        var test = function () {
            var msg;

            try {
                referee[type][assertion].apply(referee, args);
                throw new Error(type + "." + assertion + " expected to fail");
            } catch (e) {
                assert.equals(e.name, "AssertionError",
                             e.name + ": " + e.message);
                assert.equals(
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

            var i, l;
            for (i = 0, l = expected; i < l; ++i) {
                if (!isNaN(args[i]) || !isNaN(referee.format.args[i][0])) {
                    assert.calledWith(referee.format, args[i]);
                }
            }

            assert.equals(this.failListener.args[0][0].name, "AssertionError");
            assert.equals(this.failListener.args[0][0].message, msg);
        };

        return test;
    }

    function assertionTests(type, assertion, callback) {
        var tests = {
            setUp: testHelper.setUp,
            tearDown: testHelper.tearDown
        };

        var prefix = type + "." + assertion + " should ";

        function pass(name) {
            tests[prefix + "pass " + name] = passingAssertionTest(
                type,
                assertion,
                slice(arguments, 1),
                name
            );
        }

        function fail(name) {
            tests[prefix + "fail " + name] =
                failingAssertionTest(type, assertion, slice(arguments, 1));
        }

        function msg(name, message) {
            tests[prefix + name] = assertionMessageTest(
                type,
                assertion,
                message,
                slice(arguments, 2)
            );

            return tests[prefix + name];
        }

        callback.call(tests, pass, fail, msg);
        return buster.testCase(type + "." + assertion, tests);
    }

    return {
        setUp: function () {
            this.spy(referee, "fail");

            referee.format = this.spy(function (object) {
                return String(object);
            });

            this.okListener = this.spy();
            referee.on("pass", this.okListener);
            this.failListener = this.spy();
            referee.on("failure", this.failListener);
        },

        tearDown: function () {
            delete referee.listeners;
            referee.count = 0;
            delete referee.throwOnFailure;
        },

        assertionFailureEventTest: assertionFailureEventTest,
        assertionTests: assertionTests
    };
}(this.referee, this.buster));

if (typeof module === "object") {
    module.exports = testHelper;
}
