"use strict";

var slice = require("@sinonjs/commons").prototypes.array.slice;

var assertArgNum = require("./assert-arg-num");
var interpolatePosArg = require("./interpolate-pos-arg");
var interpolateProperties = require("./interpolate-properties");

function createAssertion(referee, type, name, func, minArgs, messageValues) {
    var assertion = function() {
        var fullName = type + "." + name;
        var failed = false;

        if (!assertArgNum(referee.fail, fullName, arguments, minArgs)) {
            return;
        }

        var args = slice(arguments, 0);
        var namedValues = {};

        if (typeof messageValues === "function") {
            namedValues = messageValues.apply(this, args);
        }

        var ctx = {
            fail: function(msg) {
                failed = true;
                delete this.fail;
                var message = referee[type][name][msg] || msg;
                message = interpolatePosArg(message, args);
                message = interpolateProperties(referee, message, this);
                message = interpolateProperties(referee, message, namedValues);
                var operator = type + "." + name;
                var errorProperties = {
                    operator: operator
                };
                if (type === "assert") {
                    if (
                        namedValues.hasOwnProperty("actual") &&
                        namedValues.hasOwnProperty("expected")
                    ) {
                        errorProperties.actual = namedValues.actual;
                        errorProperties.expected = namedValues.expected;
                    }
                }
                referee.fail("[" + operator + "] " + message, errorProperties);
                return false;
            }
        };

        var result = func.apply(ctx, arguments);

        if (typeof Promise === "function" && result instanceof Promise) {
            // Here we need to return the promise in order to tell test
            // runners that this is an asychronous assertion.
            // eslint complains about the return statement, because it is
            // not expected here, so let's ignore.
            // https://eslint.org/docs/rules/consistent-return
            /* eslint-disable-next-line consistent-return */
            return result.then(function() {
                referee.pass(["pass", fullName].concat(args));
            });
        }

        if (!result && !failed) {
            // when a function returns false and hasn't already failed with a custom message,
            // fail with default message
            ctx.fail("message");
        }

        if (!failed) {
            referee.pass(["pass", fullName].concat(args));
        }
    };

    return assertion;
}

// Internal helper. Not the most elegant of functions, but it takes
// care of all the nitty-gritty of assertion functions: counting,
// verifying parameter count, interpolating messages with actual
// values and so on.
function defineAssertion(referee, type, name, func, minArgs, messageValues) {
    referee[type][name] = function() {
        var assertion = createAssertion(
            referee,
            type,
            name,
            func,
            minArgs,
            messageValues
        );
        return assertion.apply(null, arguments);
    };
}

module.exports = defineAssertion;
