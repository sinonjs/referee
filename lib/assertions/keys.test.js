"use strict";

var assert = require("assert");
var referee = require("../referee");

describe("assert.keys", function() {
    // by defining this here, it only exists inside this closure and cannot
    // accidentally be modified by other tests
    function Klass(o) {
        for (var key in o) {
            if (o.hasOwnProperty(key)) {
                this[key] = o[key];
            }
        }
    }
    Klass.prototype.methodA = function() {};
    Klass.prototype.methodB = function() {};

    it("should pass when keys are exact", function() {
        referee.assert.keys({ a: 1, b: 2, c: 3 }, ["a", "b", "c"]);
    });

    it("should pass when there are no keys", function() {
        referee.assert.keys({}, []);
    });

    it("should pass when values are special", function() {
        referee.assert.keys({ a: -1, b: null, c: undefined }, ["a", "b", "c"]);
    });

    it("should ignore prototype methods", function() {
        referee.assert.keys(new Klass({ a: 1, b: 2, c: 3 }), ["a", "b", "c"]);
    });

    it("should allow overriding prototype methods", function() {
        referee.assert.keys(new Klass({ a: 1, methodA: 2 }), ["a", "methodA"]);
    });

    it("should fail when keys are missing", function() {
        assert.throws(
            function() {
                referee.assert.keys({ a: 1, b: 2, c: 3 }, ["a", "b"]);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.keys] Expected { a: 1, b: 2, c: 3 } to have exact keys [ 'a', 'b' ]"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.keys");
                return true;
            }
        );
    });

    it("should fail when keys are excess", function() {
        assert.throws(
            function() {
                referee.assert.keys({ a: 1, b: 2, c: 3 }, ["a", "b", "c", "d"]);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.keys] Expected { a: 1, b: 2, c: 3 } to have exact keys [ 'a', 'b', 'c', 'd' ]"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.keys");
                return true;
            }
        );
    });

    it("should fail when keys are not exact", function() {
        assert.throws(
            function() {
                referee.assert.keys({ a: 1, b: 2, c: 3 }, ["a", "b", "d"]);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.keys] Expected { a: 1, b: 2, c: 3 } to have exact keys [ 'a', 'b', 'd' ]"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.keys");
                return true;
            }
        );
    });

    it("should fail with custom message", function() {
        var message = "704322e5-0fa8-47c3-8cfe-2033ad3cab2d";

        assert.throws(
            function() {
                referee.assert.keys({ a: 1, b: 2, c: 3 }, ["a", "b"], message);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[assert.keys] " +
                        message +
                        ": Expected { a: 1, b: 2, c: 3 } to have exact keys [ 'a', 'b' ]"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "assert.keys");
                return true;
            }
        );
    });
});

describe("refute.keys", function() {
    // by defining this here, it only exists inside this closure and cannot
    // accidentally be modified by other tests
    function Klass(o) {
        for (var key in o) {
            if (o.hasOwnProperty(key)) {
                this[key] = o[key];
            }
        }
    }
    Klass.prototype.methodA = function() {};
    Klass.prototype.methodB = function() {};

    it("should pass when keys are not exact", function() {
        referee.refute.keys({ a: 1, b: 2, c: 3 }, ["a", "b", "d"]);
    });

    it("should pass when keys are missing", function() {
        referee.refute.keys({ a: 1, b: 2, c: 3 }, ["a", "b"]);
    });
    it("should pass when keys are excess", function() {
        referee.refute.keys({ a: 1, b: 2, c: 3 }, ["a", "b", "c", "d"]);
    });

    it("should fail when keys are exact", function() {
        assert.throws(
            function() {
                referee.refute.keys({ a: 1, b: 2, c: 3 }, ["a", "b", "c"]);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.keys] Expected not to have exact keys [ 'a', 'b', 'c' ]"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.keys");
                return true;
            }
        );
    });

    it("should fail when there are no keys", function() {
        assert.throws(
            function() {
                referee.refute.keys({}, []);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.keys] Expected not to have exact keys []"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.keys");
                return true;
            }
        );
    });

    it("should fail when values are special", function() {
        assert.throws(
            function() {
                referee.refute.keys({ a: -1, b: null, c: undefined }, [
                    "a",
                    "b",
                    "c"
                ]);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.keys] Expected not to have exact keys [ 'a', 'b', 'c' ]"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.keys");
                return true;
            }
        );
    });

    it("should fail for prototype methods", function() {
        assert.throws(
            function() {
                referee.refute.keys(new Klass({ a: 1, b: 2, c: 3 }), [
                    "a",
                    "b",
                    "c"
                ]);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.keys] Expected not to have exact keys [ 'a', 'b', 'c' ]"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.keys");
                return true;
            }
        );
    });

    it("should fail for overridden prototype methods", function() {
        assert.throws(
            function() {
                referee.refute.keys(new Klass({ a: 1, methodA: 2 }), [
                    "a",
                    "methodA"
                ]);
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.keys] Expected not to have exact keys [ 'a', 'methodA' ]"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.keys");
                return true;
            }
        );
    });

    it("should fail with custom message", function() {
        var message = "c6ef101e-7fb8-4cb2-99d1-c3c5b9c39319";

        assert.throws(
            function() {
                referee.refute.keys(
                    { a: 1, b: 2, c: 3 },
                    ["a", "b", "c"],
                    message
                );
            },
            function(error) {
                assert.equal(error.code, "ERR_ASSERTION");
                assert.equal(
                    error.message,
                    "[refute.keys] " +
                        message +
                        ": Expected not to have exact keys [ 'a', 'b', 'c' ]"
                );
                assert.equal(error.name, "AssertionError");
                assert.equal(error.operator, "refute.keys");
                return true;
            }
        );
    });
});
