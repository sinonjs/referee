"use strict";

var testHelper = require("./test-helper");

testHelper.assertionTests("assert", "json", function(pass, fail, msg, error) {
    pass("when json string equals object", '{"key":"value"}', { key: "value" });
    fail("when json string does not equal object", '{"key":"value"}', {
        key: "different"
    });
    msg(
        "with descriptive message",
        '[assert.json] Expected { key: "value" } to equal { key: "different" }',
        '{"key":"value"}',
        { key: "different" }
    );
    fail("when json string cannot be parsed", "{something:not parsable}", {});
    msg(
        "with descriptive message on parse error",
        "[assert.json] Expected {something:not parsable} to be valid JSON",
        "{something:not parsable}",
        {}
    );
    error(
        "when json string does not equal object",
        {
            code: "ERR_ASSERTION",
            actual: { key: "value" },
            expected: { key: "different" },
            operator: "assert.json"
        },
        '{"key":"value"}',
        { key: "different" }
    );
});

testHelper.assertionTests("refute", "json", function(pass, fail, msg, error) {
    fail("when json string equals object", '{"key":"value"}', { key: "value" });
    pass("when json string does not equal object", '{"key":"value"}', {
        key: "different"
    });
    msg(
        "with descriptive message",
        '[refute.json] Expected { key: "value" } not to equal { key: "value" }',
        '{"key":"value"}',
        { key: "value" }
    );
    fail("when json string cannot be parsed", "{something:not parsable}", {});
    msg(
        "with descriptive message on parse error",
        "[refute.json] Expected {something:not parsable} to be valid JSON",
        "{something:not parsable}",
        {}
    );
    error(
        "when json string equals object",
        {
            code: "ERR_ASSERTION",
            operator: "refute.json"
        },
        '{"key":"value"}',
        { key: "value" }
    );
});

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

testHelper.assertionTests("assert", "hasArity", function(
    pass,
    fail,
    msg,
    error
) {
    function arityZero() {
        return undefined;
    }

    function arityOne(one) {
        return one;
    }

    function arityTwo(one, two) {
        return one + two;
    }

    function arityThree(one, two, three) {
        return one + two + three;
    }

    function arityFour(one, two, three, four) {
        return one + two + three + four;
    }

    function arityFive(one, two, three, four, five) {
        return one + two + three + four + five;
    }

    function aritySix(one, two, three, four, five, six) {
        return one + two + three + four + five + six;
    }

    pass("when function has arity 0", arityZero, 0);
    pass("when function has arity 1", arityOne, 1);
    pass("when function has arity 2", arityTwo, 2);
    pass("when function has arity 3", arityThree, 3);
    pass("when function has arity 4", arityFour, 4);
    pass("when function has arity 5", arityFive, 5);
    pass("when function has arity 6", aritySix, 6);

    fail("when function arity does not match", arityOne, 0);

    msg(
        "with descriptive message",
        "[assert.hasArity] Expected arityOne to have arity of 0 but was 1",
        arityOne,
        0
    );

    fail("when arity does not match", arityOne, 0);
    fail("when arity does not match", arityTwo, 1);
    fail("when arity does not match", arityThree, 2);
    error(
        "for mismatched arity",
        {
            actual: arityOne,
            expected: 2,
            code: "ERR_ASSERTION",
            operator: "assert.hasArity"
        },
        arityOne,
        2
    );
});

testHelper.assertionTests("refute", "hasArity", function(
    pass,
    fail,
    msg,
    error
) {
    function arityZero() {
        return undefined;
    }

    function arityOne(one) {
        return one;
    }

    function arityTwo(one, two) {
        return one + two;
    }

    function arityThree(one, two, three) {
        return one + two + three;
    }

    function arityFour(one, two, three, four) {
        return one + two + three + four;
    }

    function arityFive(one, two, three, four, five) {
        return one + two + three + four + five;
    }

    function aritySix(one, two, three, four, five, six) {
        return one + two + three + four + five + six;
    }

    pass("when function has arity 0", arityZero, 99);
    pass("when function has arity 1", arityOne, 99);
    pass("when function has arity 2", arityTwo, 99);
    pass("when function has arity 3", arityThree, 99);
    pass("when function has arity 4", arityFour, 99);
    pass("when function has arity 5", arityFive, 99);
    pass("when function has arity 6", aritySix, 99);

    fail("when function arity matches", arityOne, 1);

    msg(
        "with descriptive message",
        "[refute.hasArity] Expected arityOne to not have arity of 1",
        arityOne,
        1
    );

    fail("when arity matches", arityOne, 1);
    fail("when arity matches", arityTwo, 2);
    fail("when arity matches", arityThree, 3);
    error(
        "for matched arity",
        {
            code: "ERR_ASSERTION",
            operator: "refute.hasArity"
        },
        arityOne,
        1
    );
});
