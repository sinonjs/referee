"use strict";

var defineAssertion = require("./define-assertion");

module.exports = function addAssertion(referee, name, opt) {
    var refuteArgs = opt.refute ? opt.refute.length : opt.assert.length;

    if (!opt.refute) {
        opt.refute = function() {
            return !opt.assert.apply(this, arguments);
        };
    }

    defineAssertion(
        referee,
        "assert",
        name,
        opt.assert,
        opt.assert.length,
        opt.values
    );
    defineAssertion(
        referee,
        "refute",
        name,
        opt.refute,
        refuteArgs,
        opt.values
    );

    referee.assert[name].message = opt.assertMessage;
    referee.refute[name].message = opt.refuteMessage;

    if (!opt.expectation) {
        return;
    }

    if (referee.expect && referee.expect.wrapAssertion) {
        referee.expect.wrapAssertion(name, opt.expectation, referee);
        return;
    }

    referee.assert[name].expectationName = opt.expectation;
    referee.refute[name].expectationName = opt.expectation;
};
