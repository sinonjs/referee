"use strict";

var assert = require("assert");
var referee = require("../referee");

describe("assert.className", function() {
    it("should fail without arguments", function() {
        assert.throws(
            function() {
                referee.assert.className();
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.className] Expected to receive at least 2 argument(s)"
                );
                assert.equal(error.name, "AssertionError");
                return true;
            }
        );
    });

    it("should fail without class name", function() {
        assert.throws(
            function() {
                referee.assert.className({ className: "" });
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.className] Expected to receive at least 2 argument(s)"
                );
                assert.equal(error.name, "AssertionError");
                return true;
            }
        );
    });

    it("should fail if object does not have className property", function() {
        assert.throws(
            function() {
                referee.assert.className({}, "item");
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.className] Expected object to have className property"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.className");
                return true;
            }
        );
    });

    it("should fail with custom message", function() {
        assert.throws(
            function() {
                referee.assert.className({ className: "" }, "item", "Nope");
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.className] Nope: Expected object's className to include item but was (empty string)"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.className");
                return true;
            }
        );
    });

    it("should pass when element's class name matches", function() {
        referee.assert.className({ className: "item" }, "item");
    });

    it("should pass when element includes class name", function() {
        referee.assert.className({ className: "feed item" }, "item");
    });

    it("should fail when element does not include all class names", function() {
        assert.throws(
            function() {
                referee.assert.className(
                    { className: "feed item" },
                    "item post"
                );
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.className] Expected object's className to include item post but was feed item"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.className");
                return true;
            }
        );
    });

    it("should pass when element includes all class names", function() {
        referee.assert.className({ className: "feed item post" }, "item post");
    });

    it("should pass when element includes all class names in different order", function() {
        referee.assert.className({ className: "a b c d e" }, "e a d");
    });

    it("should pass when class names as array", function() {
        referee.assert.className({ className: "a b c d e" }, ["e", "a", "d"]);
    });

    if (typeof document !== "undefined") {
        it("should pass for DOM elements", function() {
            var li = document.createElement("li");
            li.className = "some thing in here";

            referee.assert.className(li, "thing some");
        });
    }
});

describe("refute.className", function() {
    it("should fail without arguments", function() {
        assert.throws(
            function() {
                referee.refute.className();
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.className] Expected to receive at least 2 argument(s)"
                );
                assert.equal(error.name, "AssertionError");
                return true;
            }
        );
    });

    it("should fail without class name", function() {
        assert.throws(
            function() {
                referee.refute.className({ className: "" });
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.className] Expected to receive at least 2 argument(s)"
                );
                assert.equal(error.name, "AssertionError");
                return true;
            }
        );
    });

    it("should fail if object does not have className property", function() {
        assert.throws(
            function() {
                referee.refute.className({}, "item");
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.className] Expected object to have className property"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.className");
                return true;
            }
        );
    });

    it("should fail with custom message", function() {
        assert.throws(
            function() {
                referee.refute.className({}, "item", "Nope");
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.className] Nope: Expected object to have className property"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.className");
                return true;
            }
        );
    });

    it("should pass when element does not include class name", function() {
        referee.refute.className({ className: "" }, "item");
    });

    it("should fail when element's class name matches", function() {
        assert.throws(
            function() {
                referee.refute.className({ className: "item" }, "item");
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.className] Expected object's className not to include item"
                );
                assert.equal(error.name, "AssertionError");
                return true;
            }
        );
    });

    it("should fail with custom message when element's class name matches", function() {
        var message = "a057671b-5f94-46e8-b668-9f7e455ade63";

        assert.throws(
            function() {
                referee.refute.className(
                    { className: "item" },
                    "item",
                    message
                );
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.className] " +
                        message +
                        ": Expected object's className not to include item"
                );
                assert.equal(error.name, "AssertionError");
                return true;
            }
        );
    });

    it("should fail when element includes class name", function() {
        assert.throws(
            function() {
                referee.refute.className({ className: "feed item" }, "item");
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.className] Expected object's className not to include item"
                );
                assert.equal(error.name, "AssertionError");
                return true;
            }
        );
    });

    it("should pass when element does not include all class names", function() {
        referee.refute.className({ className: "feed item" }, "item post");
    });

    it("should fail when element includes all class names", function() {
        assert.throws(
            function() {
                referee.refute.className(
                    { className: "feed item post" },
                    "item post"
                );
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.className] Expected object's className not to include item post"
                );
                assert.equal(error.name, "AssertionError");
                return true;
            }
        );
    });

    it("should fail when element includes all class names in different order", function() {
        assert.throws(
            function() {
                referee.refute.className({ className: "a b c d e" }, "e a d");
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.className] Expected object's className not to include e a d"
                );
                assert.equal(error.name, "AssertionError");
                return true;
            }
        );
    });

    it("should fail with class names as array", function() {
        assert.throws(
            function() {
                referee.refute.className({ className: "a b c d e" }, [
                    "e",
                    "a",
                    "d"
                ]);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    '[refute.className] Expected object\'s className not to include ["e", "a", "d"]'
                );
                assert.equal(error.name, "AssertionError");
                return true;
            }
        );
    });

    it("should pass with class names as array", function() {
        referee.refute.className({ className: "a b c d e" }, ["f", "a", "d"]);
    });

    if (typeof document !== "undefined") {
        it("should pass for DOM elements", function() {
            var li = document.createElement("li");
            li.className = "some thing in here";

            referee.refute.className(li, "something");
        });
    }
});
