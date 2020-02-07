"use strict";

var assert = require("assert");
var samsam = require("@sinonjs/samsam");
var sinon = require("sinon");

var referee = require("../referee");

describe("assert.match", function() {
    it("should pass for matching regexp", function() {
        referee.assert.match("Assertions", /[a-z]/);
    });

    it("should pass for generic object with test method returning true", function() {
        referee.assert.match("Assertions", {
            test: sinon.fake.returns(true)
        });
    });

    it("should pass matching boolean", function() {
        referee.assert.match(true, true);
        referee.assert.match(false, false);
    });

    it("should pass if matching a number against itself", function() {
        referee.assert.match(23, 23);
    });

    it("should pass if matcher is a function that returns true", function() {
        referee.assert.match("Assertions 123", sinon.fake.returns(true));
    });

    it("should call matcher with assertion argument", function() {
        var listener = sinon.fake.returns(true);

        referee.assert.match("Assertions 123", listener);

        sinon.assert.calledWith(listener, "Assertions 123");
    });

    it("should pass if matcher is substring of matchee", function() {
        referee.assert.match("Diskord", "or");
    });

    it("should pass if matcher is string equal to matchee", function() {
        referee.assert.match("Diskord", "Diskord");
    });

    it("should pass for strings ignoring case", function() {
        referee.assert.match(
            "Look ma, case-insensitive",
            "LoOk Ma, CaSe-InSenSiTiVe"
        );
    });

    it("should pass if object contains all properties in matcher", function() {
        var object = {
            id: 42,
            name: "Christian",
            doIt: "yes",

            speak: function() {
                return this.name;
            }
        };
        var matcher = {
            id: 42,
            doIt: "yes"
        };

        referee.assert.match(object, matcher);
    });

    it("should pass for nested matcher", function() {
        var object = {
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
        var matcher = {
            owner: {
                someDude: "Yes",
                hello: samsam.createMatcher(function(value) {
                    return value === "ok";
                })
            }
        };

        referee.assert.match(object, matcher);
    });

    it("should pass for empty strings", function() {
        referee.assert.match("", "");
    });

    it("should pass for empty strings as object properties", function() {
        referee.assert.match({ foo: "" }, { foo: "" });
    });

    it("should pass for similar arrays", function() {
        referee.assert.match([1, 2, 3], [1, 2, 3]);
    });

    it("should pass for array subset", function() {
        referee.assert.match([1, 2, 3], [2, 3]);
    });

    it("for single-element array subset", function() {
        referee.assert.match([1, 2, 3], [1]);
    });

    it("for matching array subset", function() {
        referee.assert.match([1, 2, 3, { id: 42 }], [{ id: 42 }]);
    });

    it("should fail for non-matching regexp", function() {
        assert.throws(
            function() {
                referee.assert.match("Assertions 123", /^[a-z]$/);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.match] 'Assertions 123' expected to match /^[a-z]$/"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.match");
                return true;
            }
        );
    });

    it("should fail for mis-matching boolean", function() {
        assert.throws(
            function() {
                referee.assert.match(true, false);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.match] true expected to match false"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.match");
                return true;
            }
        );
    });

    it("should fail for generic object with test method returning false", function() {
        assert.throws(
            function() {
                referee.assert.match("Assertions", {
                    test: sinon.fake.returns(false)
                });
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");

                var r = new RegExp(
                    "\\[assert.match\\] 'Assertions' expected to match \\{\n" +
                        "  test: \\[Function: f\\] \\{\n" +
                        "    displayName: 'fake',\n" +
                        "    id: 'fake#\\d+',\n" +
                        "    callback: undefined\n" +
                        "  \\}\n" +
                        "\\}"
                );

                assert(r.test(error.message));

                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.match");
                return true;
            }
        );
    });

    it("should fail for mis-matching array", function() {
        assert.throws(
            function() {
                referee.assert.match([1, 2, 3], [2, 3, 4]);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.match] [ 1, 2, 3 ] expected to match [ 2, 3, 4 ]"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.match");
                return true;
            }
        );
    });

    it("should fail for mis-ordered array 'subset'", function() {
        assert.throws(
            function() {
                referee.assert.match([1, 2, 3], [1, 3]);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.match] [ 1, 2, 3 ] expected to match [ 1, 3 ]"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.match");
                return true;
            }
        );
    });

    it("should fail with custom message", function() {
        var message = "2ea8ea3b-9a13-4f45-aa54-19e58f12a460";

        assert.throws(
            function() {
                referee.assert.match(true, false, message);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.match] " +
                        message +
                        ": true expected to match false"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.match");
                return true;
            }
        );
    });

    it("should fail when match object is null", function() {
        assert.throws(
            function() {
                referee.assert.match("Assertions 123", null);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.match] 'Assertions 123' expected to match null"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.match");
                return true;
            }
        );
    });

    it("should fail when match object is undefined", function() {
        assert.throws(
            function() {
                referee.assert.match("Assertions 123", undefined);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.match] 'Assertions 123' expected to match undefined"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.match");
                return true;
            }
        );
    });

    it("should fail with custom message when match object is undefined", function() {
        var message = "a6801b52-f6fd-4e26-906a-f596b3d38156";

        assert.throws(
            function() {
                referee.assert.match("Assertions 123", undefined, message);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.match] " +
                        message +
                        ": 'Assertions 123' expected to match undefined"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.match");
                return true;
            }
        );
    });

    it("should fail when match object is false", function() {
        assert.throws(
            function() {
                referee.assert.match("Assertions 123", false);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.match] 'Assertions 123' expected to match false"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.match");
                return true;
            }
        );
    });

    it("should fail when matching a number against a string", function() {
        assert.throws(
            function() {
                referee.assert.match("Assertions 123", 23);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.match] 'Assertions 123' expected to match 23"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.match");
                return true;
            }
        );
    });

    it("should fail when matching a number against a similar string", function() {
        assert.throws(
            function() {
                referee.assert.match("23", 23);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.match] '23' expected to match 23"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.match");
                return true;
            }
        );
    });

    it("should fail when matcher is a function that returns false", function() {
        assert.throws(
            function() {
                referee.assert.match("23", sinon.fake.returns(false));
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                var r = new RegExp(
                    "\\[assert.match\\] '23' expected to match \\[Function: f\\] \\{ displayName: 'fake', id: 'fake#\\d+', callback: undefined \\}"
                );
                assert(r.test(error.message));
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.match");
                return true;
            }
        );
    });

    // verify all falsy values
    [false, "", 0, null, undefined].forEach(function(value) {
        it(
            "should fail when matcher is a function that returns" + value,
            function() {
                assert.throws(
                    function() {
                        referee.assert.match("23", sinon.fake.returns(value));
                    },
                    function(error) {
                        assert.equal(error.code, "ERR_ASSERTION");
                        assert(
                            error.message.indexOf(
                                "[assert.match] '23' expected to match [Function: f] {"
                            ) === 0
                        );
                        assert.equal(error.name, "AssertionError");
                        assert.equal(error.operator, "assert.match");
                        return true;
                    }
                );
            }
        );
    });

    it("should fail when matcher does not return explicit true", function() {
        assert.throws(
            function() {
                referee.assert.match("23", function() {
                    return "Hey";
                });
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.match] '23' expected to match [Function]"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.match");
                return true;
            }
        );
    });

    it("should fail when match string is not substring of matchee", function() {
        assert.throws(
            function() {
                referee.assert.match("Vim", "Emacs");
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.match] 'Vim' expected to match 'Emacs'"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.match");
                return true;
            }
        );
    });

    it("should fail when match string is not substring of object", function() {
        assert.throws(
            function() {
                referee.assert.match({}, "Emacs");
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.match] {} expected to match 'Emacs'"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.match");
                return true;
            }
        );
    });

    it("should fail matcher is substring of object.toString", function() {
        assert.throws(
            function() {
                referee.assert.match("Emacs", {
                    toString: function() {
                        return "Emacs";
                    }
                });
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.match] 'Emacs' expected to match { toString: [Function: toString] }"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.match");
                return true;
            }
        );
    });

    [null, undefined, false, 0, NaN].forEach(function(value) {
        it("should fail for " + value + " and empty string", function() {
            assert.throws(
                function() {
                    referee.assert.match(value, "");
                },
                function(error) {
                    assert.equal(error.code, "ERR_ASSERTION");
                    assert.equal(
                        error.message,
                        "[assert.match] " + value + " expected to match ''"
                    );
                    assert.equal(error.name, "AssertionError");
                    assert.equal(error.operator, "assert.match");
                    return true;
                }
            );
        });
    });

    it("should fail when object does not contain all properties in matcher", function() {
        assert.throws(
            function() {
                referee.assert.match({ id: 42 }, { id: 42, name: "Apple pie" });
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.match] { id: 42, name: undefined } expected to match { id: 42, name: 'Apple pie' }"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.match");
                return true;
            }
        );
    });
});

describe("refute.match", function() {
    it("should fail for matching regexp", function() {
        assert.throws(
            function() {
                referee.refute.match("Assertions", /[a-z]/);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.match] 'Assertions' expected not to match /[a-z]/"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.match");
                return true;
            }
        );
    });

    it("should fail for generic object with test method returning true", function() {
        assert.throws(
            function() {
                referee.refute.match("Assertions", {
                    test: sinon.fake.returns(true)
                });
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.match] 'Assertions' expected not to match {\n" +
                        "  test: [Function: f] {\n" +
                        "    displayName: 'fake',\n" +
                        "    id: 'fake#14',\n" +
                        "    callback: undefined\n" +
                        "  }\n" +
                        "}"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.match");
                return true;
            }
        );
    });

    it("should pass for non-matching regexp", function() {
        referee.refute.match("Assertions 123", /^[a-z]$/);
    });

    it("should pass for generic object with test method returning false", function() {
        referee.refute.match("Assertions", {
            test: sinon.fake.returns(false)
        });
    });

    it("should fail for with custom message", function() {
        var message = "8998cc8e-615a-4c29-bbe5-77888b287d9a";

        assert.throws(
            function() {
                referee.refute.match(true, true, message);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.match] " +
                        message +
                        ": true expected not to match true"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.match");
                return true;
            }
        );
    });

    [null, undefined, false].forEach(function(value) {
        it("should pass when match object is " + value, function() {
            referee.refute.match("Assertions 123", value);
        });
    });

    it("should pass when matching a number against a string", function() {
        referee.refute.match("Assertions 23", 23);
    });

    it("should fail when matching a number against a similar string", function() {
        assert.throws(
            function() {
                referee.refute.match(23, "23");
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.match] 23 expected not to match '23'"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.match");
                return true;
            }
        );
    });

    it("should fail when matching a number against itself", function() {
        assert.throws(
            function() {
                referee.refute.match(23, 23);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.match] 23 expected not to match 23"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.match");
                return true;
            }
        );
    });

    it("should fail when matcher is a function that returns true", function() {
        assert.throws(
            function() {
                referee.refute.match(
                    "Assertions 123",
                    sinon.fake.returns(true)
                );
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.match] 'Assertions 123' expected not to match [Function: f] {\n" +
                        "  displayName: 'fake',\n" +
                        "  id: 'fake#16',\n" +
                        "  callback: undefined\n" +
                        "}"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.match");
                return true;
            }
        );
    });

    // verify all falsy values
    [false, "", 0, null, undefined].forEach(function(value) {
        it(
            "should pass matcher is a function that returns " + value,
            function() {
                referee.refute.match(
                    "Assertions 123",
                    sinon.fake.returns(value)
                );
            }
        );
    });

    it("should pass when matcher does not return explicit true", function() {
        referee.refute.match("Assertions 123", function() {
            return "Hey";
        });
    });

    it("should call matcher wtih assertion argument", function() {
        var actual = "Assertions 123";
        var listener = sinon.fake();

        referee.refute.match(actual, listener);

        sinon.assert.calledWith(listener, actual);
    });

    it("should fail when matcher is substring of matchee", function() {
        assert.throws(
            function() {
                referee.refute.match("Diskord", "or");
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.match] 'Diskord' expected not to match 'or'"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.match");
                return true;
            }
        );
    });

    it("should fail when matcher is string equal to matchee", function() {
        assert.throws(
            function() {
                referee.refute.match("Diskord", "Diskord");
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.match] 'Diskord' expected not to match 'Diskord'"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.match");
                return true;
            }
        );
    });

    it("should pass when match string is not substring of matchee", function() {
        referee.refute.match("Vim", "Emacs");
    });

    it("should pass when match string is not substring of object", function() {
        referee.refute.match("Vim", {
            toString: sinon.fake.returns("Emacs")
        });
    });

    [null, undefined, false, 0, NaN].forEach(function(value) {
        it(
            "should pass when matching an empty string with " + value,
            function() {
                referee.refute.match("", value);
            }
        );
    });

    it("should fail when object contains all properties in matcher", function() {
        assert.throws(
            function() {
                var object = {
                    id: 42,
                    name: "Christian",
                    doIt: "yes",

                    speak: function() {
                        return this.name;
                    }
                };
                var matcher = {
                    id: 42,
                    doIt: "yes"
                };

                referee.refute.match(object, matcher);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.match] { id: 42, doIt: 'yes' } expected not to match { id: 42, doIt: 'yes' }"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.match");
                return true;
            }
        );
    });

    it("should fail for nested matcher", function() {
        assert.throws(
            function() {
                var object = {
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
                var matcher = {
                    owner: {
                        someDude: "Yes",
                        hello: samsam.createMatcher(function(value) {
                            return value === "ok";
                        })
                    }
                };

                referee.refute.match(object, matcher);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.match] { owner: { someDude: 'Yes', hello: 'ok' } } expected not to match {\n" +
                        "  owner: {\n" +
                        "    someDude: 'Yes',\n" +
                        "    hello: { test: [Function], message: 'match(undefined)' }\n" +
                        "  }\n" +
                        "}"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.match");
                return true;
            }
        );
    });

    it("should pass for nested matcher with mismatching properties", function() {
        var object = {
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
        var matcher = {
            owner: {
                someDude: "No",
                hello: function(value) {
                    return value === "ok";
                }
            }
        };

        referee.refute.match(object, matcher);
    });

    it("fail for similar arrays", function() {
        assert.throws(
            function() {
                referee.refute.match([1, 2, 3], [1, 2, 3]);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.match] [ 1, 2, 3 ] expected not to match [ 1, 2, 3 ]"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.match");
                return true;
            }
        );
    });

    it("for array subset", function() {
        assert.throws(
            function() {
                referee.refute.match([1, 2, 3], [2, 3]);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.match] [ 1, 2, 3 ] expected not to match [ 2, 3 ]"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.match");
                return true;
            }
        );
    });

    it("for single-element array subset", function() {
        assert.throws(
            function() {
                referee.refute.match([1, 2, 3], [1]);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.match] [ 1, 2, 3 ] expected not to match [ 1 ]"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.match");
                return true;
            }
        );
    });

    it("should fail for matching array subset", function() {
        assert.throws(
            function() {
                referee.refute.match([1, 2, 3, { id: 42 }], [{ id: 42 }]);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.match] [ 1, 2, 3, { id: 42 } ] expected not to match [ { id: 42 } ]"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.match");
                return true;
            }
        );
    });

    it("should pass for mis-matching array 'subset'", function() {
        referee.refute.match([1, 2, 3], [2, 3, 4]);
    });

    it("should pass for mis-ordered array 'subset'", function() {
        referee.refute.match([1, 2, 3], [1, 3]);
    });

    it("should fail when match string is substring of matchee", function() {
        assert.throws(
            function() {
                referee.refute.match("Emacs", "mac");
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.match] 'Emacs' expected not to match 'mac'"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.match");
                return true;
            }
        );
    });
});
