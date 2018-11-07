"use strict";

var defineAssertion = require("./define-assertion");

module.exports = function addAssertion(referee, name, options) {
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
};
