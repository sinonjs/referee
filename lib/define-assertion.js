"use strict";

var slice = require("@sinonjs/commons").prototypes.array.slice;

var assertArgNum = require("./assert-arg-num");
var interpolatePosArg = require("./interpolate-pos-arg");
var interpolateProperties = require("./interpolate-properties");

function createAssertion(
    referee,
    type,
    name,
    func,
    minArgs,
    messageValues,
    pass,
    fail
) {
    var assertion = function() {
        var fullName = type + "." + name;
        var failed = false;

        if (
            !assertArgNum(
                referee.fail,
                fullName,
                arguments,
                minArgs || func.length,
                fail
            )
        ) {
            return;
        }

        var args = slice(arguments, 0);
        var namedValues = {};

        if (typeof messageValues === "function") {
            var replacedValues = messageValues.apply(this, args);
            if (typeof replacedValues === "object") {
                namedValues = replacedValues;
            } else {
                args = replacedValues;
            }
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
                fail("[" + operator + "] " + message, errorProperties);
                return false;
            }
        };

        if (!func.apply(ctx, arguments) && !failed) {
            // when a function returns false and hasn't already failed with a custom message,
            // fail with default message
            ctx.fail("message");
        }

        if (!failed) {
            pass(["pass", fullName].concat(args));
        }
    };

    return assertion;
}

// Internal helper. Not the most elegant of functions, but it takes
// care of all the nitty-gritty of assertion functions: counting,
// verifying parameter count, interpolating messages with actual
// values and so on.
function defineAssertion(
    referee,
    countAssertion,
    type,
    name,
    func,
    minArgs,
    messageValues
) {
    referee[type][name] = function() {
        countAssertion();
        var assertion = createAssertion(
            referee,
            type,
            name,
            func,
            minArgs,
            messageValues,
            referee.pass,
            referee.fail
        );
        assertion.apply(null, arguments);
    };
}

module.exports = defineAssertion;
