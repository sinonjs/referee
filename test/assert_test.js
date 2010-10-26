/*jslint onevar: false, browser: true, eqeqeq: false, nomen: false, plusplus: false*/
/*global require, __dirname*/

if (typeof require != "undefined") {
    require.paths.unshift(__dirname + "/../deps/buster-util/lib/");
    var testCase = require("test_case").testCase;
    var assert = require("assert");
    var buster = { assert: require("../lib/assert") };
}

(function () {
    function spy(obj, method, callback) {
        var saved = obj[method];
        var calls = [];

        obj[method] = function () {
            calls.push(Array.prototype.slice.call(arguments));
            return saved.apply(obj, arguments);
        };

        try {
            callback();
        } catch (e) {}

        obj[method] = saved;

        return calls;
    }

    function assertFailThroughAssertFail(assertion) {
        var args = Array.prototype.slice.call(arguments, 1);

        assert.equal(1, spy(buster.assert, "fail", function () {
            assertion.apply(buster.assert, args);
        }).length);
    }

    function assertFormatWithFormat(assertion) {
        var args = Array.prototype.slice.call(arguments, 1);

        var calls = spy(buster.assert, "format", function () {
            assertion.apply(buster.assert, args);
        });

        assert.equal(args.length, calls.length);

        for (var i = 0, l = args.length; i < l; ++i) {
            assert.equal(args[i], calls[i][0]);
        }
    }

    testCase("AssertionErrorTest", {
        "should provide AssertionError": function () {
            assert.ok(typeof buster.assert.AssertionError == "function");

            var error = new buster.assert.AssertionError();
            assert.ok(Error.prototype.isPrototypeOf(error));
            assert.ok(error instanceof Error);
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
                assert.equal("[assert] Expected false to be truthy", e.message);
            }
        },

        "should fail with custom message": function () {
            try {
                buster.assert("False FTW", false);
                throw new Error("Didn't fail");
            } catch (e) {
                assert.equal("AssertionError", e.type);
                assert.equal("False FTW", e.message);
            }
        },

        "should fail via assert.fail": function () {
            assertFailThroughAssertFail(buster.assert, false);
        },

        "should format value with assert.format": function () {
            assertFormatWithFormat(buster.assert, false);
        },

        "should fail if not passed arguments": function () {
            try {
                buster.assert();
                throw new Error("Expected assert to fail");
            } catch (e) {
                assert.equal("Expected to receive at least 1 argument", e.message);
            }
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
                assert.equal("[assert.isTrue] Awww: Expected false to be true",
                             e.message);
            }
        },

        "should represent expected value in message": function () {
            try {
                buster.assert.isTrue("Awww", {});
                throw new Error("Didn't fail");
            } catch (e) {
                assert.equal(
                    "[assert.isTrue] Awww: Expected [object Object] to be true",
                    e.message
                );
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

        "should fail if not passed arguments": function () {
            try {
                buster.assert.isTrue();
                throw new Error("Expected assert.isTrue to fail");
            } catch (e) {
                assert.equal("Expected to receive at least 1 argument", e.message);
            }
        },

        "should fail via assert.fail": function () {
            assertFailThroughAssertFail(buster.assert.isTrue, false);
        },

        "should format value with assert.format": function () {
            assertFormatWithFormat(buster.assert.isTrue, false);
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
                assert.equal("[assert.isFalse] Ah, sucks: Expected true to be false",
                             e.message);
            }
        },

        "should represent expected value in message": function () {
            try {
                buster.assert.isFalse("Sucker", {});
                throw new Error("Didn't fail");
            } catch (e) {
                assert.equal(
                    "[assert.isFalse] Sucker: Expected [object Object] to be false",
                    e.message
                );
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
            assertFailThroughAssertFail(buster.assert.isFalse, true);
        },

        "should format value with assert.format": function () {
            assertFormatWithFormat(buster.assert.isFalse, true);
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

        "should fail when comparing primitives without coercion": function () {
            assert.throws(function () {
                buster.assert.same(666, "666");
            });

            assert.throws(function () {
                buster.assert.same(0, "");
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
                assert.equal("[assert.same] Expected [object Object] to be the " +
                             "same object as [object Object]", e.message);
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
                assert.equal("[assert.same] Oh noes: Expected [object Object] to " +
                             "be the same object as [object Object]", e.message);
            }
        },

        "should fail via assert.fail": function () {
            assertFailThroughAssertFail(buster.assert.same, {}, {});
        },

        "should format value with assert.format": function () {
            assertFormatWithFormat(buster.assert.same, {}, {});
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
                assert.equal("[assert.notSame] Expected [object Object] not to be " +
                             "the same object as [object Object]", e.message);
            }
        },

        "should include custom message": function () {
            var obj = {};

            try {
                buster.assert.notSame("Oh noes", obj, obj);
                throw new Error("Did not fail");
            } catch (e) {
                assert.equal("AssertionError", e.type);
                assert.equal("[assert.notSame] Oh noes: Expected [object Object] " +
                             "not to be the same object as [object Object]",
                             e.message);
            }
        },

        "should fail via assert.fail": function () {
            var obj = {};
            assertFailThroughAssertFail(buster.assert.notSame, obj, obj);
        },

        "should format value with assert.format": function () {
            var obj = {};
            assertFormatWithFormat(buster.assert.notSame, obj, obj);
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

        "should pass when comparing object to itself with message": function () {
            assert.doesNotThrow(function () {
                var obj = { id: 42 };
                buster.assert.equals("These should be equal", obj, obj);
            });
        },

        "should pass when comparing primitives": function () {
            assert.doesNotThrow(function () {
                buster.assert.equals("Hey", "Hey");
                buster.assert.equals(32, 32);
                buster.assert.equals(false, false);
                buster.assert.equals(null, null);
                buster.assert.equals(undefined, undefined);
            });
        },

        "should pass when comparing function to itself": function () {
            assert.doesNotThrow(function () {
                var func = function () {};
                buster.assert.equals(func, func);
            });
        },

        "should fail when comparing functions": function () {
            assert.throws(function () {
                buster.assert.equals(function () {}, function () {});
            });
        },

        "should pass when comparing array to itself": function () {
            assert.doesNotThrow(function () {
                var obj = [];
                buster.assert.equals(obj, obj);
            });
        },

        "should pass when comparing date objects with same date": function () {
            var date = new Date();
            var anotherDate = new Date(date.getTime());

            assert.doesNotThrow(function () {
                buster.assert.equals(date, anotherDate);
            });
        },

        "should fail when comparing date objects with different dates": function () {
            var date = new Date();
            var anotherDate = new Date(date.getTime() - 10);

            assert.throws(function () {
                buster.assert.equals(date, anotherDate);
            });
        },

        "should fail when comparing date objects to null": function () {
            assert.throws(function () {
                buster.assert.equals(new Date(), null);
            });
        },

        "should pass when comparing primitives with coercion": function () {
            assert.doesNotThrow(function () {
                buster.assert.equals("4", 4);
                buster.assert.equals(4, "4");
                buster.assert.equals(32, "32");
                buster.assert.equals("32", 32);
                buster.assert.equals(32, new Number(32));
                buster.assert.equals(new Number(32), 32);
                buster.assert.equals(0, "");
                buster.assert.equals("", 0);
                buster.assert.equals("4", new String("4"));
                buster.assert.equals(new String("4"), "4");
            });
        },

        "should fail when comparing objects with different own properties": function () {
            assert.throws(function () {
                buster.assert.equals({ id: 42 }, { id: 42, di: 24 });
            });

            assert.throws(function () {
                buster.assert.equals({ id: undefined }, { di: 24 });
            });

            assert.throws(function () {
                buster.assert.equals({ id: 24 }, { di: undefined });
            });
        },

        "should pass when comparing objects with one property": function () {
            assert.doesNotThrow(function () {
                buster.assert.equals({ id: 42 }, { id: 42 });
            });
        },

        "should pass when comparing objects with one object property": function () {
            assert.doesNotThrow(function () {
                buster.assert.equals({ obj: { id: 42 } }, { obj: { id: 42 } });
            });
        },

        "should fail when comparing objects with one property with different values": function () {
            assert.throws(function () {
                buster.assert.equals({ id: 42 }, { id: 24 });
            });
        },

        "should pass when comparing complex objects": function () {
            assert.doesNotThrow(function () {
                var obj1 = {
                    id: 42,
                    name: "Hey",
                    sayIt: function () {
                        return this.name;
                    },

                    child: {
                        speaking: function () {}
                    }
                };

                var obj2 = {
                    sayIt: obj1.sayIt,
                    child: { speaking: obj1.child.speaking },
                    id: 42,
                    name: "Hey"
                };

                buster.assert.equals(obj1, obj2);
            });
        },

        "should pass when comparing arrays": function () {
            function func() {}
            var arr1 = [1, 2, "Hey there", func, { id: 42, prop: [2, 3] }];
            var arr2 = [1, 2, "Hey there", func, { id: 42, prop: [2, 3] }];

            assert.doesNotThrow(function () {
                buster.assert.equals(arr1, arr2);
            });
        },

        "should pass when comparing regexp literals": function () {
            assert.doesNotThrow(function () {
                buster.assert.equals(/a/, /a/);
            });
        },

        "should pass when comparing regexp objects": function () {
            assert.doesNotThrow(function () {
                var obj1 = new RegExp("[a-z]+");
                var obj2 = new RegExp("[a-z]+");

                buster.assert.equals(obj1, obj2);
            });
        },

        "should fail when comparing regexp objects with custom properties": function () {
            assert.throws(function () {
                var obj1 = new RegExp("[a-z]+");
                var obj2 = new RegExp("[a-z]+");
                obj2.id = 42;

                buster.assert.equals(obj1, obj2);
            });
        },

        "should fail when comparing different objects": function () {
            assert.throws(function () {
                var obj = { id: 42 };
                buster.assert.equals(obj, {});
            });
        },

        "should fail when comparing different objects with message": function () {
            assert.throws(function () {
                var obj = { id: 42 };
                buster.assert.equals("This is a message", obj, {});
            });
        },

        "should fail when comparing to null": function () {
            assert.throws(function () {
                buster.assert.equals({}, null);
            });

            assert.throws(function () {
                buster.assert.equals(null, {});
            });
        },

        "should fail when comparing to undefined": function () {
            assert.throws(function () {
                buster.assert.equals({}, undefined);
            });

            assert.throws(function () {
                buster.assert.equals(undefined, {});
            });
        },

        "should fail when comparing to booleans": function () {
            assert.throws(function () {
                buster.assert.equals({}, false);
            });

            assert.throws(function () {
                buster.assert.equals(false, {});
            });

            assert.throws(function () {
                buster.assert.equals({}, true);
            });

            assert.throws(function () {
                buster.assert.equals(true, {});
            });
        },

        "should fail when comparing 'empty' objects": function () {
            assert.throws(function () {
                buster.assert.equals({}, new Date());
            });

            assert.throws(function () {
                buster.assert.equals({}, new String());
            });

            assert.throws(function () {
                buster.assert.equals({}, []);
            });

            assert.throws(function () {
                buster.assert.equals({}, new Number());
            });
        },

        "should pass when comparing arguments to array": function () {
            function gather() {
                return arguments;
            }

            assert.doesNotThrow(function () {
                var array = [1, 2, {}, []];
                var args = gather(1, 2, {}, []);

                buster.assert.equals(array, args);
                buster.assert.equals([], gather());
            });
        },

        "should pass when comparing arguments to array like object": function () {
            function gather() {
                return arguments;
            }

            assert.doesNotThrow(function () {
                var object = {
                    length: 4,
                    "0": 1,
                    "1": 2,
                    "2": {},
                    "3": []
                };

                var args = gather(1, 2, {}, []);

                buster.assert.equals(object, args);
            });
        },

        "should fail with understandable message": function () {
            try {
                buster.assert.equals({}, "Hey");
                throw new Error("Did not fail");
            } catch (e) {
                assert.equal("[assert.equals] Expected [object Object] to be equal " +
                             "to Hey", e.message);
            }
        },

        "should fail with custom message": function () {
            try {
                buster.assert.equals("Is they, uhm, equals?", {}, "Hey");
                throw new Error("Did not fail");
            } catch (e) {
                assert.equal("[assert.equals] Is they, uhm, equals? Expected " +
                             "[object Object] to be equal to Hey", e.message);
            }
        },

        "should fail via assert.fail": function () {
            assertFailThroughAssertFail(buster.assert.equals, { id: 42 }, {});
        },

        "should format value with assert.format": function () {
            assertFormatWithFormat(buster.assert.equals, {}, { id: 42 });
        },

        "should always update assertion counter": function () {
            buster.assert.count = 0;
            buster.assert.equals("Hey", "Hey");

            try {
                buster.assert.equals({ id: 42 }, {});
            } catch (e) {}

            assert.equal(2, buster.assert.count);

            delete buster.assert.count;
            buster.assert.equals("Hey", "Hey");
            assert.equal(1, buster.assert.count);
        }
    });

    if (typeof document != "undefined") {
        testCase("AssertEqualsHostObjectTest", {
            "should pass when comparing DOM element to itself": function () {
                var element = document.createElement("div");

                assert.doesNotThrow(function () {
                    buster.assert.equals(element, element);
                });
            },

            "should fail when comparing different DOM elements": function () {
                var div = document.createElement("div");
                var span = document.createElement("span");

                assert.throws(function () {
                    buster.assert.equals(div, span);
                });
            }
        });
    }

    testCase("AssertNotEqualsTest", {
        "should fail when comparing object to itself": function () {
            assert.throws(function () {
                var obj = { id: 42 };
                buster.assert.notEquals(obj, obj);
            });
        },

        "should fail when comparing object to itself with message": function () {
            assert.throws(function () {
                var obj = { id: 42 };
                buster.assert.notEquals("These should be equal", obj, obj);
            });
        },

        "should fail when comparing primitives": function () {
            assert.throws(function () {
                buster.assert.notEquals("Hey", "Hey");
            });

            assert.throws(function () {
                buster.assert.notEquals(32, 32);
            });

            assert.throws(function () {
                buster.assert.notEquals(false, false);
            });

            assert.throws(function () {
                buster.assert.notEquals(null, null);
            });

            assert.throws(function () {
                buster.assert.notEquals(undefined, undefined);
            });
        },

        "should fail when comparing function to itself": function () {
            assert.throws(function () {
                var func = function () {};
                buster.assert.notEquals(func, func);
            });
        },

        "should pass when comparing functions": function () {
            assert.doesNotThrow(function () {
                buster.assert.notEquals(function () {}, function () {});
            });
        },

        "should fail when comparing array to itself": function () {
            assert.throws(function () {
                var obj = [];
                buster.assert.notEquals(obj, obj);
            });
        },

        "should fail when comparing date objects with same date": function () {
            var date = new Date();
            var anotherDate = new Date(date.getTime());

            assert.throws(function () {
                buster.assert.notEquals(date, anotherDate);
            });
        },

        "should pass when comparing date objects with different dates": function () {
            var date = new Date();
            var anotherDate = new Date(date.getTime() - 10);

            assert.doesNotThrow(function () {
                buster.assert.notEquals(date, anotherDate);
            });
        },

        "should pass when comparing date objects to null": function () {
            assert.doesNotThrow(function () {
                buster.assert.notEquals(new Date(), null);
            });
        },

        "should fail when comparing primitives with coercion": function () {
            assert.throws(function () {
                buster.assert.notEquals("4", 4);
            });

            assert.throws(function () {
                buster.assert.notEquals(32, "32");
            });

            assert.throws(function () {
                buster.assert.notEquals(0, "");
            });
        },

        "should pass when comparing objects with different own properties": function () {
            assert.doesNotThrow(function () {
                buster.assert.notEquals({ id: 42 }, { id: 42, di: 24 });
            });

            assert.doesNotThrow(function () {
                buster.assert.notEquals({ id: undefined }, { di: 24 });
            });

            assert.doesNotThrow(function () {
                buster.assert.notEquals({ id: 24 }, { di: undefined });
            });
        },

        "should fail when comparing objects with one property": function () {
            assert.throws(function () {
                buster.assert.notEquals({ id: 42 }, { id: 42 });
            });
        },

        "should fail when comparing objects with one object property": function () {
            assert.throws(function () {
                buster.assert.notEquals({ obj: { id: 42 } }, { obj: { id: 42 } });
            });
        },

        "should pass when comparing objects with one property with different values": function () {
            assert.doesNotThrow(function () {
                buster.assert.notEquals({ id: 42 }, { id: 24 });
            });
        },

        "should fail when comparing complex objects": function () {
            assert.throws(function () {
                var obj1 = {
                    id: 42,
                    name: "Hey",
                    sayIt: function () {
                        return this.name;
                    },

                    child: {
                        speaking: function () {}
                    }
                };

                var obj2 = {
                    sayIt: obj1.sayIt,
                    child: { speaking: obj1.child.speaking },
                    id: 42,
                    name: "Hey"
                };

                buster.assert.notEquals(obj1, obj2);
            });
        },

        "should fail when comparing arrays": function () {
            function func() {}
            var arr1 = [1, 2, "Hey there", func, { id: 42, prop: [2, 3] }];
            var arr2 = [1, 2, "Hey there", func, { id: 42, prop: [2, 3] }];

            assert.throws(function () {
                buster.assert.notEquals(arr1, arr2);
            });
        },

        "should fail when comparing regexp literals": function () {
            assert.throws(function () {
                buster.assert.notEquals(/a/, /a/);
            });
        },

        "should fail when comparing regexp objects": function () {
            assert.throws(function () {
                var obj1 = new RegExp("[a-z]+");
                var obj2 = new RegExp("[a-z]+");

                buster.assert.notEquals(obj1, obj2);
            });
        },

        "should pass when comparing regexp objects with custom properties": function () {
            assert.doesNotThrow(function () {
                var obj1 = new RegExp("[a-z]+");
                var obj2 = new RegExp("[a-z]+");
                obj2.id = 42;

                buster.assert.notEquals(obj1, obj2);
            });
        },

        "should pass when comparing different objects": function () {
            assert.doesNotThrow(function () {
                var obj = { id: 42 };
                buster.assert.notEquals(obj, {});
            });
        },

        "should pass when comparing different objects with message": function () {
            assert.doesNotThrow(function () {
                var obj = { id: 42 };
                buster.assert.notEquals("This is a message", obj, {});
            });
        },

        "should pass when comparing to null": function () {
            assert.doesNotThrow(function () {
                buster.assert.notEquals({}, null);
                buster.assert.notEquals(null, {});
            });
        },

        "should pass when comparing to undefined": function () {
            assert.doesNotThrow(function () {
                buster.assert.notEquals({}, undefined);
                buster.assert.notEquals(undefined, {});
            });
        },

        "should pass when comparing to booleans": function () {
            assert.doesNotThrow(function () {
                buster.assert.notEquals({}, false);
                buster.assert.notEquals(false, {});
                buster.assert.notEquals({}, true);
                buster.assert.notEquals(true, {});
            });
        },

        "should pass when comparing 'empty' objects": function () {
            assert.doesNotThrow(function () {
                buster.assert.notEquals({}, new Date());
                buster.assert.notEquals({}, new String());
                buster.assert.notEquals({}, []);
                buster.assert.notEquals({}, new Number());
            });
        },

        "should fail when comparing arguments to array": function () {
            function gather() {
                return arguments;
            }

            var array = [1, 2, {}, []];
            var args = gather(1, 2, {}, []);

            assert.throws(function () {
                buster.assert.notEquals(array, args);
            });

            assert.throws(function () {
                buster.assert.notEquals([], gather());
            });
        },

        "should fail when comparing arguments to array like object": function () {
            function gather() {
                return arguments;
            }

            assert.throws(function () {
                var object = {
                    length: 4,
                    "0": 1,
                    "1": 2,
                    "2": {},
                    "3": []
                };

                var args = gather(1, 2, {}, []);

                buster.assert.notEquals(object, args);
            });
        },

        "should fail with understandable message": function () {
            try {
                buster.assert.notEquals({}, {});
                throw new Error("Did not fail");
            } catch (e) {
                assert.equal("[assert.notEquals] Expected [object Object] not to " +
                             "be equal to [object Object]", e.message);
            }
        },

        "should fail with custom message": function () {
            try {
                buster.assert.notEquals("Is they, uhm, equals?", {}, {});
                throw new Error("Did not fail");
            } catch (e) {
                assert.equal("[assert.notEquals] Is they, uhm, equals? Expected " +
                             "[object Object] not to be equal to [object Object]",
                             e.message);
            }
        },

        "should fail via assert.fail": function () {
            assertFailThroughAssertFail(buster.assert.notEquals, {}, {});
        },

        "should format value with assert.format": function () {
            assertFormatWithFormat(buster.assert.notEquals, "Hmm", "Hmm");
        },

        "should always update assertion counter": function () {
            buster.assert.count = 0;
            buster.assert.notEquals({}, "Hey");

            try {
                buster.assert.notEquals({}, {});
            } catch (e) {}

            assert.equal(2, buster.assert.count);

            delete buster.assert.count;
            buster.assert.notEquals({}, "Hey");
            assert.equal(1, buster.assert.count);
        }
    });

    testCase("AssertTypeOfTest", {
        "should pass when types match": function () {
            assert.doesNotThrow(function () {
                buster.assert.typeOf("function", function () {});
            });
        },

        "should pass when types match with message": function () {
            assert.doesNotThrow(function () {
                buster.assert.typeOf("OMG!", "function", function () {});
            });
        },

        "should fail when types don't match": function () {
            assert.throws(function () {
                buster.assert.typeOf("function", {});
            });
        },

        "should fail when types don't match with message": function () {
            assert.throws(function () {
                buster.assert.typeOf("OMG!", "function", {});
            });
        },

        "should generate failure message": function () {
            try {
                buster.assert.typeOf("function", {});
                throw new Error("Expected assert.typeOf to fail");
            } catch (e) {
                assert.equal(
                    "[assert.typeOf] Expected typeof [object Object] (object) to " +
                    "be function", e.message
                );
            }
        },

        "should generate failure message with custom message": function () {
            try {
                buster.assert.typeOf("OMG!", "boolean", "Hey");
                throw new Error("Expected assert.typeOf to fail");
            } catch (e) {
                assert.equal(
                    "[assert.typeOf] OMG! Expected typeof Hey " +
                    "(string) to be boolean", e.message
                );
            }
        },

        "should fail via assert.fail": function () {
            assertFailThroughAssertFail(buster.assert.typeOf, "string", {});
        },

        "should format value with assert.format": function () {
            var calls = spy(buster.assert, "format", function () {
                buster.assert.typeOf("string", false);
            });

            assert.equal(false, calls[0][0]);
            assert.equal("string", calls[1][0]);
        },

        "should not format objects if assertion does not fail": function () {
            var calls = spy(buster.assert, "format", function () {
                buster.assert.typeOf("string", "Oh noes!");
            });

            assert.equal(0, calls.length);
        },

        "should always update assertion counter": function () {
            buster.assert.count = 0;
            buster.assert.typeOf("object", {});

            try {
                buster.assert.typeOf("function", {});
            } catch (e) {}

            assert.equal(2, buster.assert.count);

            delete buster.assert.count;
            buster.assert.typeOf("object", {});
            assert.equal(1, buster.assert.count);
        }
    });
}());