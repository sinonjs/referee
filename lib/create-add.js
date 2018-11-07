"use strict";

var defineAssertion = require("./define-assertion");

// taken from https://stackoverflow.com/questions/2008279/validate-a-javascript-function-name/2008444#2008444
var validFunctionName = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;

function verifyArguments(name, options) {
    if (typeof name !== "string" || !validFunctionName.test(name)) {
        throw new TypeError(
            "'name' argument must be a non-empty string matching " +
                validFunctionName.toString()
        );
    }

    if (typeof options !== "object" || Object.keys(options).length === 0) {
        throw new TypeError("'options' argument must be a non-empty object");
    }

    if (typeof options.assert !== "function" || options.assert.length === 0) {
        throw new TypeError(
            "'assert' option must be a Function, taking at least one argument"
        );
    }

    if (
        typeof options.refute !== "undefined" &&
        (typeof options.refute !== "function" || options.refute.length === 0)
    ) {
        throw new TypeError(
            "'assert' option must be a Function, taking at least one argument"
        );
    }

    if (
        typeof options.assertMessage !== "string" ||
        options.assertMessage.length === 0
    ) {
        throw new TypeError(
            "'assertMessage' option must be a non-empty String"
        );
    }

    if (
        typeof options.refuteMessage !== "string" ||
        options.refuteMessage.length === 0
    ) {
        throw new TypeError(
            "'refuteMessage' option must be a non-empty String"
        );
    }
}

function createAdd(referee) {
    function add(name, options) {
        verifyArguments(name, options);

        var refuteArgs = options.refute
            ? options.refute.length
            : options.assert.length;

        if (!options.refute) {
            options.refute = function() {
                return !options.assert.apply(this, arguments);
            };
        }

        defineAssertion(
            referee,
            "assert",
            name,
            options.assert,
            options.assert.length,
            options.values
        );
        defineAssertion(
            referee,
            "refute",
            name,
            options.refute,
            refuteArgs,
            options.values
        );

        // Refactor: pass this down to where it is needed, so it is not part of the public api
        referee.assert[name].message = options.assertMessage;
        referee.refute[name].message = options.refuteMessage;

        if (!options.expectation) {
            return;
        }

        if (referee.expect && referee.expect.wrapAssertion) {
            referee.expect.wrapAssertion(name, options.expectation, referee);
            return;
        }

        referee.assert[name].expectationName = options.expectation;
        referee.refute[name].expectationName = options.expectation;
    }

    return add;
}

module.exports = createAdd;
