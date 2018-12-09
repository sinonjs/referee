"use strict";

var samsam = require("@sinonjs/samsam");
var sinon = require("sinon");

var referee = require("../referee");
var testHelper = require("../test-helper");

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
            hello: samsam.createMatcher(function(value) {
                return value === "ok";
            })
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
            hello: samsam.createMatcher(function(value) {
                return value === "ok";
            })
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
