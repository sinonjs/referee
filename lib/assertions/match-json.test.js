"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "matchJson", function(
    pass,
    fail,
    msg,
    error
) {
    pass("when json string matches object", '{"key":"value","and":42}', {
        key: "value"
    });
    fail("when json string does not equal object", '{"key":"value","and":42}', {
        key: "different"
    });
    msg(
        "with descriptive message",
        '[assert.matchJson] Expected { key: "value" } to match { key: "different" }',
        '{"key":"value","and":42}',
        { key: "different" }
    );
    fail("when json string cannot be parsed", "{something:not parsable}", {});
    msg(
        "with descriptive message on parse error",
        "[assert.matchJson] Expected {something:not parsable} to be valid JSON",
        "{something:not parsable}",
        {}
    );
    error(
        "when json string does not equal object",
        {
            code: "ERR_ASSERTION",
            actual: { key: "value", and: 42 },
            expected: { key: "different", and: 42 },
            operator: "assert.matchJson"
        },
        '{"key":"value","and":42,"ignoring":true}',
        { key: "different", and: 42 }
    );
});

testHelper.assertionTests("refute", "matchJson", function(
    pass,
    fail,
    msg,
    error
) {
    fail("when json string equals object", '{"key":"value","and":42}', {
        key: "value"
    });
    pass("when json string does not equal object", '{"key":"value","and":42}', {
        key: "different"
    });
    msg(
        "with descriptive message",
        '[refute.matchJson] Expected { key: "value" } not to match { key: "value" }',
        '{"key":"value","and":42}',
        { key: "value" }
    );
    fail("when json string cannot be parsed", "{something:not parsable}", {});
    msg(
        "with descriptive message on parse error",
        "[refute.matchJson] Expected {something:not parsable} to be valid JSON",
        "{something:not parsable}",
        {}
    );
    error(
        "when json string equals object",
        {
            code: "ERR_ASSERTION",
            operator: "refute.matchJson"
        },
        '{"key":"value","and":42}',
        { key: "value" }
    );
});
