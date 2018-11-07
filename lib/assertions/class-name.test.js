"use strict";

var testHelper = require("../test-helper");

testHelper.assertionTests("assert", "className", function(
    pass,
    fail,
    msg,
    error
) {
    msg(
        "fail without arguments",
        "[assert.className] Expected to receive at least 2 arguments"
    );

    msg(
        "fail without class name",
        "[assert.className] Expected to receive at least 2 arguments",
        { className: "" }
    );

    msg(
        "fail if object does not have className property",
        "[assert.className] Expected object to have className property",
        {},
        "item"
    );

    msg(
        "fail with custom message if object does not have className property",
        "[assert.className] Nope: Expected object to have className property",
        {},
        "item",
        "Nope"
    );

    msg(
        "fail when element does not include class name",
        "[assert.className] Expected object's className to include item but was (empty string)",
        { className: "" },
        "item"
    );

    msg(
        "fail with custom message when element does not include class name",
        "[assert.className] Come on! Expected object's className to include item but was (empty string)",
        { className: "" },
        "item",
        "Come on!"
    );

    pass("when element's class name matches", { className: "item" }, "item");
    pass(
        "when element includes class name",
        { className: "feed item" },
        "item"
    );
    fail(
        "when element does not include all class names",
        { className: "feed item" },
        "item post"
    );

    pass(
        "when element includes all class names",
        { className: "feed item post" },
        "item post"
    );

    pass(
        "when element includes all class names in different order",
        { className: "a b c d e" },
        "e a d"
    );

    pass("with class names as array", { className: "a b c d e" }, [
        "e",
        "a",
        "d"
    ]);

    if (typeof document !== "undefined") {
        var li = document.createElement("li");
        li.className = "some thing in here";

        pass("for DOM elements", li, "thing some");
    }

    error(
        "when element does not include all class names",
        {
            code: "ERR_ASSERTION",
            actual: "feed item",
            expected: "item post",
            operator: "assert.className"
        },
        { className: "feed item" },
        "item post"
    );
});

testHelper.assertionTests("refute", "className", function(
    pass,
    fail,
    msg,
    error
) {
    msg(
        "fail without arguments",
        "[refute.className] Expected to receive at least 2 arguments"
    );

    msg(
        "fail without class name",
        "[refute.className] Expected to receive at least 2 arguments",
        { className: "item" }
    );

    msg(
        "fail if object does not have className property",
        "[refute.className] Expected object to have className property",
        {},
        "item"
    );

    msg(
        "fail with custom message if object does not have className property",
        "[refute.className] Yikes: Expected object to have className property",
        {},
        "item",
        "Yikes"
    );

    pass("when element does not include class name", { className: "" }, "item");

    msg(
        "fail when element's class name matches",
        "[refute.className] Expected object's className not to include item",
        { className: "item" },
        "item"
    );

    msg(
        "fail with custom message when element's class name matches",
        "[refute.className] Noes: Expected object's className not to include item",
        { className: "item" },
        "item",
        "Noes"
    );

    fail(
        "when element includes class name",
        { className: "feed item" },
        "item"
    );
    pass(
        "when element does not include all class names",
        { className: "feed item" },
        "item post"
    );
    fail(
        "when element includes all class names",
        { className: "feed item post" },
        "item post"
    );
    fail(
        "when element includes all class names in different order",
        { className: "a b c d e" },
        "e a d"
    );
    fail("with class names as array", { className: "a b c d e" }, [
        "e",
        "a",
        "d"
    ]);
    pass("with class names as array", { className: "a b c d e" }, [
        "f",
        "a",
        "d"
    ]);

    if (typeof document !== "undefined") {
        var li = document.createElement("li");
        li.className = "some thing in here";

        pass("for DOM elements", li, "something");
    }

    error(
        "when element includes all class names",
        {
            code: "ERR_ASSERTION",
            operator: "refute.className"
        },
        { className: "feed item post" },
        "item post"
    );
});
