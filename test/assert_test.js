if (typeof require != "undefined") {
    var testCase = require("../test_case").testCase;
    var assert = require("assert");
    var buster = { assert: require("../lib/assert") };
}

testCase("AssertionErrorTest", {
    "should provide AssertionError": function () {
        assert.ok(typeof buster.assert.AssertionError == "function");

        var error = new buster.assert.AssertionError();
        assert.ok(Error.prototype.isPrototypeOf(error));
    }
});

testCase("AssertTest", {
    "should allow true": function () {
        assert.doesNotThrow(function () {
            buster.assert(true);
        });
    },

    "should allow true with message": function () {
        assert.doesNotThrow(function () {
            buster.assert("s'aright", true);
        });
    },

    "should not allow false": function () {
        assert.throws(function () {
            buster.assert(false);
        });
    },

    "should not allow false with message": function () {
        assert.throws(function () {
            buster.assert("Some message", false);
        });
    },

    "should fail with generated message": function () {
        try {
            buster.assert(false);
            throw new Error("Didn't fail");
        } catch (e) {
            assert.equal("AssertionError", e.type);
            assert.equal("Expected truthy value but was false", e.message);
        }
    },

    "should fail with custom message": function () {
        try {
            buster.assert("False FTW", false);
            throw new Error("Didn't fail");
        } catch (e) {
            assert.equal("AssertionError", e.type);
            assert.equal("False FTW: Expected truthy value but was false", e.message);
        }
    },

    "should fail via assert.fail": function () {
        var failedProperly = false;
        var baf = buster.assert.fail;

        buster.assert.fail = function () {
            failedProperly = true;
        };

        try {
            buster.assert(false);
        } catch (e) {
        } finally {
            buster.assert.fail = baf;
        }

        assert.ok(failedProperly);
    }
});

testCase("AssertIsTrueTest", {
    "should pass for true": function () {
        assert.doesNotThrow(function () {
            buster.assert.isTrue(true);
        });
    },

    "should pass for true with message": function () {
        assert.doesNotThrow(function () {
            buster.assert.isTrue("Yup", true);
        });
    },

    "should fail for false": function () {
        assert.throws(function () {
            buster.assert.isTrue(false);
        });
    },

    "should fail for false with message": function () {
        assert.throws(function () {
            buster.assert.isTrue("Awww", false);
        });
    },

    "should fail with message": function () {
        try {
            buster.assert.isTrue("Awww", false);
            throw new Error("Didn't fail");
        } catch (e) {
            assert.equal("Awww: Expected true but was false", e.message);
        }
    },

    "should represent expected value in message": function () {
        try {
            buster.assert.isTrue("Awww", {});
            throw new Error("Didn't fail");
        } catch (e) {
            assert.equal("Awww: Expected true but was {}", e.message);
        }
    }
});

testCase("AssertEqualsTest", {
    "should pass when comparing object to itself": function () {
        assert.doesNotThrow(function () {
            var obj = { id: 42 };
            buster.assert.equals(obj, obj);
        });
    },

    "should fail when comparing different objects": function () {
        assert.throws(function () {
            var obj = { id: 42 };
            buster.assert.equals(obj, {});
        });
    }
});
