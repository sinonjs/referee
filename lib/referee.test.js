"use strict";

var referee = require("../lib/referee");
var testHelper = require("./test-helper");
var sinon = require("sinon");

testHelper.assertionTests("assert", "match", function(pass, fail, msg, error) {
    pass("matching regexp", "Assertions", /[a-z]/);
    pass("for generic object with test method returning true", "Assertions", {
        test: function() {
            return true;
        }
    });

    fail("for non-matching regexp", "Assertions 123", /^[a-z]$/);
    pass("matching boolean", true, true);
    fail("mis-matching boolean", true, false);

    fail(
        "for generic object with test method returning false",
        {
            test: function() {
                return false;
            }
        },
        "Assertions"
    );

    msg(
        "fail with understandable message",
        "[assert.match] Assertions 123 expected to match /^[a-z]+$/",
        "Assertions 123",
        /^[a-z]+$/
    );

    msg(
        "fail with custom message",
        "[assert.match] Yeah! Assertions 123 expected to match /^[a-z]+$/",
        "Assertions 123",
        /^[a-z]+$/,
        "Yeah!"
    );

    fail("if match object is null", "Assertions 123", null);

    fail("if match object is undefined", "Assertions 123", undefined);

    fail(
        "with custom message if match object is undefined",
        "Assertions 123",
        undefined,
        "No"
    );

    fail("if match object is false", "Assertions 123", false);
    fail("if matching a number against a string", "Assertions 123", 23);
    fail("if matching a number against a similar string", "23", 23);
    pass("if matching a number against itself", 23, 23);

    pass(
        "if matcher is a function that returns true",
        "Assertions 123",
        function() {
            return true;
        }
    );

    fail(
        "if matcher is a function that returns false",
        "Assertions 123",
        function() {
            return false;
        }
    );

    fail(
        "if matcher is a function that returns falsy",
        "Assertions 123",
        function() {}
    );

    fail(
        "if matcher does not return explicit true",
        "Assertions 123",
        function() {
            return "Hey";
        }
    );

    this["should call matcher with assertion argument"] = function() {
        var listener = this.stub().returns(true);

        referee.assert.match("Assertions 123", listener);

        sinon.assert.calledWith(listener, "Assertions 123");
    };

    pass("if matcher is substring of matchee", "Diskord", "or");
    pass("if matcher is string equal to matchee", "Diskord", "Diskord");
    pass(
        "for strings ignoring case",
        "Look ma, case-insensitive",
        "LoOk Ma, CaSe-InSenSiTiVe"
    );

    fail("if match string is not substring of matchee", "Vim", "Emacs");
    fail("if match string is not substring of object", {}, "Emacs");

    fail("if matcher is substring of object.toString", "Emacs", {
        toString: function() {
            return "Emacs";
        }
    });

    fail("for null and empty string", null, "");
    fail("for undefined and empty string", undefined, "");
    fail("for false and empty string", false, "");
    fail("for 0 and empty string", 0, "");
    fail("for NaN and empty string", NaN, "");

    var object = {
        id: 42,
        name: "Christian",
        doIt: "yes",

        speak: function() {
            return this.name;
        }
    };

    pass("if object contains all properties in matcher", object, {
        id: 42,
        doIt: "yes"
    });

    var object2 = {
        id: 42,
        name: "Christian",
        doIt: "yes",
        owner: {
            someDude: "Yes",
            hello: "ok"
        },

        speak: function() {
            return this.name;
        }
    };

    pass("for nested matcher", object2, {
        owner: {
            someDude: "Yes",
            hello: function(value) {
                return value === "ok";
            }
        }
    });

    pass("for empty strings", "", "");
    pass("for empty strings as object properties", { foo: "" }, { foo: "" });
    pass("for similar arrays", [1, 2, 3], [1, 2, 3]);
    pass("for array subset", [1, 2, 3], [2, 3]);
    pass("for single-element array subset", [1, 2, 3], [1]);
    pass("for matching array subset", [1, 2, 3, { id: 42 }], [{ id: 42 }]);
    fail("for mis-matching array 'subset'", [1, 2, 3], [2, 3, 4]);
    fail("for mis-ordered array 'subset'", [1, 2, 3], [1, 3]);

    error(
        "if match string is not substring of matchee",
        {
            code: "ERR_ASSERTION",
            actual: "Vim",
            expected: "Emacs",
            operator: "assert.match"
        },
        "Vim",
        "Emacs"
    );
    error(
        "if object does not contain all properties in matcher",
        {
            code: "ERR_ASSERTION",
            actual: { id: 42, doIt: "yes" },
            expected: { id: 42, doIt: "no" },
            operator: "assert.match"
        },
        object,
        {
            id: 42,
            doIt: "no"
        }
    );
});

testHelper.assertionTests("refute", "match", function(pass, fail, msg, error) {
    fail("matching regexp", "Assertions", /[a-z]/);
    fail("generic object with test method returning true", "Assertions", {
        test: function() {
            return true;
        }
    });

    pass("for non-matching regexp", "Assertions 123", /^[a-z]$/);

    pass("for generic object with test method returning false", "Assertions", {
        test: function() {
            return false;
        }
    });

    msg(
        "fail with understandable message",
        "[refute.match] Assertions 123 expected not to match /^.+$/",
        "Assertions 123",
        /^.+$/
    );
    msg(
        "fail with custom message",
        "[refute.match] NO! Assertions 123 expected not to match /^.+$/",
        "Assertions 123",
        /^.+$/,
        "NO!"
    );

    pass("if match object is null", "Assertions 123", null);
    pass("if match object is undefined", "Assertions 123", undefined);
    pass("if match object is false", "Assertions 123", false);
    pass("if matching a number against a string", "Assertions 123", 23);
    fail("if matching a number against a similar string", 23, "23");
    fail("if matching a number against itself", 23, 23);
    fail(
        "if matcher is a function that returns true",
        "Assertions 123",
        function() {
            return true;
        }
    );

    pass(
        "if matcher is a function that returns false",
        "Assertions 123",
        function() {
            return false;
        }
    );

    pass(
        "if matcher is a function that returns falsy",
        "Assertions 123",
        function() {}
    );

    pass(
        "if matcher does not return explicit true",
        "Assertions 123",
        function() {
            return "Hey";
        }
    );

    this["should call matcher with assertion argument"] = function() {
        var listener = this.stub().returns(false);

        referee.refute.match("Assertions 123", listener);

        sinon.assert.calledWith(listener, "Assertions 123");
    };

    fail("if matcher is substring of matchee", "Diskord", "or");
    fail("if matcher is string equal to matchee", "Diskord", "Diskord");
    pass("if match string is not substring of matchee", "Vim", "Emacs");
    pass("if match string is not substring of object", {}, "Emacs");

    pass("if matcher is substring of object.toString", "Emacs", {
        toString: function() {
            return "Emacs";
        }
    });

    pass("if matching an empty string with null", null, "");
    pass("if matching an empty string with undefined", undefined, "");
    pass("if matching an empty string with false", false, "");
    pass("if matching an empty string with 0", 0, "");
    pass("if matching an empty string with NaN", NaN, "");

    var object = {
        id: 42,
        name: "Christian",
        doIt: "yes",

        speak: function() {
            return this.name;
        }
    };

    fail("if object contains all properties in matcher", object, {
        id: 42,
        doIt: "yes"
    });

    var object2 = {
        id: 42,
        name: "Christian",
        doIt: "yes",
        owner: {
            someDude: "Yes",
            hello: "ok"
        },

        speak: function() {
            return this.name;
        }
    };

    fail("for nested matcher", object2, {
        owner: {
            someDude: "Yes",
            hello: function(value) {
                return value === "ok";
            }
        }
    });

    var object3 = {
        id: 42,
        name: "Christian",
        doIt: "yes",
        owner: {
            someDude: "Yes",
            hello: "ok"
        },

        speak: function() {
            return this.name;
        }
    };

    pass("for nested matcher with mismatching properties", object3, {
        owner: {
            someDude: "No",
            hello: function(value) {
                return value === "ok";
            }
        }
    });

    fail("for similar arrays", [1, 2, 3], [1, 2, 3]);
    fail("for array subset", [1, 2, 3], [2, 3]);
    fail("for single-element array subset", [1, 2, 3], [1]);
    fail("for matching array subset", [1, 2, 3, { id: 42 }], [{ id: 42 }]);
    pass("for mis-matching array 'subset'", [1, 2, 3], [2, 3, 4]);
    pass("for mis-ordered array 'subset'", [1, 2, 3], [1, 3]);

    error(
        "if match string is substring of matchee",
        {
            code: "ERR_ASSERTION",
            operator: "refute.match"
        },
        "Emacs",
        "mac"
    );
});

testHelper.assertionTests("assert", "keys", function(pass, fail, msg, error) {
    function Class(o) {
        for (var key in o) {
            if (o.hasOwnProperty(key)) {
                this[key] = o[key];
            }
        }
    }
    Class.prototype.methodA = function() {};
    Class.prototype.methodB = function() {};

    pass("when keys are exact", { a: 1, b: 2, c: 3 }, ["a", "b", "c"]);
    fail("when keys are missing", { a: 1, b: 2, c: 3 }, ["a", "b"]);
    fail("when keys are excess", { a: 1, b: 2, c: 3 }, ["a", "b", "c", "d"]);
    fail("when keys are not exact", { a: 1, b: 2, c: 3 }, ["a", "b", "d"]);
    pass("when there are no keys", {}, []);
    pass("when values are special", { a: -1, b: null, c: undefined }, [
        "a",
        "b",
        "c"
    ]);
    pass("and ignore object methods", new Class({ a: 1, b: 2, c: 3 }), [
        "a",
        "b",
        "c"
    ]);
    pass(
        "and allow overwriting object methods",
        new Class({ a: 1, methodA: 2 }),
        ["a", "methodA"]
    );

    msg(
        "fail with message",
        '[assert.keys] Expected { a: 1, b: 2, c: 3 } to have exact keys ["a", "b"]',
        { a: 1, b: 2, c: 3 },
        ["a", "b"]
    );

    msg(
        "fail with custom message",
        '[assert.keys] Too bad: Expected { a: 1, b: 2, c: 3 } to have exact keys ["a", "b"]',
        { a: 1, b: 2, c: 3 },
        ["a", "b"],
        "Too bad"
    );

    error(
        "when keys are missing",
        {
            code: "ERR_ASSERTION",
            actual: ["a", "b", "c"],
            expected: ["a", "b"],
            operator: "assert.keys"
        },
        { a: 1, b: 2, c: 3 },
        ["a", "b"]
    );
});

testHelper.assertionTests("refute", "keys", function(pass, fail, msg, error) {
    function Class(o) {
        for (var key in o) {
            if (o.hasOwnProperty(key)) {
                this[key] = o[key];
            }
        }
    }
    Class.prototype.methodA = function() {};
    Class.prototype.methodB = function() {};

    fail("when keys are exact", { a: 1, b: 2, c: 3 }, ["a", "b", "c"]);
    pass("when keys are missing", { a: 1, b: 2, c: 3 }, ["a", "b"]);
    pass("when keys are excess", { a: 1, b: 2, c: 3 }, ["a", "b", "c", "d"]);
    pass("when keys are not exact", { a: 1, b: 2, c: 3 }, ["a", "b", "d"]);
    fail("when there are no keys", {}, []);
    fail("when values are special", { a: -1, b: null, c: undefined }, [
        "a",
        "b",
        "c"
    ]);
    fail("and ignore object methods", new Class({ a: 1, b: 2, c: 3 }), [
        "a",
        "b",
        "c"
    ]);
    fail(
        "and allow overwriting object methods",
        new Class({ a: 1, methodA: 2 }),
        ["a", "methodA"]
    );

    msg(
        "fail with message",
        '[refute.keys] Expected not to have exact keys ["a", "b", "c"]',
        { a: 1, b: 2, c: 3 },
        ["a", "b", "c"]
    );

    msg(
        "fail with custom message",
        '[refute.keys] Too bad: Expected not to have exact keys ["a", "b", "c"]',
        { a: 1, b: 2, c: 3 },
        ["a", "b", "c"],
        "Too bad"
    );
    error(
        "when keys are exact",
        {
            code: "ERR_ASSERTION",
            operator: "refute.keys"
        },
        { a: 1, b: 2, c: 3 },
        ["a", "b", "c"]
    );
});

testHelper.assertionTests("assert", "exception", function(pass, fail, msg) {
    pass("when callback throws", function() {
        throw new Error();
    });
    fail("when callback does not throw", function() {});

    msg(
        "fail with message",
        "[assert.exception] Expected exception",
        function() {}
    );

    pass(
        "when callback throws expected name",
        function() {
            throw new TypeError("Oh hmm");
        },
        { name: "TypeError" }
    );

    fail(
        "when callback does not throw expected name",
        function() {
            throw new Error();
        },
        { name: "TypeError" }
    );

    fail(
        "when thrown message does not match",
        function() {
            throw new Error("Aright");
        },
        { message: "Aww" }
    );

    pass(
        "when message and type matches",
        function() {
            throw new TypeError("Aright");
        },
        { name: "Type", message: "Ar" }
    );

    fail(
        "when callback does not throw and specific type is expected",
        function() {},
        { name: "TypeError" }
    );

    msg(
        "fail with message when not throwing",
        '[assert.exception] Expected { name: "TypeError" } but no exception was thrown',
        function() {},
        { name: "TypeError" }
    );

    msg(
        "fail with custom message",
        "[assert.exception] Hmm: Expected exception",
        function() {},
        "Hmm"
    );

    msg(
        "fail with matcher and custom message",
        '[assert.exception] Hmm: Expected { name: "TypeError" } but no exception was thrown',
        function() {},
        { name: "TypeError" },
        "Hmm"
    );

    pass(
        "when matcher function returns true",
        function() {
            throw new TypeError("Aright");
        },
        function(err) {
            return err.name === "TypeError";
        }
    );

    fail(
        "when matcher function returns truthy",
        function() {
            throw new TypeError("Aright");
        },
        function(err) {
            return err.name;
        }
    );

    fail(
        "when matcher function returns false",
        function() {
            throw new TypeError("Aright");
        },
        function(err) {
            return err.name === "Error";
        }
    );

    msg(
        "when matcher function fails",
        "[assert.exception] Expected thrown TypeError (Aright) to pass matcher function",
        function() {
            throw new TypeError("Aright");
        },
        function(err) {
            return err.name === "Error";
        }
    );

    msg(
        "if not passed arguments",
        "[assert.exception] Expected to receive at least 1 argument"
    );
});

testHelper.assertionTests("refute", "exception", function(pass, fail, msg) {
    fail("when callback throws", function() {
        throw new Error("Yo, Malcolm");
    });

    pass("when callback does not throw", function() {});
    pass("with message when callback does not throw", function() {}, "Oh noes");

    msg(
        "fail with message",
        "[refute.exception] Expected not to throw but threw Error (:()",
        function() {
            throw new Error(":(");
        }
    );

    msg(
        "fail with custom message",
        "[refute.exception] Jeez: Expected not to throw but threw Error (:()",
        function() {
            throw new Error(":(");
        },
        "Jeez"
    );

    msg(
        "fail if not passed arguments",
        "[refute.exception] Expected to receive at least 1 argument"
    );
});

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

testHelper.assertionTests("assert", "near", function(pass, fail, msg, error) {
    pass("for equal numbers", 3, 3, 0);
    fail("for numbers out of delta range", 2, 3, 0.5);
    msg(
        "fail with descriptive message",
        "[assert.near] Expected 3 to be equal to 2 +/- 0.6",
        3,
        2,
        0.6
    );
    msg(
        "fail with custom message",
        "[assert.near] Ho! Expected 3 to be equal to 2 +/- 0.6",
        3,
        2,
        0.6,
        "Ho!"
    );
    pass("for numbers in delta range", 2, 3, 1);
    msg(
        "fail if not passed arguments",
        "[assert.near] Expected to receive at least 3 arguments"
    );
    error(
        "for numbers out of delta range",
        {
            code: "ERR_ASSERTION",
            actual: 2,
            expected: 3,
            operator: "assert.near"
        },
        2,
        3,
        0.5
    );
});

testHelper.assertionTests("refute", "near", function(pass, fail, msg, error) {
    fail("for equal numbers", 3, 3, 0);
    pass("for numbers out of delta range", 2, 3, 0.5);
    msg(
        "with descriptive message",
        "[refute.near] Expected 3 not to be equal to 3 +/- 0",
        3,
        3,
        0
    );
    msg(
        "with custom message",
        "[refute.near] Hey: Expected 3 not to be equal to 3 +/- 0",
        3,
        3,
        0,
        "Hey"
    );
    fail("for numbers in delta range", 2, 3, 1);
    msg(
        "fail if not passed arguments",
        "[refute.near] Expected to receive at least 3 arguments"
    );
    error(
        "for equal numbers",
        {
            code: "ERR_ASSERTION",
            operator: "refute.near"
        },
        3,
        3,
        0
    );
});

function MyThing() {}
var myThing = new MyThing();
var otherThing = {};
function F() {}
F.prototype = myThing;
var specializedThing = new F();

testHelper.assertionTests("assert", "hasPrototype", function(
    pass,
    fail,
    msg,
    error
) {
    fail(
        "when object does not inherit from prototype",
        otherThing,
        MyThing.prototype
    );
    fail(
        "when primitive does not inherit from prototype",
        3,
        MyThing.prototype
    );
    fail("with only one object", {});
    pass(
        "when object has other object on prototype chain",
        myThing,
        MyThing.prototype
    );
    pass("when not directly inheriting", specializedThing, MyThing.prototype);
    msg(
        "with descriptive message",
        "[assert.hasPrototype] Expected {  } to have [MyThing] {  } on its prototype chain",
        otherThing,
        MyThing.prototype
    );
    msg(
        "with custom message",
        "[assert.hasPrototype] Oh: Expected {  } to have [MyThing] {  } on its prototype chain",
        otherThing,
        MyThing.prototype,
        "Oh"
    );
    msg(
        "fail if not passed arguments",
        "[assert.hasPrototype] Expected to receive at least 2 arguments"
    );
    error(
        "when object does not inherit from prototype",
        {
            code: "ERR_ASSERTION",
            actual: otherThing,
            expected: MyThing.prototype,
            operator: "assert.hasPrototype"
        },
        otherThing,
        MyThing.prototype
    );
});

testHelper.assertionTests("refute", "hasPrototype", function(
    pass,
    fail,
    msg,
    error
) {
    fail("when object inherits from prototype", myThing, MyThing.prototype);
    fail(
        "when not inheriting 'indirectly'",
        specializedThing,
        MyThing.prototype
    );
    fail("with only one object", {});
    pass(
        "when primitive does not inherit from prototype",
        3,
        MyThing.prototype
    );
    pass("when object does not inherit", otherThing, MyThing.prototype);
    msg(
        "with descriptive message",
        "[refute.hasPrototype] Expected [MyThing] {  } not to have [MyThing] {  } on its prototype chain",
        myThing,
        MyThing.prototype
    );
    msg(
        "with descriptive message",
        "[refute.hasPrototype] Oh: Expected [MyThing] {  } not to have [MyThing] {  } on its prototype chain",
        myThing,
        MyThing.prototype,
        "Oh"
    );
    msg(
        "fail if not passed arguments",
        "[refute.hasPrototype] Expected to receive at least 2 arguments"
    );
    error(
        "when object inherits from prototype",
        {
            code: "ERR_ASSERTION",
            operator: "refute.hasPrototype"
        },
        myThing,
        MyThing.prototype
    );
});

testHelper.assertionTests("assert", "contains", function(
    pass,
    fail,
    msg,
    error
) {
    pass("when array contains value", [0, 1, 2], 1);
    fail("when array does not contain value", [0, 1, 2], 3);
    msg(
        "with descriptive message",
        "[assert.contains] Expected [0, 1, 2] to contain 3",
        [0, 1, 2],
        3
    );
    var thing = {};
    var someOtherThing = {};
    pass("when array contains the actual object", [thing], thing);
    fail(
        "when array contains different object with same value",
        [thing],
        someOtherThing
    );
    error(
        "when array does not contain value",
        {
            code: "ERR_ASSERTION",
            actual: [0, 1, 2],
            expected: 3,
            operator: "assert.contains"
        },
        [0, 1, 2],
        3
    );
});

testHelper.assertionTests("refute", "contains", function(
    pass,
    fail,
    msg,
    error
) {
    fail("when array contains value", [0, 1, 2], 1);
    pass("when array does not contain value", [0, 1, 2], 3);
    msg(
        "with descriptive message",
        "[refute.contains] Expected [0, 1, 2] not to contain 2",
        [0, 1, 2],
        2
    );
    var thing = {};
    var someOtherThing = {};
    fail("when array contains the actual object", [thing], thing);
    pass(
        "when array contains different object with same value",
        [thing],
        someOtherThing
    );
    error(
        "when array contains value",
        {
            code: "ERR_ASSERTION",
            operator: "refute.contains"
        },
        [0, 1, 2],
        1
    );
});

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
