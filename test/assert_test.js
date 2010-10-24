if (typeof require != "undefined") {
    var testCase = require("../test_case").testCase;
    var assert = require("assert");
    var buster = { assert: require("../lib/assert") };
}

(function () {
    function assertFailThroughAssertFail(fn) {
        var failedProperly = false;
        var baf = buster.assert.fail;

        buster.assert.fail = function () {
            failedProperly = true;
        };

        try {
            fn();
        } catch (e) {
        } finally {
            buster.assert.fail = baf;
        }

        assert.ok(failedProperly);
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

        "should allow truthy values": function () {
            assert.doesNotThrow(function () {
                buster.assert({});
                buster.assert([]);
                buster.assert("Truthy");
                buster.assert(1);
                buster.assert(/a/);
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

        "should not allow falsy values": function () {
            assert.throws(function () {
                buster.assert("");
            });

            assert.throws(function () {
                buster.assert(0);
            });

            assert.throws(function () {
                buster.assert(NaN);
            });

            assert.throws(function () {
                buster.assert(null);
            });

            assert.throws(function () {
                buster.assert(undefined);
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
            assertFailThroughAssertFail(function () {
                buster.assert(false);
            });
        },

        "should always update assertion counter": function () {
            buster.assert.count = 0;
            buster.assert(true);

            try {
                buster.assert(false);
            } catch (e) {}

            assert.equal(2, buster.assert.count);

            delete buster.assert.count;
            buster.assert(true);
            assert.equal(1, buster.assert.count);
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
        },

        "should fail for truthy values": function () {
            assert.throws(function () {
                buster.assert.isTrue({});
            });

            assert.throws(function () {
                buster.assert.isTrue([]);
            });

            assert.throws(function () {
                buster.assert.isTrue("Oh hai");
            });

            assert.throws(function () {
                buster.assert.isTrue(32);
            });
        },

        "should fail via assert.fail": function () {
            assertFailThroughAssertFail(function () {
                buster.assert.isTrue(false);
            });
        },

        "should always update assertion counter": function () {
            buster.assert.count = 0;
            buster.assert.isTrue(true);

            try {
                buster.assert.isTrue(false);
            } catch (e) {}

            assert.equal(2, buster.assert.count);

            delete buster.assert.count;
            buster.assert(true);
            assert.equal(1, buster.assert.count);
        }
    });

    testCase("AssertIsFalseTest", {
        "should pass for false": function () {
            assert.doesNotThrow(function () {
                buster.assert.isFalse(false);
            });
        },

        "should pass for false with message": function () {
            assert.doesNotThrow(function () {
                buster.assert.isFalse("Yup", false);
            });
        },

        "should fail for true": function () {
            assert.throws(function () {
                buster.assert.isFalse(true);
            });
        },

        "should fail for true with message": function () {
            assert.throws(function () {
                buster.assert.isFalse("Awww", true);
            });
        },

        "should fail with message": function () {
            try {
                buster.assert.isFalse("Ah, sucks", true);
                throw new Error("Didn't fail");
            } catch (e) {
                assert.equal("Ah, sucks: Expected false but was true", e.message);
            }
        },

        "should represent expected value in message": function () {
            try {
                buster.assert.isFalse("Sucker", {});
                throw new Error("Didn't fail");
            } catch (e) {
                assert.equal("Sucker: Expected false but was {}", e.message);
            }
        },

        "should fail for falsy values": function () {
            assert.throws(function () {
                buster.assert.isFalse("");
            });

            assert.throws(function () {
                buster.assert.isFalse(0);
            });

            assert.throws(function () {
                buster.assert.isFalse(NaN);
            });

            assert.throws(function () {
                buster.assert.isFalse(null);
            });

            assert.throws(function () {
                buster.assert.isFalse(undefined);
            });
        },

        "should fail via assert.fail": function () {
            assertFailThroughAssertFail(function () {
                buster.assert.isFalse(true);
            });
        },

        "should always update assertion counter": function () {
            buster.assert.count = 0;
            buster.assert.isFalse(false);

            try {
                buster.assert.isFalse(true);
            } catch (e) {}

            assert.equal(2, buster.assert.count);

            delete buster.assert.count;
            buster.assert(true);
            assert.equal(1, buster.assert.count);
        }
    });

    testCase("AssertSameTest", {
        "should pass when comparing object to itself": function () {
            assert.doesNotThrow(function () {
                var obj = { id: 42 };

                buster.assert.same(obj, obj);
            });
        },

        "should pass when comparing object to itself with message": function () {
            assert.doesNotThrow(function () {
                var obj = { id: 42 };

                buster.assert.same("These should be the same", obj, obj);
            });
        },

        "should fail when comparing different objects": function () {
            assert.throws(function () {
                var obj1 = { id: 42 };
                var obj2 = { id: 42 };

                buster.assert.same(obj1, obj2);
            });
        },

        "should pass when comparing different primitives": function () {
            assert.doesNotThrow(function () {
                buster.assert.same("Hey", "Hey");
                buster.assert.same(true, true);
                buster.assert.same(32, 32);
                buster.assert.same(Infinity, Infinity);
            });
        },

        "should pass when comparing null to null": function () {
            assert.doesNotThrow(function () {
                buster.assert.same(null, null);
            });
        },

        "should pass when comparing undefined to undefined": function () {
            assert.doesNotThrow(function () {
                buster.assert.same(undefined, undefined);
            });
        },

        "should pass when comparing Infinity to Infinity": function () {
            assert.doesNotThrow(function () {
                buster.assert.same(Infinity, Infinity);
            });
        },

        "should fail when comparing NaN to NaN": function () {
            assert.throws(function () {
                buster.assert.same(NaN, NaN);
            });
        },

        "should fail when comparing different objects with message": function () {
            assert.throws(function () {
                var obj1 = { id: 42 };
                var obj2 = { id: 42 };

                buster.assert.same("How d'ya like that?", obj1, obj2);
            });
        },

        "should include objects in message": function () {
            var obj1 = {};
            var obj2 = {};

            try {
                buster.assert.same(obj1, obj2);
                throw new Error("Did not fail");
            } catch (e) {
                assert.equal("AssertionError", e.type);
                assert.equal("Expected {} to be the same object as {}", e.message);
            }
        },

        "should include custom message": function () {
            var obj1 = {};
            var obj2 = {};

            try {
                buster.assert.same("Oh noes", obj1, obj2);
                throw new Error("Did not fail");
            } catch (e) {
                assert.equal("AssertionError", e.type);
                assert.equal("Oh noes: Expected {} to be the same object as {}",
                             e.message);
            }
        },

        "should fail via assert.fail": function () {
            assertFailThroughAssertFail(function () {
                buster.assert.same({}, {});
            });
        },

        "should always update assertion counter": function () {
            buster.assert.count = 0;
            var obj = {};
            buster.assert.same(obj, obj);

            try {
                buster.assert.same({}, {});
            } catch (e) {}

            assert.equal(2, buster.assert.count);

            delete buster.assert.count;
            buster.assert.same(obj, obj);
            assert.equal(1, buster.assert.count);
        }
    });

    testCase("AssertNotSameTest", {
        "should fail when comparing object to itself": function () {
            assert.throws(function () {
                var obj = { id: 42 };

                buster.assert.notSame(obj, obj);
            });
        },

        "should fail when comparing object to itself with message": function () {
            assert.throws(function () {
                var obj = { id: 42 };

                buster.assert.notSame("These should not be the same", obj, obj);
            });
        },

        "should pass when comparing different objects": function () {
            assert.doesNotThrow(function () {
                var obj1 = { id: 42 };
                var obj2 = { id: 42 };

                buster.assert.notSame(obj1, obj2);
            });
        },

        "should pass when comparing different objects with message": function () {
            assert.doesNotThrow(function () {
                var obj1 = { id: 42 };
                var obj2 = { id: 42 };

                buster.assert.notSame("These should not be the same", obj1, obj2);
            });
        },

        "should fail when comparing different primitives": function () {
            assert.throws(function () {
                buster.assert.notSame("Hey", "Hey");
            });

            assert.throws(function () {
                buster.assert.notSame(true, true);
            });

            assert.throws(function () {
                buster.assert.notSame(32, 32);
            });

            assert.throws(function () {
                buster.assert.notSame(Infinity, Infinity);
            });
        },

        "should fail when comparing null to null": function () {
            assert.throws(function () {
                buster.assert.notSame(null, null);
            });
        },

        "should fail when comparing undefined to undefined": function () {
            assert.throws(function () {
                buster.assert.notSame(undefined, undefined);
            });
        },

        "should fail when comparing Infinity to Infinity": function () {
            assert.throws(function () {
                buster.assert.notSame(Infinity, Infinity);
            });
        },

        "should pass when comparing NaN to NaN": function () {
            assert.doesNotThrow(function () {
                buster.assert.notSame(NaN, NaN);
            });
        },

        "should include objects in message": function () {
            var obj = {};

            try {
                buster.assert.notSame(obj, obj);
                throw new Error("Did not fail");
            } catch (e) {
                assert.equal("AssertionError", e.type);
                assert.equal("Expected {} not to be the same object as {}",
                             e.message);
            }
        },

        "should include custom message": function () {
            var obj = {};

            try {
                buster.assert.notSame("Oh noes", obj, obj);
                throw new Error("Did not fail");
            } catch (e) {
                assert.equal("AssertionError", e.type);
                assert.equal("Oh noes: Expected {} not to be the same object as {}",
                             e.message);
            }
        },

        "should fail via assert.fail": function () {
            assertFailThroughAssertFail(function () {
                var obj = {};
                buster.assert.notSame(obj, obj);
            });
        },

        "should always update assertion counter": function () {
            buster.assert.count = 0;
            var obj1 = {};
            var obj2 = {};
            buster.assert.notSame(obj1, obj2);

            try {
                buster.assert.notSame(obj1, obj1);
            } catch (e) {}

            assert.equal(2, buster.assert.count);

            delete buster.assert.count;
            buster.assert.notSame(obj1, obj2);
            assert.equal(1, buster.assert.count);
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
}());