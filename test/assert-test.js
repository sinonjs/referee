/*jslint onevar: false, browser: true, eqeqeq: false, nomen: false,
         plusplus: false, regexp: false*/
/*global require, __dirname*/
if (typeof require != "undefined") {
    var testCase = require("buster-util").testCase;
    var assert = require("assert");
    var buster = { assert: require("./../lib/buster-assert") };
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

    function assertUpAssertionCount(assertion, passing, failing) {
        buster.assert.count = 0;
        assertion.apply(buster.assert, passing);
        assert.equal(1, buster.assert.count);

        try {
            assertion.apply(buster.assert, passing);
        } catch (e) {}

        assert.equal(2, buster.assert.count);

        delete buster.assert.count;
        assertion.apply(buster.assert, passing);
        assert.equal(1, buster.assert.count);
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

    var passCount = 0, previous = 0, previousPassed = "";

    buster.assert.pass = function (assertion) {
        passCount++;
        previousPassed = assertion;
    };

    function assertAssertPassCalled(assertion) {
        var passed = passCount > previous;
        previous = passCount;

        assert.ok(passed);
        assert.ok(assertion == previousPassed);
    }

    function assertAssertPassNotCalled() {
        assert.ok(passCount == previous);
    }

    function resetAssertPassCounter() {
        previous = passCount;
    }

    testCase("AssertTest", {
        "should allow true": function () {
            assert.doesNotThrow(function () {
                buster.assert(true);
            });

            assertAssertPassCalled("assert");
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
                buster.assert(true, "s'aright");
            });

            assertAssertPassCalled("assert");
        },

        "should not allow false": function () {
            assert.throws(function () {
                buster.assert(false);
            });

            assertAssertPassNotCalled();
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
                buster.assert(false, "Some message");
            });

            assertAssertPassNotCalled();
        },

        "should fail with generated message": function () {
            try {
                buster.assert(false);
                throw new Error("Didn't fail");
            } catch (e) {
                assert.equal("AssertionError", e.name);
                assert.equal("[assert] Expected false to be truthy", e.message);
            }
        },

        "should fail with custom message": function () {
            try {
                buster.assert(false, "False FTW");
                throw new Error("Didn't fail");
            } catch (e) {
                assert.equal("AssertionError", e.name);
                assert.equal("False FTW", e.message);
            }
        },

        "should update assertion count": function () {
            assertUpAssertionCount(buster.assert, [true], [false]);
        },

        "should format value with assert.format": function () {
            assertFormatWithFormat(buster.assert, false);
        },

        "should fail if not passed arguments": function () {
            try {
                buster.assert();
                throw new Error("Expected assert to fail");
            } catch (e) {
                assert.equal("[assert] Expected to receive at least 1 argument", e.message);
            }
        }
    });

    testCase("AssertIsTrueTest", {
        "should pass for true": function () {
            assert.doesNotThrow(function () {
                buster.assert.isTrue(true);
            });

            assertAssertPassCalled("isTrue");
        },

        "should pass for true with message": function () {
            assert.doesNotThrow(function () {
                buster.assert.isTrue(true, "Yup");
            });

            assertAssertPassCalled("isTrue");
        },

        "should fail for false": function () {
            assert.throws(function () {
                buster.assert.isTrue(false);
            });

            assertAssertPassNotCalled();
        },

        "should fail for false with message": function () {
            assert.throws(function () {
                buster.assert.isTrue(false, "Awww");
            });

            assertAssertPassNotCalled();
        },

        "should fail with message": function () {
            try {
                buster.assert.isTrue(false, "Awww");
                throw new Error("Didn't fail");
            } catch (e) {
                assert.equal("[assert.isTrue] Awww: Expected false to be true",
                             e.message);
            }
        },

        "should represent expected value in message": function () {
            try {
                buster.assert.isTrue({}, "Awww");
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
                assert.equal("[assert.isTrue] Expected to receive at least 1 argument", e.message);
            }
        },

        "should update assertion counter": function () {
            assertUpAssertionCount(buster.assert.isTrue, [true], [false]);
        },

        "should format value with assert.format": function () {
            assertFormatWithFormat(buster.assert.isTrue, false);
        }
    });

    testCase("AssertIsFalseTest", {
        "should pass for false": function () {
            assert.doesNotThrow(function () {
                buster.assert.isFalse(false);
            });

            assertAssertPassCalled("isFalse");
        },

        "should pass for false with message": function () {
            assert.doesNotThrow(function () {
                buster.assert.isFalse(false, "Yup");
            });

            assertAssertPassCalled("isFalse");
        },

        "should fail for true": function () {
            assert.throws(function () {
                buster.assert.isFalse(true);
            });

            assertAssertPassNotCalled();
        },

        "should fail for true with message": function () {
            assert.throws(function () {
                buster.assert.isFalse(true, "Awww");
            });

            assertAssertPassNotCalled();
        },

        "should fail with message": function () {
            try {
                buster.assert.isFalse(true, "Ah, sucks");
                throw new Error("Didn't fail");
            } catch (e) {
                assert.equal("[assert.isFalse] Ah, sucks: Expected true to be false",
                             e.message);
            }
        },

        "should represent expected value in message": function () {
            try {
                buster.assert.isFalse({}, "Sucker");
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

        "should update assertion counter": function () {
            assertUpAssertionCount(buster.assert.isFalse, [false], [true]);
        },

        "should format value with assert.format": function () {
            assertFormatWithFormat(buster.assert.isFalse, true);
        }
    });

    testCase("AssertSameTest", {
        "should pass when comparing object to itself": function () {
            assert.doesNotThrow(function () {
                var obj = { id: 42 };

                buster.assert.same(obj, obj);
            });

            assertAssertPassCalled("same");
        },

        "should pass when comparing object to itself with message": function () {
            assert.doesNotThrow(function () {
                var obj = { id: 42 };

                buster.assert.same(obj, obj, "These should be the same");
            });

            assertAssertPassCalled("same");
        },

        "should fail when comparing different objects": function () {
            assert.throws(function () {
                var obj1 = { id: 42 };
                var obj2 = { id: 42 };

                buster.assert.same(obj1, obj2);
            });

            assertAssertPassNotCalled();
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
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.same(666, "666");
            });

            assert.throws(function () {
                buster.assert.same(0, "");
            });

            assertAssertPassNotCalled();
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

                buster.assert.same(obj1, obj2, "How d'ya like that?");
            });
        },

        "should include objects in message": function () {
            try {
                buster.assert.same("Obj", {});
                throw new Error("Did not fail");
            } catch (e) {
                assert.equal("AssertionError", e.name);
                assert.equal("[assert.same] Expected Obj to be the " +
                             "same object as [object Object]", e.message);
            }
        },

        "should include custom message": function () {
            var obj1 = {};
            var obj2 = {};

            try {
                buster.assert.same(obj1, obj2, "Oh noes");
                throw new Error("Did not fail");
            } catch (e) {
                assert.equal("AssertionError", e.name);
                assert.equal("[assert.same] Oh noes: Expected [object Object] to " +
                             "be the same object as [object Object]", e.message);
            }
        },

        "should update assertion counter": function () {
            var obj = {};
            assertUpAssertionCount(buster.assert.same, [obj, obj], [{}, {}]);
        },

        "should format value with assert.format": function () {
            assertFormatWithFormat(buster.assert.same, {}, {});
        }
    });

    testCase("AssertNotSameTest", {
        "should fail when comparing object to itself": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                var obj = { id: 42 };

                buster.assert.notSame(obj, obj);
            });

            assertAssertPassNotCalled();
        },

        "should fail when comparing object to itself with message": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                var obj = { id: 42 };

                buster.assert.notSame(obj, obj, "These should not be the same");
            });

            assertAssertPassNotCalled();
        },

        "should pass when comparing different objects": function () {
            assert.doesNotThrow(function () {
                var obj1 = { id: 42 };
                var obj2 = { id: 42 };

                buster.assert.notSame(obj1, obj2);
            });

            assertAssertPassCalled("notSame");
        },

        "should pass when comparing different objects with message": function () {
            assert.doesNotThrow(function () {
                var obj1 = { id: 42 };
                var obj2 = { id: 42 };

                buster.assert.notSame(obj1, obj2, "These should not be the same");
            });

            assertAssertPassCalled("notSame");
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
                assert.equal("AssertionError", e.name);
                assert.equal("[assert.notSame] Expected [object Object] not to be " +
                             "the same object as [object Object]", e.message);
            }
        },

        "should include custom message": function () {
            var obj = {};

            try {
                buster.assert.notSame(obj, obj, "Oh noes");
                throw new Error("Did not fail");
            } catch (e) {
                assert.equal("AssertionError", e.name);
                assert.equal("[assert.notSame] Oh noes: Expected [object Object] " +
                             "not to be the same object as [object Object]",
                             e.message);
            }
        },

        "should update assertion counter": function () {
            var obj = {};
            assertUpAssertionCount(buster.assert.notSame, [{}, {}], [obj, obj]);
        },

        "should format value with assert.format": function () {
            var obj = {};
            assertFormatWithFormat(buster.assert.notSame, obj, obj);
        }
    });

    testCase("AssertEqualsTest", {
        "should pass when comparing object to itself": function () {
            assert.doesNotThrow(function () {
                var obj = { id: 42 };
                buster.assert.equals(obj, obj);
            });

            assertAssertPassCalled("equals");
        },

        "should pass when comparing object to itself with message": function () {
            assert.doesNotThrow(function () {
                var obj = { id: 42 };
                buster.assert.equals(obj, obj, "These should be equal");
            });

            assertAssertPassCalled("equals");
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
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.equals(function () {}, function () {});
            });

            assertAssertPassNotCalled();
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
                buster.assert.equals(obj, {}, "This is a message");
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
                buster.assert.equals({}, "Hey", "Is they, uhm, equals?");
                throw new Error("Did not fail");
            } catch (e) {
                assert.equal("[assert.equals] Is they, uhm, equals? Expected " +
                             "[object Object] to be equal to Hey", e.message);
            }
        },

        "should update assertion counter": function () {
            assertUpAssertionCount(buster.assert.equals, [{}, {}], [{ id: 42 }, {}]);
        },

        "should format value with assert.format": function () {
            assertFormatWithFormat(buster.assert.equals, {}, { id: 42 });
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
            resetAssertPassCounter();

            assert.throws(function () {
                var obj = { id: 42 };
                buster.assert.notEquals(obj, obj);
            });

            assertAssertPassNotCalled();
        },

        "should fail when comparing object to itself with message": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                var obj = { id: 42 };
                buster.assert.notEquals(obj, obj, "These should be equal");
            });

            assertAssertPassNotCalled();
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

            assertAssertPassCalled("notEquals");
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
                buster.assert.notEquals(obj, {}, "This is a message");
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
                buster.assert.notEquals({}, {}, "Is they, uhm, equals?");
                throw new Error("Did not fail");
            } catch (e) {
                assert.equal("[assert.notEquals] Is they, uhm, equals? Expected " +
                             "[object Object] not to be equal to [object Object]",
                             e.message);
            }
        },

        "should update assertion counter": function () {
            assertUpAssertionCount(buster.assert.notEquals, [{}, { id: 42 }], [{}, {}]);
        },

        "should format value with assert.format": function () {
            assertFormatWithFormat(buster.assert.notEquals, "Hmm", "Hmm");
        }
    });

    testCase("AssertTypeOfTest", {
        "should pass when types match": function () {
            assert.doesNotThrow(function () {
                buster.assert.typeOf(function () {}, "function");
            });

            assertAssertPassCalled("typeOf");
        },

        "should pass when types match with message": function () {
            assert.doesNotThrow(function () {
                buster.assert.typeOf(function () {}, "function", "OMG!");
            });

            assertAssertPassCalled("typeOf");
        },

        "should fail when types don't match": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.typeOf({}, "function");
            });

            assertAssertPassNotCalled();
        },

        "should fail when types don't match with message": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.typeOf({}, "function", "OMG!");
            });

            assertAssertPassNotCalled();
        },

        "should generate failure message": function () {
            try {
                buster.assert.typeOf({}, "function");
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
                buster.assert.typeOf("Hey", "boolean", "OMG!");
                throw new Error("Expected assert.typeOf to fail");
            } catch (e) {
                assert.equal(
                    "[assert.typeOf] OMG! Expected typeof Hey " +
                    "(string) to be boolean", e.message
                );
            }
        },

        "should update assertion counter": function () {
            assertUpAssertionCount(buster.assert.typeOf, ["", "string"], [{}, "string"]);
        },

        "should format value with assert.format": function () {
            var calls = spy(buster.assert, "format", function () {
                buster.assert.typeOf(false, "string");
            });

            assert.equal(false, calls[0][0]);
            assert.equal("string", calls[1][0]);
        },

        "should not format objects if assertion does not fail": function () {
            var calls = spy(buster.assert, "format", function () {
                buster.assert.typeOf("Oh noes!", "string");
            });

            assert.equal(0, calls.length);
        }
    });

    testCase("AssertNotTypeOfTest", {
        "should fail when types match": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.notTypeOf(function () {}, "function");
            });

            assertAssertPassNotCalled();
        },

        "should fail when types match with message": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.notTypeOf(function () {}, "function", "OMG!");
            });

            assertAssertPassNotCalled();
        },

        "should pass when types don't match": function () {
            assert.doesNotThrow(function () {
                buster.assert.notTypeOf({}, "function");
            });

            assertAssertPassCalled("notTypeOf");
        },

        "should pass when types don't match with message": function () {
            assert.doesNotThrow(function () {
                buster.assert.notTypeOf({}, "function", "OMG!");
            });

            assertAssertPassCalled("notTypeOf");
        },

        "should generate failure message": function () {
            try {
                buster.assert.notTypeOf({}, "object");
                throw new Error("Expected assert.notTypeOf to fail");
            } catch (e) {
                assert.equal(
                    "[assert.notTypeOf] Expected typeof [object Object] not to " +
                    "be object", e.message
                );
            }
        },

        "should generate failure message with custom message": function () {
            try {
                buster.assert.notTypeOf(true, "boolean", "OMG!");
                throw new Error("Expected assert.notTypeOf to fail");
            } catch (e) {
                assert.equal(
                    "[assert.notTypeOf] OMG! Expected typeof true " +
                    "not to be boolean", e.message
                );
            }
        },

        "should update assertion counter": function () {
            assertUpAssertionCount(buster.assert.notTypeOf, [true, "string"], [{}, "object"]);
        },

        "should format value with assert.format": function () {
            var calls = spy(buster.assert, "format", function () {
                buster.assert.notTypeOf(false, "boolean");
            });

            assert.equal(false, calls[0][0]);
            assert.equal("boolean", calls[1][0]);
        },

        "should not format objects if assertion passes": function () {
            var calls = spy(buster.assert, "format", function () {
                buster.assert.notTypeOf("Oh noes!", "object");
            });

            assert.equal(0, calls.length);
        }
    });

    testCase("AssertStringTest", {
        "should pass for string": function () {
            assert.doesNotThrow(function () {
                buster.assert.isString("Hey");
            });

            assertAssertPassCalled("isString");
        },

        "should pass for string with message": function () {
            assert.doesNotThrow(function () {
                buster.assert.isString("Hey", "Whatup?");
            });

            assertAssertPassCalled("isString");
        },

        "should fail for object": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.isString({});
            });

            assertAssertPassNotCalled();
        },

        "should fail for object with message": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.isString({}, "Whatup?");
            });

            assertAssertPassNotCalled();
        },

        "should fail with descriptive message": function () {
            try {
                buster.assert.isString({});
                throw new Error("Expected isString to fail");
            } catch (e) {
                assert.equal("[assert.isString] Expected typeof [object Object] " +
                             "(object) to be string", e.message);
            }
        },

        "should fail with custom message": function () {
            try {
                buster.assert.isString({}, "OMG!!");
                throw new Error("Expected isString to fail");
            } catch (e) {
                assert.equal("[assert.isString] OMG!! Expected typeof " +
                             "[object Object] (object) to be string", e.message);
            }
        },

        "should update assertion counter": function () {
            assertUpAssertionCount(buster.assert.isString, [""], [{}]);
        }
    });

    testCase("AssertObjectTest", {
        "should pass for object": function () {
            assert.doesNotThrow(function () {
                buster.assert.isObject({});
            });

            assertAssertPassCalled("isObject");
        },

        "should pass for object with message": function () {
            assert.doesNotThrow(function () {
                buster.assert.isObject({}, "Whatup?");
            });

            assertAssertPassCalled("isObject");
        },

        "should fail for function": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.isObject(function () {});
            });

            assertAssertPassNotCalled();
        },

        "should fail for null": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.isObject(null);
            });

            assertAssertPassNotCalled();
        },

        "should fail for function with message": function () {
            assert.throws(function () {
                buster.assert.isObject(function () {}, "Whatup?");
            });
        },

        "should fail with descriptive message": function () {
            try {
                buster.assert.isObject("Hey");
                throw new Error("Expected isObject to fail");
            } catch (e) {
                assert.equal("[assert.isObject] Expected typeof Hey " +
                             "(string) to be object and not null", e.message);
            }
        },

        "should fail with custom message": function () {
            try {
                buster.assert.isObject(true, "OMG!!");
                throw new Error("Expected isObject to fail");
            } catch (e) {
                assert.equal("[assert.isObject] OMG!! Expected typeof " +
                             "true (boolean) to be object and not null", e.message);
            }
        },

        "should update assertion counter": function () {
            assertUpAssertionCount(buster.assert.isObject, [{}], [""]);
        }
    });

    testCase("AssertFunctionTest", {
        "should pass for function": function () {
            assert.doesNotThrow(function () {
                buster.assert.isFunction(function () {});
            });

            assertAssertPassCalled("isFunction");
        },

        "should pass for function with message": function () {
            assert.doesNotThrow(function () {
                buster.assert.isFunction(function () {}, "Whatup?");
            });

            assertAssertPassCalled("isFunction");
        },

        "should fail for object": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.isFunction({});
            });

            assertAssertPassNotCalled();
        },

        "should fail for object with message": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.isFunction({}, "Whatup?");
            });

            assertAssertPassNotCalled();
        },

        "should fail with descriptive message": function () {
            try {
                buster.assert.isFunction("Hey");
                throw new Error("Expected isFunction to fail");
            } catch (e) {
                assert.equal("[assert.isFunction] Expected typeof Hey " +
                             "(string) to be function", e.message);
            }
        },

        "should fail with custom message": function () {
            try {
                buster.assert.isFunction(true, "OMG!!");
                throw new Error("Expected isFunction to fail");
            } catch (e) {
                assert.equal("[assert.isFunction] OMG!! Expected typeof " +
                             "true (boolean) to be function", e.message);
            }
        },

        "should update assertion counter": function () {
            assertUpAssertionCount(buster.assert.isFunction, [function () {}], [""]);
        }
    });

    testCase("AssertBooleanTest", {
        "should pass for boolean": function () {
            assert.doesNotThrow(function () {
                buster.assert.isBoolean(true);
            });

            assertAssertPassCalled("isBoolean");
        },

        "should pass for boolean with message": function () {
            assert.doesNotThrow(function () {
                buster.assert.isBoolean(true, "Whatup?");
            });

            assertAssertPassCalled("isBoolean");
        },

        "should fail for function": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.isBoolean(function () {});
            });

            assertAssertPassNotCalled();
        },

        "should fail for null": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.isBoolean(null);
            });

            assertAssertPassNotCalled();
        },

        "should fail for function with message": function () {
            assert.throws(function () {
                buster.assert.isBoolean(function () {}, "Whatup?");
            });
        },

        "should fail with descriptive message": function () {
            try {
                buster.assert.isBoolean("Hey");
                throw new Error("Expected isBoolean to fail");
            } catch (e) {
                assert.equal("[assert.isBoolean] Expected typeof Hey " +
                             "(string) to be boolean", e.message);
            }
        },

        "should fail with custom message": function () {
            try {
                buster.assert.isBoolean("Hey", "OMG!!");
                throw new Error("Expected isBoolean to fail");
            } catch (e) {
                assert.equal("[assert.isBoolean] OMG!! Expected typeof " +
                             "Hey (string) to be boolean", e.message);
            }
        },

        "should update assertion counter": function () {
            assertUpAssertionCount(buster.assert.isBoolean, [true], [""]);
        }
    });

    testCase("AssertNumberTest", {
        "should pass for number": function () {
            assert.doesNotThrow(function () {
                buster.assert.isNumber(32);
            });

            assertAssertPassCalled("isNumber");
        },

        "should pass for number with message": function () {
            assert.doesNotThrow(function () {
                buster.assert.isNumber(32, "Whatup?");
            });

            assertAssertPassCalled("isNumber");
        },

        "should fail for function": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.isNumber(function () {});
            });

            assertAssertPassNotCalled();
        },

        "should fail for null": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.isNumber(null);
            });

            assertAssertPassNotCalled();
        },

        "should fail for function with message": function () {
            assert.throws(function () {
                buster.assert.isNumber(function () {}, "Whatup?");
            });
        },

        "should fail with descriptive message": function () {
            try {
                buster.assert.isNumber("Hey");
                throw new Error("Expected isNumber to fail");
            } catch (e) {
                assert.equal("[assert.isNumber] Expected typeof Hey " +
                             "(string) to be number", e.message);
            }
        },

        "should fail with custom message": function () {
            try {
                buster.assert.isNumber(true, "OMG!!");
                throw new Error("Expected isNumber to fail");
            } catch (e) {
                assert.equal("[assert.isNumber] OMG!! Expected typeof " +
                             "true (boolean) to be number", e.message);
            }
        },

        "should update assertion counter": function () {
            assertUpAssertionCount(buster.assert.isNumber, [42], [""]);
        }
    });

    testCase("AssertNaNTest", {
        "should pass for NaN": function () {
            assert.doesNotThrow(function () {
                buster.assert.isNaN(NaN);
            });

            assertAssertPassCalled("isNaN");
        },

        "should pass for NaN with message": function () {
            assert.doesNotThrow(function () {
                buster.assert.isNaN(NaN, "Whatup?");
            });

            assertAssertPassCalled("isNaN");
        },

        "should fail for number": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.isNaN(32);
            });

            assertAssertPassNotCalled();
        },

        "should fail for number with message": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.isNaN(32, "Whatup?");
            });

            assertAssertPassNotCalled();
        },

        "should pass for function": function () {
            assert.doesNotThrow(function () {
                buster.assert.isNaN(function () {});
            });
        },

        "should pass for function with message": function () {
            assert.doesNotThrow(function () {
                buster.assert.isNaN(function () {}, "Whatup?");
            });
        },

        "should pass for object": function () {
            assert.doesNotThrow(function () {
                buster.assert.isNaN(function () {});
            });
        },

        "should fail for null": function () {
            assert.throws(function () {
                buster.assert.isNaN(null);
            });
        },

        "should fail with descriptive message": function () {
            try {
                buster.assert.isNaN(32);
                throw new Error("Expected isNaN to fail");
            } catch (e) {
                assert.equal("[assert.isNaN] Expected 32 to be NaN", e.message);
            }
        },

        "should fail with custom message": function () {
            try {
                buster.assert.isNaN(32, "OMG!");
                throw new Error("Expected isNaN to fail");
            } catch (e) {
                assert.equal("[assert.isNaN] OMG! Expected 32 to be NaN", e.message);
            }
        },

        "should update assertion counter": function () {
            assertUpAssertionCount(buster.assert.isNaN, [NaN], [42]);
        },

        "should format value with assert.format": function () {
            assertFormatWithFormat(buster.assert.isNaN, 32);
        }
    });

    testCase("AssertNotNaNTest", {
        "should fail for NaN": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.isNotNaN(NaN);
            });

            assertAssertPassNotCalled();
        },

        "should fail for NaN with message": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.isNotNaN(NaN, "Whatup?");
            });

            assertAssertPassNotCalled();
        },

        "should pass for number": function () {
            assert.doesNotThrow(function () {
                buster.assert.isNotNaN(32);
            });

            assertAssertPassCalled("isNotNaN");
        },

        "should pass for number with message": function () {
            assert.doesNotThrow(function () {
                buster.assert.isNotNaN(32, "Whatup?");
            });

            assertAssertPassCalled("isNotNaN");
        },

        "should fail for function": function () {
            assert.throws(function () {
                buster.assert.isNotNaN(function () {});
            });
        },

        "should fail for function with message": function () {
            assert.throws(function () {
                buster.assert.isNotNaN(function () {}, "Whatup?");
            });
        },

        "should fail for object": function () {
            assert.throws(function () {
                buster.assert.isNotNaN(function () {});
            });
        },

        "should pass for null": function () {
            assert.doesNotThrow(function () {
                buster.assert.isNotNaN(null);
            });
        },

        "should fail with descriptive message": function () {
            try {
                buster.assert.isNotNaN(NaN);
                throw new Error("Expected isNotNaN to fail");
            } catch (e) {
                assert.equal("[assert.isNotNaN] Expected not to be NaN", e.message);
            }
        },

        "should fail with custom message": function () {
            try {
                buster.assert.isNotNaN(NaN, "OMG!");
                throw new Error("Expected isNotNaN to fail");
            } catch (e) {
                assert.equal("[assert.isNotNaN] OMG! Expected not to be NaN", e.message);
            }
        },

        "should update assertion counter": function () {
            assertUpAssertionCount(buster.assert.isNotNaN, [42], [NaN]);
        }
    });

    testCase("AssertArray", {
        "should pass for array": function () {
            assert.doesNotThrow(function () {
                buster.assert.isArray([]);
            });

            assertAssertPassCalled("isArray");
        },

        "should pass for array with message": function () {
            assert.doesNotThrow(function () {
                buster.assert.isArray([1, 2, 3], "Message");
            });

            assertAssertPassCalled("isArray");
        },

        "should fail for object": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.isArray({});
            });

            assertAssertPassNotCalled();
        },

        "should fail for object with message": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.isArray({}, "Is it an array?");
            });

            assertAssertPassNotCalled();
        },

        "should fail for arguments": function () {
            var args;

            function captureArgs() {
                args = arguments;
            }

            captureArgs();

            assert.throws(function () {
                buster.assert.isArray(args);
            });
        },

        "should fail for array like": function () {
            var arrayLike = {
                length: 4,
                "0": "One",
                "1": "Two",
                "2": "Three",
                "3": "Four",
                splice: function () {}
            };

            assert.throws(function () {
                buster.assert.isArray(arrayLike);
            });
        },

        "should fail with descriptive message": function () {
            try {
                buster.assert.isArray({});
                throw new Error("Expected isArray to fail");
            } catch (e) {
                assert.equal("[assert.isArray] Expected [object Object] to be array",
                             e.message);
            }
        },

        "should fail with custom message": function () {
            try {
                buster.assert.isArray(NaN, "OMG!");
                throw new Error("Expected isArray to fail");
            } catch (e) {
                assert.equal("[assert.isArray] OMG! Expected NaN to be array",
                             e.message);
            }
        },

        "should update assertion counter": function () {
            assertUpAssertionCount(buster.assert.isArray, [[]], [NaN]);
        }
    });

    testCase("AssertNotArray", {
        "should fail for array": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.isNotArray([]);
            });

            assertAssertPassNotCalled();
        },

        "should fail for array with message": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.isNotArray([1, 2, 3], "Message");
            });

            assertAssertPassNotCalled();
        },

        "should pass for object": function () {
            assert.doesNotThrow(function () {
                buster.assert.isNotArray({});
            });

            assertAssertPassCalled("isNotArray");
        },

        "should pass for object with message": function () {
            assert.doesNotThrow(function () {
                buster.assert.isNotArray({}, "Is it an array?");
            });

            assertAssertPassCalled("isNotArray");
        },

        "should pass for arguments": function () {
            var args;

            function captureArgs() {
                args = arguments;
            }

            captureArgs();

            assert.doesNotThrow(function () {
                buster.assert.isNotArray(args);
            });
        },

        "should pass for array like": function () {
            var arrayLike = {
                length: 4,
                "0": "One",
                "1": "Two",
                "2": "Three",
                "3": "Four",
                splice: function () {}
            };

            assert.doesNotThrow(function () {
                buster.assert.isNotArray(arrayLike);
            });
        },

        "should fail with descriptive message": function () {
            try {
                buster.assert.isNotArray([1, 2]);
                throw new Error("Expected isNotArray to fail");
            } catch (e) {
                assert.equal("[assert.isNotArray] Expected 1,2 not to be array",
                             e.message);
            }
        },

        "should fail with custom message": function () {
            try {
                buster.assert.isNotArray([1, 2], "OMG!");
                throw new Error("Expected isNotArray to fail");
            } catch (e) {
                assert.equal("[assert.isNotArray] OMG! Expected 1,2 not to be array",
                             e.message);
            }
        },

        "should update assertion counter": function () {
            assertUpAssertionCount(buster.assert.isNotArray, [NaN], [[]]);
        }
    });

    testCase("AssertArrayLike", {
        "should pass for array": function () {
            assert.doesNotThrow(function () {
                buster.assert.isArrayLike([]);
            });

            assertAssertPassCalled("isArrayLike");
        },

        "should pass for array with message": function () {
            assert.doesNotThrow(function () {
                buster.assert.isArrayLike([1, 2, 3], "Message");
            });

            assertAssertPassCalled("isArrayLike");
        },

        "should fail for object": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.isArrayLike({});
            });

            assertAssertPassNotCalled();
        },

        "should fail for object with message": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.isArrayLike({}, "Is it an array?");
            });

            assertAssertPassNotCalled();
        },

        "should pass for arguments": function () {
            var args;

            function captureArgs() {
                args = arguments;
            }

            captureArgs();

            assert.doesNotThrow(function () {
                buster.assert.isArrayLike(args);
            });
        },

        "should pass for array like": function () {
            var arrayLike = {
                length: 4,
                "0": "One",
                "1": "Two",
                "2": "Three",
                "3": "Four",
                splice: function () {}
            };

            assert.doesNotThrow(function () {
                buster.assert.isArrayLike(arrayLike);
            });
        },

        "should fail with descriptive message": function () {
            try {
                buster.assert.isArrayLike({});
                throw new Error("Expected isArrayLike to fail");
            } catch (e) {
                assert.equal("[assert.isArrayLike] Expected [object Object] to be " +
                             "array like", e.message);
            }
        },

        "should fail with custom message": function () {
            try {
                buster.assert.isArrayLike(NaN, "OMG!");
                throw new Error("Expected isArrayLike to fail");
            } catch (e) {
                assert.equal("[assert.isArrayLike] OMG! Expected NaN to be array like",
                             e.message);
            }
        },

        "should update assertion counter": function () {
            assertUpAssertionCount(buster.assert.isArrayLike, [[]], [NaN]);
        }
    });

    testCase("AssertNotArrayLike", {
        "should fail for array": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.isNotArrayLike([]);
            });

            assertAssertPassNotCalled();
        },

        "should fail for array with message": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.isNotArrayLike([1, 2, 3], "Message");
            });

            assertAssertPassNotCalled();
        },

        "should pass for object": function () {
            assert.doesNotThrow(function () {
                buster.assert.isNotArrayLike({});
            });

            assertAssertPassCalled("isNotArrayLike");
        },

        "should pass for object with message": function () {
            assert.doesNotThrow(function () {
                buster.assert.isNotArrayLike({}, "Is it an array?");
            });

            assertAssertPassCalled("isNotArrayLike");
        },

        "should fail for arguments": function () {
            var args;

            function captureArgs() {
                args = arguments;
            }

            captureArgs();

            assert.throws(function () {
                buster.assert.isNotArrayLike(args);
            });
        },

        "should fail for array like": function () {
            var arrayLike = {
                length: 4,
                "0": "One",
                "1": "Two",
                "2": "Three",
                "3": "Four",
                splice: function () {}
            };

            assert.throws(function () {
                buster.assert.isNotArrayLike(arrayLike);
            });
        },

        "should fail with descriptive message": function () {
            try {
                buster.assert.isNotArrayLike([1, 2]);
                throw new Error("Expected isNotArrayLike to fail");
            } catch (e) {
                assert.equal("[assert.isNotArrayLike] Expected 1,2 not to be array like",
                             e.message);
            }
        },

        "should pass with custom message": function () {
            try {
                buster.assert.isNotArrayLike([1, 2], "OMG!");
                throw new Error("Expected isNotArrayLike to fail");
            } catch (e) {
                assert.equal("[assert.isNotArrayLike] OMG! Expected 1,2 not to be " +
                             "array like", e.message);
            }
        },

        "should update assertion counter": function () {
            assertUpAssertionCount(buster.assert.isNotArrayLike, [NaN], [[]]);
        }
    });

    testCase("AssertUndefinedTest", {
        "should pass for undefined": function () {
            assert.doesNotThrow(function () {
                buster.assert.isUndefined(undefined);
            });

            assertAssertPassCalled("isUndefined");
        },

        "should pass for undefined with message": function () {
            assert.doesNotThrow(function () {
                buster.assert.isUndefined(undefined, "Whatup?");
            });

            assertAssertPassCalled("isUndefined");
        },

        "should fail for function": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.isUndefined(function () {});
            });

            assertAssertPassNotCalled();
        },

        "should fail for null": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.isUndefined(null);
            });

            assertAssertPassNotCalled();
        },

        "should fail for function with message": function () {
            assert.throws(function () {
                buster.assert.isUndefined(function () {}, "Whatup?");
            });
        },

        "should fail with descriptive message": function () {
            try {
                buster.assert.isUndefined("Hey");
                throw new Error("Expected isUndefined to fail");
            } catch (e) {
                assert.equal("[assert.isUndefined] Expected typeof Hey " +
                             "(string) to be undefined", e.message);
            }
        },

        "should fail with custom message": function () {
            try {
                buster.assert.isUndefined(true, "OMG!!");
                throw new Error("Expected isUndefined to fail");
            } catch (e) {
                assert.equal("[assert.isUndefined] OMG!! Expected typeof " +
                             "true (boolean) to be undefined", e.message);
            }
        },

        "should update assertion counter": function () {
            assertUpAssertionCount(buster.assert.isUndefined, [undefined], [""]);
        }
    });

    testCase("AssertNotUndefinedTest", {
        "should fail for undefined": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.isNotUndefined(undefined);
            });

            assertAssertPassNotCalled();
        },

        "should fail for undefined with message": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.isNotUndefined(undefined, "Whatup?");
            });

            assertAssertPassNotCalled();
        },

        "should pass for function": function () {
            assert.doesNotThrow(function () {
                buster.assert.isNotUndefined(function () {});
            });

            assertAssertPassCalled("isNotUndefined");
        },

        "should pass for null": function () {
            assert.doesNotThrow(function () {
                buster.assert.isNotUndefined(null);
            });

            assertAssertPassCalled("isNotUndefined");
        },

        "should pass for function with message": function () {
            assert.doesNotThrow(function () {
                buster.assert.isNotUndefined(function () {}, "Whatup?");
            });
        },

        "should fail with descriptive message": function () {
            try {
                buster.assert.isNotUndefined(undefined);
                throw new Error("Expected isNotUndefined to fail");
            } catch (e) {
                assert.equal("[assert.isNotUndefined] Expected not to be undefined",
                             e.message);
            }
        },

        "should fail with custom message": function () {
            try {
                buster.assert.isNotUndefined(undefined, "OMG!!");
                throw new Error("Expected isNotUndefined to fail");
            } catch (e) {
                assert.equal("[assert.isNotUndefined] OMG!! Expected not to be " +
                             "undefined", e.message);
            }
        },

        "should update assertion counter": function () {
            assertUpAssertionCount(buster.assert.isNotUndefined, [""], [undefined]);
        }
    });

    testCase("AssertNullTest", {
        "should pass for null": function () {
            assert.doesNotThrow(function () {
                buster.assert.isNull(null);
            });

            assertAssertPassCalled("isNull");
        },

        "should pass for null with message": function () {
            assert.doesNotThrow(function () {
                buster.assert.isNull(null, "Whatup?");
            });

            assertAssertPassCalled("isNull");
        },

        "should fail for function": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.isNull(function () {});
            });

            assertAssertPassNotCalled();
        },

        "should fail for undefined": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.isNull(undefined);
            });

            assertAssertPassNotCalled();
        },

        "should fail for function with message": function () {
            assert.throws(function () {
                buster.assert.isNull(function () {}, "Whatup?");
            });
        },

        "should fail with descriptive message": function () {
            try {
                buster.assert.isNull("Hey");
                throw new Error("Expected isNull to fail");
            } catch (e) {
                assert.equal("[assert.isNull] Expected Hey to be null", e.message);
            }
        },

        "should fail with custom message": function () {
            try {
                buster.assert.isNull(true, "OMG!!");
                throw new Error("Expected isNull to fail");
            } catch (e) {
                assert.equal("[assert.isNull] OMG!! Expected true to be null",
                             e.message);
            }
        },

        "should update assertion counter": function () {
            assertUpAssertionCount(buster.assert.isNull, [null], [""]);
        },

        "should format value with assert.format": function () {
            assertFormatWithFormat(buster.assert.isNull, {});
        }
    });

    testCase("AssertNotNullTest", {
        "should fail for null": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.isNotNull(null);
            });

            assertAssertPassNotCalled();
        },

        "should fail for null with message": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.isNotNull(null, "Whatup?");
            });

            assertAssertPassNotCalled();
        },

        "should pass for function": function () {
            assert.doesNotThrow(function () {
                buster.assert.isNotNull(function () {});
            });

            assertAssertPassCalled("isNotNull");
        },

        "should pass for undefined": function () {
            assert.doesNotThrow(function () {
                buster.assert.isNotNull(undefined);
            });

            assertAssertPassCalled("isNotNull");
        },

        "should pass for function with message": function () {
            assert.doesNotThrow(function () {
                buster.assert.isNotNull("Whatup?", function () {});
            });
        },

        "should fail with descriptive message": function () {
            try {
                buster.assert.isNotNull(null);
                throw new Error("Expected isNotNull to fail");
            } catch (e) {
                assert.equal("[assert.isNotNull] Expected not to be null",
                             e.message);
            }
        },

        "should fail with custom message": function () {
            try {
                buster.assert.isNotNull(null, "OMG!!");
                throw new Error("Expected isNotNull to fail");
            } catch (e) {
                assert.equal("[assert.isNotNull] OMG!! Expected not to be " +
                             "null", e.message);
            }
        },

        "should update assertion counter": function () {
            assertUpAssertionCount(buster.assert.isNotNull, [""], [null]);
        }
    });

    testCase("AssertMatchTest", {
        "should pass matching regexp": function () {
            assert.doesNotThrow(function () {
                buster.assert.match("Assertions", /[a-z]/);
            });

            assertAssertPassCalled("match");
        },

        "should pass matching regexp with message": function () {
            assert.doesNotThrow(function () {
                buster.assert.match("Assertions", /[a-z]/, "Working?");
            });

            assertAssertPassCalled("match");
        },

        "should pass for generic object with test method returning true": function () {
            assert.doesNotThrow(function () {
                buster.assert.match("Assertions", {
                    test: function () {
                        return true;
                    }
                });
            });

            assertAssertPassCalled("match");
        },

        "should fail for non-matching regexp": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.match("Assertions 123", /^[a-z]$/);
            });

            assertAssertPassNotCalled();
        },

        "should fail for non-matching regexp with message": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.match("Assertions 123", /^[a-z]$/, "Woot");
            });

            assertAssertPassNotCalled();
        },

        "should fail for generic object with test method returning false": function () {
            assert.throws(function () {
                buster.assert.match({
                    test: function () {
                        return false;
                    }
                }, "Assertions");
            });
        },

        "should fail with understandable message": function () {
            try {
                buster.assert.match("Assertions 123", /^[a-z]+$/);
                throw new Error("Expected assert.match to fail");
            } catch (e) {
                assert.equal("[assert.match] Expected Assertions 123 to match " +
                             "/^[a-z]+$/", e.message);
            }
        },

        "should fail with custom message": function () {
            try {
                buster.assert.match("Assertions 123", /^[a-z]+$/, "Wow!");
                throw new Error("Expected assert.match to fail");
            } catch (e) {
                assert.equal("[assert.match] Wow! Expected Assertions 123 to match " +
                             "/^[a-z]+$/", e.message);
            }
        },

        "should format objects for message": function () {
            var calls = spy(buster.assert, "format", function () {
                buster.assert.match(/^[a-z]+$/, "Assertions 123");
            });

            assert.equal(2, calls.length);
        },

        "should fail if match object is null": function () {
            try {
                buster.assert.match("Assertions 123", null);
                throw new Error("Expected assert.match to fail");
            } catch (e) {
                assert.equal("[assert.match] Matcher (null) was not a string, " +
                             "a number, a function or an object", e.message);
            }
        },

        "should fail if match object is undefined": function () {
            try {
                buster.assert.match("Assertions 123", undefined);
                throw new Error("Expected assert.match to fail");
            } catch (e) {
                assert.equal("[assert.match] Matcher (undefined) was not a string, " +
                             "a number, a function or an object", e.message);
            }
        },

        "should fail if match object is false": function () {
            try {
                buster.assert.match("Assertions 123", false);
                throw new Error("Expected assert.match to fail");
            } catch (e) {
                assert.equal("[assert.match] Matcher (false) was not a string, " +
                             "a number, a function or an object", e.message);
            }
        },

        "should fail if matching a number against a string": function () {
            try {
                buster.assert.match("Assertions 123", 23);
                throw new Error("Expected assert.match to fail");
            } catch (e) {
                assert.equal("[assert.match] Expected Assertions 123 to match 23",
                             e.message);
            }
        },

        "should pass if matching a number against a similar string": function () {
            assert.doesNotThrow(function () {
                buster.assert.match("23", 23);
            });
        },

        "should pass if matching a number against itself": function () {
            assert.doesNotThrow(function () {
                buster.assert.match(23, 23);
            });
        },

        "should pass if matcher is a function that returns true": function () {
            assert.doesNotThrow(function () {
                buster.assert.match("Assertions 123", function (obj) {
                    return true;
                });
            });
        },

        "should fail if matcher is a function that returns false": function () {
            assert.throws(function () {
                buster.assert.match("Assertions 123", function (obj) {
                    return false;
                });
            });
        },

        "should fail if matcher is a function that returns falsy": function () {
            assert.throws(function () {
                buster.assert.match("Assertions 123", function () {});
            });
        },

        "should fail if matcher does not return explicit true": function () {
            assert.throws(function () {
                buster.assert.match("Assertions 123", function () {
                    return "Hey";
                });
            });
        },

        "should call matcher with assertion argument": function () {
            var received;

            buster.assert.match("Assertions 123", function (obj) {
                received = obj;
                return true;
            });

            assert.equal("Assertions 123", received);
        },

        "should pass if matcher is substring of matchee": function () {
            assert.doesNotThrow(function () {
                buster.assert.match("Diskord", "or");
            });
        },

        "should pass if matcher is string equal to matchee": function () {
            assert.doesNotThrow(function () {
                buster.assert.match("Diskord", "Diskord");
            });
        },

        "should match strings ignoring case": function () {
            assert.doesNotThrow(function () {
                buster.assert.match("Look ma, case-insensitive",
                                    "LoOk Ma, CaSe-InSenSiTiVe");
            });
        },

        "should fail if match string is not substring of matchee": function () {
            assert.throws(function () {
                buster.assert.match("Vim", "Emacs");
            });
        },

        "should fail if match string is not substring of object": function () {
            try {
                buster.assert.match({}, "Emacs");
                throw new Error("Expected assert.match to fail");
            } catch (e) {
                assert.equal("[assert.match] Expected [object Object] to match " +
                             "Emacs", e.message);
            }
        },

        "should fail if matcher is substring of object.toString": function () {
            assert.doesNotThrow(function () {
                buster.assert.match({
                    toString: function () {
                        return "Emacs";
                    }
                }, "Emacs");
            });
        },

        "should fail if matcher is string and matchee is falsy": function () {
            assert.throws(function () {
                buster.assert.match(null, "");
            });

            assert.throws(function () {
                buster.assert.match(undefined, "");
            });

            assert.throws(function () {
                buster.assert.match(false, "");
            });

            assert.throws(function () {
                buster.assert.match(0, "");
            });

            assert.throws(function () {
                buster.assert.match(NaN, "");
            });
        },

        "should pass if object contains all properties in matcher": function () {
            var object = {
                id: 42,
                name: "Christian",
                doIt: "yes",

                speak: function () {
                    return this.name;
                }
            };

            assert.doesNotThrow(function () {
                buster.assert.match(object, {
                    id: 42,
                    doIt: "yes"
                });
            });
        },

        "should pass for nested matcher": function () {
            var object = {
                id: 42,
                name: "Christian",
                doIt: "yes",
                owner: {
                    someDude: "Yes",
                    hello: "ok"
                },

                speak: function () {
                    return this.name;
                }
            };

            assert.doesNotThrow(function () {
                buster.assert.match(object, {
                    owner: {
                        someDude: "Yes",
                        hello: function (value) {
                            return value == "ok";
                        }
                    }
                });
            });
        },

        "should format non-regexp object for message": function () {
            var calls = spy(buster.assert, "format", function () {
                buster.assert.match("Assertions 123", null);
            });

            assert.equal(2, calls.length);
            assert.equal(null, calls[0][0]);
        },

        "should fail through assert.fail": function () {
            var calls = spy(buster.assert, "fail", function () {
                buster.assert.match("Assertions 123", "^[a-z]+$");
            });

            assert.equal(1, calls.length);
        },

        "should update assertion counter": function () {
            assertUpAssertionCount(buster.assert.match, ["a", /[a-z]/], ["1", /[a-z]/]);
        }
    });

    testCase("AssertNoMatchTest", {
        "should fail matching regexp": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.noMatch("Assertions", /[a-z]/);
            });

            assertAssertPassNotCalled();
        },

        "should fail matching regexp with message": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.noMatch("Assertions", /[a-z]/, "Working?");
            });

            assertAssertPassNotCalled();
        },

        "should fail generic object with test method returning true": function () {
            assert.throws(function () {
                buster.assert.noMatch("Assertions", {
                    test: function () {
                        return true;
                    }
                });
            });
        },

        "should pass for non-matching regexp": function () {
            assert.doesNotThrow(function () {
                buster.assert.noMatch("Assertions 123", /^[a-z]$/);
            });

            assertAssertPassCalled("noMatch");
        },

        "should pass for non-matching regexp with message": function () {
            assert.doesNotThrow(function () {
                buster.assert.noMatch("Assertions 123", /^[a-z]$/, "Woot");
            });

            assertAssertPassCalled("noMatch");
        },

        "should pass for generic object with test method returning false": function () {
            assert.doesNotThrow(function () {
                buster.assert.noMatch("Assertions", {
                    test: function () {
                        return false;
                    }
                });
            });
        },

        "should fail with understandable message": function () {
            try {
                buster.assert.noMatch("Assertions 123", /^.+$/);
                throw new Error("Expected assert.noMatch to fail");
            } catch (e) {
                assert.equal("[assert.noMatch] Expected Assertions 123 not to match " +
                             "/^.+$/", e.message);
            }
        },

        "should fail with custom message": function () {
            try {
                buster.assert.noMatch("Assertions 123", /^.+$/, "Wow!");
                throw new Error("Expected assert.match to fail");
            } catch (e) {
                assert.equal("[assert.noMatch] Wow! Expected Assertions 123 not to " +
                             "match /^.+$/", e.message);
            }
        },

        "should format objects for message": function () {
            var calls = spy(buster.assert, "format", function () {
                buster.assert.noMatch("Assertions 123", /[0-9]$/);
            });

            assert.equal(2, calls.length);
        },

        "should fail if match object is null": function () {
            try {
                buster.assert.noMatch("Assertions 123", null);
                throw new Error("Expected assert.match to fail");
            } catch (e) {
                assert.equal("[assert.noMatch] Matcher (null) was not a string, " +
                             "a number, a function or an object", e.message);
            }
        },

        "should fail if match object is undefined": function () {
            try {
                buster.assert.noMatch("Assertions 123", undefined);
                throw new Error("Expected assert.match to fail");
            } catch (e) {
                assert.equal("[assert.noMatch] Matcher (undefined) was not a string, " +
                             "a number, a function or an object", e.message);
            }
        },

        "should fail if match object is false": function () {
            try {
                buster.assert.noMatch("Assertions 123", false);
                throw new Error("Expected assert.match to fail");
            } catch (e) {
                assert.equal("[assert.noMatch] Matcher (false) was not a string, " +
                             "a number, a function or an object", e.message);
            }
        },

        "should pass if matching a number against a string": function () {
            assert.doesNotThrow(function () {
                buster.assert.noMatch("Assertions 123", 23);
            });
        },

        "should fail if matching a number against a similar string": function () {
            assert.throws(function () {
                buster.assert.noMatch(23, "23");
            });
        },

        "should fail if matching a number against itself": function () {
            assert.throws(function () {
                buster.assert.noMatch(23, 23);
            });
        },

        "should fail if matcher is a function that returns true": function () {
            assert.throws(function () {
                buster.assert.noMatch("Assertions 123", function (obj) {
                    return true;
                });
            });
        },

        "should pass if matcher is a function that returns false": function () {
            assert.doesNotThrow(function () {
                buster.assert.noMatch("Assertions 123", function (obj) {
                    return false;
                });
            });
        },

        "should pass if matcher is a function that returns falsy": function () {
            assert.doesNotThrow(function () {
                buster.assert.noMatch("Assertions 123", function () {});
            });
        },

        "should pass if matcher does not return explicit true": function () {
            assert.doesNotThrow(function () {
                buster.assert.noMatch("Assertions 123", function () {
                    return "Hey";
                });
            });
        },

        "should call matcher with assertion argument": function () {
            var received;

            buster.assert.noMatch("Assertions 123", function (obj) {
                received = obj;
                return false;
            });

            assert.equal("Assertions 123", received);
        },

        "should fail if matcher is substring of matchee": function () {
            assert.throws(function () {
                buster.assert.noMatch("Diskord", "or");
            });
        },

        "should fail if matcher is string equal to matchee": function () {
            assert.throws(function () {
                buster.assert.noMatch("Diskord", "Diskord");
            });
        },

        "should pass if match string is not substring of matchee": function () {
            assert.doesNotThrow(function () {
                buster.assert.noMatch("Vim", "Emacs");
            });
        },

        "should pass if match string is not substring of object": function () {
            assert.doesNotThrow(function () {
                buster.assert.noMatch({}, "Emacs");
            });
        },

        "should pass if matcher is substring of object.toString": function () {
            assert.throws(function () {
                buster.assert.noMatch({
                    toString: function () {
                        return "Emacs";
                    }
                }, "Emacs");
            });
        },

        "should pass if matcher is string and matchee is falsy": function () {
            assert.doesNotThrow(function () {
                buster.assert.noMatch(null, "");
                buster.assert.noMatch(undefined, "");
                buster.assert.noMatch(false, "");
                buster.assert.noMatch(0, "");
                buster.assert.noMatch(NaN, "");
            });
        },

        "should fail if object contains all properties in matcher": function () {
            var object = {
                id: 42,
                name: "Christian",
                doIt: "yes",

                speak: function () {
                    return this.name;
                }
            };

            assert.throws(function () {
                buster.assert.noMatch(object, {
                    id: 42,
                    doIt: "yes"
                });
            });
        },

        "should fail for nested matcher": function () {
            var object = {
                id: 42,
                name: "Christian",
                doIt: "yes",
                owner: {
                    someDude: "Yes",
                    hello: "ok"
                },

                speak: function () {
                    return this.name;
                }
            };

            assert.throws(function () {
                buster.assert.noMatch(object, {
                    owner: {
                        someDude: "Yes",
                        hello: function (value) {
                            return value == "ok";
                        }
                    }
                });
            });
        },

        "should pass for nested matcher with mismatching properties": function () {
            var object = {
                id: 42,
                name: "Christian",
                doIt: "yes",
                owner: {
                    someDude: "Yes",
                    hello: "ok"
                },

                speak: function () {
                    return this.name;
                }
            };

            assert.doesNotThrow(function () {
                buster.assert.noMatch(object, {
                    owner: {
                        someDude: "No",
                        hello: function (value) {
                            return value == "ok";
                        }
                    }
                });
            });
        },

        "should format non-regexp object for message": function () {
            var calls = spy(buster.assert, "format", function () {
                buster.assert.noMatch("Assertions 123", null);
            });

            assert.equal(2, calls.length);
            assert.equal(null, calls[0][0]);
        },

        "should fail through assert.fail": function () {
            var calls = spy(buster.assert, "fail", function () {
                buster.assert.noMatch("Assertions 123", "Assertions");
            });

            assert.equal(1, calls.length);
        },

        "should update assertion counter": function () {
            assertUpAssertionCount(buster.assert.noMatch, [/[a-z]/, [/[a-z]/, "a"], "1"]);
        }
    });

    testCase("AssertExceptionTest", {
        "should pass when callback throws": function () {
            assert.doesNotThrow(function () {
                buster.assert.exception(function () {
                    throw new Error();
                });
            });

            assertAssertPassCalled("exception");
        },

        "should fail when callback does not throw": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.exception(function () {});
            });

            assertAssertPassNotCalled();
        },

        "should fail with message": function () {
            try {
                buster.assert.exception(function () {});
                throw new Error("Didn't fail");
            } catch (e) {
                assert.equal("[assert.exception] Expected exception",
                             e.message);
            }
        },

        "should fail with custom message": function () {
            try {
                buster.assert.exception(function () {}, null, "Awww");
                throw new Error("Didn't fail");
            } catch (e) {
                assert.equal("[assert.exception] Awww: Expected exception",
                             e.message);
            }
        },

        "should pass when callback throws expected type": function () {
            assert.doesNotThrow(function () {
                buster.assert.exception(function () {
                    throw new TypeError("Oh hmm");
                }, "TypeError");
            });

            assertAssertPassCalled("exception");
        },

        "should pass with custom message and expected type": function () {
            assert.doesNotThrow(function () {
                buster.assert.exception(function () {
                    throw new TypeError();
                }, "TypeError", "Okidoki");
            });

            assertAssertPassCalled("exception");
        },

        "should fail when callback does not throw expected type": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.exception(function () {
                    throw new Error();
                }, "TypeError");
            });

            assertAssertPassNotCalled();
        },

        "should fail when callback does not throw and specific type os expected": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.exception(function () {}, "TypeError");
            });

            assertAssertPassNotCalled();
        },

        "should fail with message when callback does not throw expected type": function () {
            assert.throws(function () {
                buster.assert.exception(function () {
                    throw new Error();
                }, "TypeError", "Oh noes");
            });
        },

        "should fail with message when callback does not throw and type is expected": function () {
            assert.throws(function () {
                buster.assert.exception(function () {}, "TypeError", "Oh noes");
            });
        },

        "should fail with message when not throwing": function () {
            try {
                buster.assert.exception(function () {}, "TypeError");
                throw new Error("Didn't fail");
            } catch (e) {
                assert.equal("[assert.exception] Expected TypeError but no exception was thrown",
                             e.message);
            }
        },

        "should fail with custom message when not throwing": function () {
            try {
                buster.assert.exception(function () {}, "TypeError", "Awww");
                throw new Error("Didn't fail");
            } catch (e) {
                assert.equal("[assert.exception] Awww: Expected TypeError but no exception was thrown",
                             e.message);
            }
        },

        "should fail with message when throwing wrong kind of exception": function () {
            try {
                buster.assert.exception(function () {
                    throw new Error();
                }, "TypeError");

                throw new Error("Didn't fail");
            } catch (e) {
                assert.equal("[assert.exception] Expected TypeError but threw Error",
                             e.message);
            }
        },

        "should fail with custom message when throwing wrong kind of exception": function () {
            try {
                buster.assert.exception(function () {
                    throw new Error();
                }, "TypeError", "Awww");
                throw new Error("Didn't fail");
            } catch (e) {
                assert.equal("[assert.exception] Awww: Expected TypeError but threw Error",
                             e.message);
            }
        },

        "should fail if not passed arguments": function () {
            try {
                buster.assert.exception();
                throw new Error("Expected assert.exception to fail");
            } catch (e) {
                assert.equal("[assert.exception] Expected to receive at least 1 argument", e.message);
            }
        },

        "should update assertion counter": function () {
            assertUpAssertionCount(buster.assert.exception, [function () {
                throw new Error();
            }], [function () {}]);
        }
    });

    testCase("AssertNoExceptionTest", {
        "should fail when callback throws": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.noException(function () {
                    throw new Error();
                });
            });

            assertAssertPassNotCalled();
        },

        "should pass when callback does not throw": function () {
            assert.doesNotThrow(function () {
                buster.assert.noException(function () {});
            });

            assertAssertPassCalled("noException");
        },

        "should pass with message when callback does not throw": function () {
            assert.doesNotThrow(function () {
                buster.assert.noException(function () {}, "Oh noes");
            });

            assertAssertPassCalled("noException");
        },

        "should fail with message": function () {
            try {
                buster.assert.noException(function () {
                    throw new Error();
                });

                throw new Error("Didn't fail");
            } catch (e) {
                assert.equal("[assert.noException] Expected not to throw but threw Error",
                             e.message);
            }
        },

        "should fail with custom message": function () {
            resetAssertPassCounter();

            try {
                buster.assert.noException(function () {
                    throw new Error();
                }, "Awww");

                throw new Error("Didn't fail");
            } catch (e) {
                assert.equal("[assert.noException] Awww: Expected not to throw but threw Error",
                             e.message);
            }

            assertAssertPassNotCalled();
        },

        "should fail if not passed arguments": function () {
            try {
                buster.assert.noException();
                throw new Error("Expected assert.noException to fail");
            } catch (e) {
                assert.equal("[assert.noException] Expected to receive at least 1 argument", e.message);
            }
        },

        "should update assertion counter": function () {
            assertUpAssertionCount(buster.assert.noException,
                                   [function () {}], [function () {
                throw new Error();
            }]);
        }
    });

    testCase("AssertTagNameTest", {
        "should pass for matching tag names": function () {
            assert.doesNotThrow(function () {
                buster.assert.tagName({ tagName: "li" }, "li");
            });

            assertAssertPassCalled("tagName");
        },

        "should pass for case-insensitive matching tag names": function () {
            assert.doesNotThrow(function () {
                buster.assert.tagName({ tagName: "LI" }, "li");
                buster.assert.tagName({ tagName: "li" }, "LI");
                buster.assert.tagName({ tagName: "LI" }, "LI");
            });

            assertAssertPassCalled("tagName");
        },

        "should pass for matching tag names with message": function () {
            assert.doesNotThrow(function () {
                buster.assert.tagName({ tagName: "li" }, "li", "Yup");
            });

            assertAssertPassCalled("tagName");
        },

        "should fail for non-matching tag names": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.tagName({ tagName: "li" }, "p");
            });

            assert.throws(function () {
                buster.assert.tagName({ tagName: "li" }, "i");
            });

            assertAssertPassNotCalled();
        },

        "should fail for non-matching with message": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.tagName({ tagName: "li" }, "p", "Aww");
            });

            assertAssertPassNotCalled();
        },

        "should fail with message": function () {
            try {
                buster.assert.tagName({ tagName: "li" }, "p");
                throw new Error("Didn't fail");
            } catch (e) {
                assert.equal("[assert.tagName] Expected tagName to be p but was li",
                             e.message);
            }
        },

        "should fail custom with message": function () {
            try {
                buster.assert.tagName({ tagName: "li" }, "p", "Awww");
                throw new Error("Didn't fail");
            } catch (e) {
                assert.equal("[assert.tagName] Awww: Expected tagName to be p but was li",
                             e.message);
            }
        },

        "should represent expected value in message": function () {
            try {
                buster.assert.tagName({ tagName: "p" }, {}, "Awww");
                throw new Error("Didn't fail");
            } catch (e) {
                assert.equal(
                    "[assert.tagName] Awww: Expected tagName to be [object Object] but was p",
                    e.message
                );
            }
        },

        "should fail if not passed arguments": function () {
            try {
                buster.assert.tagName();
                throw new Error("Expected assert.tagName to fail");
            } catch (e) {
                assert.equal("[assert.tagName] Expected to receive at least 2 arguments", e.message);
            }
        },

        "should fail if not passed tag name": function () {
            try {
                buster.assert.tagName({});
                throw new Error("Expected assert.tagName to fail");
            } catch (e) {
                assert.equal("[assert.tagName] Expected to receive at least 2 arguments", e.message);
            }
        },

        "should fail if object does not have tagName property": function () {
            try {
                buster.assert.tagName({}, "li");
                throw new Error("Expected assert.tagName to fail");
            } catch (e) {
                assert.equal("[assert.tagName] Expected [object Object] to have tagName property", e.message);
            }
        },

        "should pass for DOM elements": function () {
            if (typeof document != "undefined") {
                assert.doesNotThrow(function () {
                    var li = document.createElement("li");
                    buster.assert.tagName(li, "li");
                });
            }
        },

        "should update assertion counter": function () {
            var el = { tagName: "li" };

            assertUpAssertionCount(buster.assert.tagName, [el, "li"], [el, "p"]);
        }
    });

    testCase("AssertNotTagNameTest", {
        "should fail for matching tag names": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.notTagName({ tagName: "li" }, "li");
            });

            assertAssertPassNotCalled();
        },

        "should fail for case-insensitive matching tag names": function () {
            resetAssertPassCounter();

            assert.throws(function () {
                buster.assert.notTagName({ tagName: "LI" }, "li");
            });

            assert.throws(function () {
                buster.assert.notTagName({ tagName: "li" }, "li");
            });

            assert.throws(function () {
                buster.assert.notTagName({ tagName: "LI" }, "li");
            });

            assertAssertPassNotCalled();
        },

        "should fail for matching tag names with message": function () {
            assert.throws(function () {
                buster.assert.notTagName({ tagName: "li" }, "li", "Yup");
            });
        },

        "should pass for non-matching tag names": function () {
            assert.doesNotThrow(function () {
                buster.assert.notTagName({ tagName: "li" }, "p");
                buster.assert.notTagName({ tagName: "li" }, "i");
            });

            assertAssertPassCalled("notTagName");
        },

        "should pass for case-insensitive non-matching tag names": function () {
            assert.doesNotThrow(function () {
                buster.assert.notTagName({ tagName: "li" }, "P");
                buster.assert.notTagName({ tagName: "LI" }, "i");
            });

            assertAssertPassCalled("notTagName");
        },

        "should pass for non-matching with message": function () {
            assert.doesNotThrow(function () {
                buster.assert.notTagName({ tagName: "li" }, "p", "Aww");
            });

            assertAssertPassCalled("notTagName");
        },

        "should fail with message": function () {
            try {
                buster.assert.notTagName({ tagName: "li" }, "li");
                throw new Error("Didn't fail");
            } catch (e) {
                assert.equal("[assert.notTagName] Expected tagName not to be li",
                             e.message);
            }
        },

        "should fail with custom message": function () {
            try {
                buster.assert.notTagName({ tagName: "p" }, "p", "Awww");
                throw new Error("Didn't fail");
            } catch (e) {
                assert.equal("[assert.notTagName] Awww: Expected tagName not to be p",
                             e.message);
            }
        },

        "should fail if not passed arguments": function () {
            try {
                buster.assert.notTagName();
                throw new Error("Expected assert.notTagName to fail");
            } catch (e) {
                assert.equal("[assert.notTagName] Expected to receive at least 2 arguments", e.message);
            }
        },

        "should fail if not passed tag name": function () {
            try {
                buster.assert.notTagName({});
                throw new Error("Expected assert.notTagName to fail");
            } catch (e) {
                assert.equal("[assert.notTagName] Expected to receive at least 2 arguments", e.message);
            }
        },

        "should fail if object does not have tagName property": function () {
            try {
                buster.assert.notTagName({}, "li");
                throw new Error("Expected assert.notTagName to fail");
            } catch (e) {
                assert.equal("[assert.notTagName] Expected [object Object] to have tagName property", e.message);
            }
        },

        "should pass for DOM elements": function () {
            if (typeof document != "undefined") {
                assert.doesNotThrow(function () {
                    var li = document.createElement("li");
                    buster.assert.notTagName(li, "p");
                });
            }
        },

        "should update assertion counter": function () {
            var el = { tagName: "li" };

            assertUpAssertionCount(buster.assert.notTagName, [el, "p"], [el, "li"]);
        }
    });

    testCase("AssertClassName", {
        "should fail without arguments": function () {
            resetAssertPassCounter();

            try {
                buster.assert.className();
                throw new Error("assert.className did not fail");
            } catch (e) {
                assert.equal("[assert.className] Expected to receive at least 2 arguments", e.message);
            }

            assertAssertPassNotCalled();
        },

        "should fail without class name": function () {
            resetAssertPassCounter();

            try {
                buster.assert.className({});
                throw new Error("assert.className did not fail");
            } catch (e) {
                assert.equal("[assert.className] Expected to receive at least 2 arguments", e.message);
            }

            assertAssertPassNotCalled();
        },

        "should fail if object does not have className property": function () {
            resetAssertPassCounter();

            try {
                buster.assert.className({}, "item");
                throw new Error("assert.className did not fail");
            } catch (e) {
                assert.equal("[assert.className] Expected object to have className property", e.message);
            }

            assertAssertPassNotCalled();
        },

        "should fail with message if object does not have className property": function () {
            resetAssertPassCounter();

            try {
                buster.assert.className({}, "item", "Won't work");
                throw new Error("assert.className did not fail");
            } catch (e) {
                assert.equal("[assert.className] Won't work: Expected object to have className property", e.message);
            }

            assertAssertPassNotCalled();
        },

        "should fail when element does not include class name": function () {
            resetAssertPassCounter();

            try {
                buster.assert.className({ className: "" }, "item");
                throw new Error("assert.className did not fail");
            } catch (e) {
                assert.equal("[assert.className] Expected object's className to include item but was ", e.message);
            }

            assertAssertPassNotCalled();
        },

        "should pass when element's class name matches": function () {
            assert.doesNotThrow(function () {
                buster.assert.className({ className: "item" }, "item");
            });

            assertAssertPassCalled("className");
        },

        "should pass when element includes class name": function () {
            assert.doesNotThrow(function () {
                buster.assert.className({ className: "feed item" }, "item");
            });

            assertAssertPassCalled("className");
        },

        "should fail when element does not include all class names": function () {
            assert.throws(function () {
                buster.assert.className({ className: "feed item" }, "item post");
            });
        },

        "should pass when element includes all class names": function () {
            assert.doesNotThrow(function () {
                buster.assert.className({ className: "feed item post" }, "item post");
            });

            assertAssertPassCalled("className");
        },

        "should pass when element includes all class names in different order": function () {
            assert.doesNotThrow(function () {
                buster.assert.className({ className: "a b c d e" }, "e a d");
            });
        },

        "should pass with class names as array": function () {
            assert.doesNotThrow(function () {
                buster.assert.className({ className: "a b c d e" }, ["e", "a", "d"]);
            });
        },

        "should pass for DOM elements": function () {
            if (typeof document != "undefined") {
                assert.doesNotThrow(function () {
                    var li = document.createElement("li");
                    li.className = "some thing in here";

                    buster.assert.className(li, "thing some");
                });
            }
        },

        "should update assertion counter": function () {
            var el = { className: "item" };

            assertUpAssertionCount(buster.assert.className, [el, "item"], [el, "eh"]);
        }
    });

    testCase("AssertClassName", {
        "should fail without arguments": function () {
            resetAssertPassCounter();

            try {
                buster.assert.notClassName();
                throw new Error("assert.notClassName did not fail");
            } catch (e) {
                assert.equal("[assert.notClassName] Expected to receive at least 2 arguments", e.message);
            }

            assertAssertPassNotCalled();
        },

        "should fail without class name": function () {
            resetAssertPassCounter();

            try {
                buster.assert.notClassName({ className: "item" });
                throw new Error("assert.notClassName did not fail");
            } catch (e) {
                assert.equal("[assert.notClassName] Expected to receive at least 2 arguments", e.message);
            }

            assertAssertPassNotCalled();
        },

        "should fail if object does not have className property": function () {
            resetAssertPassCounter();

            try {
                buster.assert.notClassName({}, "item");
                throw new Error("assert.notClassName did not fail");
            } catch (e) {
                assert.equal("[assert.notClassName] Expected object to have className property", e.message);
            }

            assertAssertPassNotCalled();
        },

        "should fail with message if object does not have className property": function () {
            resetAssertPassCounter();

            try {
                buster.assert.notClassName({}, "item", "Won't work");
                throw new Error("assert.notClassName did not fail");
            } catch (e) {
                assert.equal("[assert.notClassName] Won't work: Expected object to have className property", e.message);
            }

            assertAssertPassNotCalled();
        },

        "should pass when element does not include class name": function () {
            assert.doesNotThrow(function () {
                buster.assert.notClassName({ className: "" }, "item");
            });

            assertAssertPassCalled("notClassName");
        },

        "should fail when element's class name matches": function () {
            resetAssertPassCounter();

            try {
                buster.assert.notClassName({ className: "item" }, "item");
                throw new Error("assert.notClassName did not throw");
            } catch (e) {
                assert.equal("[assert.notClassName] Expected object's className " +
                             "not to include item", e.message);
            }

            assertAssertPassNotCalled();
        },

        "should fail with message when element's class name matches": function () {
            try {
                buster.assert.notClassName({ className: "item" }, "item", "Aww");
                throw new Error("assert.notClassName did not throw");
            } catch (e) {
                assert.equal("[assert.notClassName] Aww: Expected object's " +
                             "className not to include item", e.message);
            }
        },

        "should fail when element includes class name": function () {
            assert.throws(function () {
                buster.assert.notClassName({ className: "feed item" }, "item");
            });
        },

        "should pass when element does not include all class names": function () {
            assert.doesNotThrow(function () {
                buster.assert.notClassName({ className: "feed item" }, "item post");
            });

            assertAssertPassCalled("notClassName");
        },

        "should fail when element includes all class names": function () {
            assert.throws(function () {
                buster.assert.notClassName({ className: "feed item post" }, "item post");
            });
        },

        "should fail when element includes all class names in different order": function () {
            assert.throws(function () {
                buster.assert.notClassName({ className: "a b c d e" }, "e a d");
            });
        },

        "should fail with class names as array": function () {
            assert.throws(function () {
                buster.assert.notClassName({ className: "a b c d e" }, ["e", "a", "d"]);
            });
        },

        "should pass with class names as array": function () {
            assert.doesNotThrow(function () {
                buster.assert.notClassName({ className: "a b c d e" }, ["f", "a", "d"]);
            });
        },

        "should pass for DOM elements": function () {
            if (typeof document != "undefined") {
                assert.doesNotThrow(function () {
                    var li = document.createElement("li");
                    li.className = "some thing in here";

                    buster.assert.notClassName(li, "something");
                });
            }
        },

        "should update assertion counter": function () {
            var el = { className: "item" };

            assertUpAssertionCount(buster.assert.notClassName, [el, "eh"], [el, "item"]);
        }
    });
}());
