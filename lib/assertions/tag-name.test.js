"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "tagName", function(
    pass,
    fail,
    msg,
    error
) {
    pass("for matching tag names", { tagName: "li" }, "li");
    pass("for case-insensitive matching tag names", { tagName: "LI" }, "li");
    pass("for case-insensitive matching tag names #2", { tagName: "li" }, "LI");
    pass("for uppercase matching tag names", { tagName: "LI" }, "LI");
    fail("for non-matching tag names", { tagName: "li" }, "p");
    fail("for substring matches in tag names", { tagName: "li" }, "i");

    msg(
        "fail with message",
        "[assert.tagName] Expected tagName to be p but was li",
        { tagName: "li" },
        "p"
    );

    msg(
        "fail with custom message",
        "[assert.tagName] Here: Expected tagName to be p but was li",
        { tagName: "li" },
        "p",
        "Here"
    );

    msg(
        "fail if not passed arguments",
        "[assert.tagName] Expected to receive at least 2 arguments"
    );

    msg(
        "fail if not passed tag name",
        "[assert.tagName] Expected to receive at least 2 arguments",
        { tagName: "" }
    );

    msg(
        "fail if object does not have tagName property",
        "[assert.tagName] Expected {  } to have tagName property",
        {},
        "li"
    );

    msg(
        "fail with custom message if object does not have tagName property",
        "[assert.tagName] Yikes! Expected {  } to have tagName property",
        {},
        "li",
        "Yikes!"
    );

    if (typeof document !== "undefined") {
        pass("for DOM elements", document.createElement("li"), "li");
    }

    error(
        "for non-matching tag names",
        {
            code: "ERR_ASSERTION",
            actual: "li",
            expected: "p",
            operator: "assert.tagName"
        },
        { tagName: "li" },
        "p"
    );
});

testHelper.assertionTests("refute", "tagName", function(
    pass,
    fail,
    msg,
    error
) {
    fail("for matching tag names", { tagName: "li" }, "li");
    fail("for case-insensitive matching tag names", { tagName: "LI" }, "li");
    fail("for case-insensitive matching tag names #2", { tagName: "LI" }, "li");
    fail("for same casing matching tag names", { tagName: "li" }, "li");
    pass("for non-matching tag names", { tagName: "li" }, "p");
    pass("for substring matching tag names", { tagName: "li" }, "i");
    pass("for case-insensitive non-matching tag names", { tagName: "li" }, "P");
    pass(
        "for case-insensitive substring mathcing tag names",
        { tagName: "li" },
        "i"
    );

    msg(
        "fail with message",
        "[refute.tagName] Expected tagName not to be li",
        { tagName: "li" },
        "li"
    );

    msg(
        "fail with custom message",
        "[refute.tagName] Oh well: Expected tagName not to be li",
        { tagName: "li" },
        "li",
        "Oh well"
    );

    msg(
        "fail if not passed arguments",
        "[refute.tagName] Expected to receive at least 2 arguments"
    );

    msg(
        "fail if not passed tag name",
        "[refute.tagName] Expected to receive at least 2 arguments",
        { tagName: "p" }
    );

    msg(
        "fail if object does not have tagName property",
        "[refute.tagName] Expected {  } to have tagName property",
        {},
        "li"
    );

    msg(
        "fail with custom message if object does not have tagName property",
        "[refute.tagName] Yes: Expected {  } to have tagName property",
        {},
        "li",
        "Yes"
    );

    if (typeof document !== "undefined") {
        pass("for DOM elements", document.createElement("li"), "p");
    }

    error(
        "for matching tag names",
        {
            code: "ERR_ASSERTION",
            operator: "refute.tagName"
        },
        { tagName: "li" },
        "li"
    );
});
