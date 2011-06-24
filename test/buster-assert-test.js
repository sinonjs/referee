/*jslint onevar: false, browser: true, eqeqeq: false, nomen: false,
         plusplus: false, regexp: false*/
/*global require, __dirname*/
if (typeof require != "undefined") {
    var assert = require("assert");
    var sinon = require("sinon");
    var testHelper = require("./test-helper");

    var buster = {
        assert: require("./../lib/buster-assert"),
        util: require("buster-util")
    };
}

(function () {
    var testArgCount;
    var labels = ["no arguments", "one argument", "two arguments",
                  "three arguments", "four arguments"];

    function generateCallbackTest(assertion, tests, args, count) {
        var suffix = "", i = 2;
        var testName = "should not throw if not configured to for ";

        while (tests[testName + labels[count] + suffix]) {
            suffix = " #" + (i++);
        }

        tests[testName + labels[count] + suffix] =
            testHelper.assertFailCallbacks(function () {
                buster.assert.throwOnFailure = false;
                buster.assert[assertion].apply(buster.assert, args.slice(0, count));
            });
    }

    function assertionTests(assertion, callback) {
        var tests = {
            setUp: testHelper.setUp,
            tearDown: testHelper.tearDown
        };

        var pass = function (message) {
            var args = [assertion].concat(Array.prototype.slice.call(arguments, 1));
            tests["should pass " + message] = assertPass.apply(null, args);
        };

        var fail = function (message, test) {
            var args = [assertion].concat(Array.prototype.slice.call(arguments, 1));
            tests["should fail " + message] = assertFail.apply(null, args);
        };

        var msg = function (message, msg) {
            var args = [assertion].concat(Array.prototype.slice.call(arguments, 1));
            return tests["should " + message] = assertMessage.apply(null, args);
        };

        var callbacks = function () {
            var args = Array.prototype.slice.call(arguments);

            if (typeof testArgCount == "number") {
                generateCallbackTest(assertion, tests, args, testArgCount);
            } else {
                for (var i = 0, l = args.length; i <= l; ++i) {
                    generateCallbackTest(assertion, tests, args, i);
                }
            }

            testArgCount = null;
        };

        callback.call(tests, pass, fail, msg, callbacks);
        return buster.util.testCase("Assert" + assertion + "Test", tests);
    }

    function assertFail(assertion) {
        var args = Array.prototype.slice.call(arguments, 1);

        return function () {
            sinon.spy(buster.assert, "fail");
            var okListener = sinon.spy();
            buster.assert.on("pass", okListener);
            var failListener = sinon.spy();
            buster.assert.on("failure", failListener);

            try {
                buster.assert[assertion].apply(buster.assert, args);
            } catch (e) {}

            assert.ok(buster.assert.fail.calledOnce);
            assert.equal(1, buster.assert.count);
            assert.ok(!okListener.called);
            assert.ok(failListener.calledOnce);
        };
    }

    function assertPass(assertion) {
        var args = Array.prototype.slice.call(arguments, 1);

        return function () {
            var okListener = sinon.spy();
            buster.assert.on("pass", okListener);
            sinon.spy(buster.assert, "fail");
            var failListener = sinon.spy();
            buster.assert.on("failure", failListener);

            try {
                buster.assert[assertion].apply(buster.assert, args);
            } catch(e) {}

            assert.equal(okListener.callCount, 1);
            assert.ok(okListener.calledWith(assertion));
            assert.equal(1, buster.assert.count);
            assert.ok(!buster.assert.fail.called);
            assert.ok(!failListener.called);
        };
    }

    function assertMessage(assertion, message) {
        var args = Array.prototype.slice.call(arguments, 2);

        var test = function () {
            sinon.spy(buster.assert, "format");
            var failListener = sinon.spy();
            buster.assert.on("failure", failListener);
            var msg;

            try {
                buster.assert[assertion].apply(buster.assert, args);
                throw new Error(assertion + " expected to fail");
            } catch(e) {
                assert.equal(e.name, "AssertionError", e.name + ": " + e.message);
                assert.equal(e.message, message);
                msg = e.message;
            }

            var expected = test.expectedFormats;

            if (typeof expected != "number") {
                expected = args.length;

                if (typeof args[args.length - 1] == "string") {
                    expected -= 1;
                }
            }

            assert.ok(buster.assert.format.callCount >= expected);

            for (var i = 0, l = expected; i < l; ++i) {
                if (isNaN(args[i]) && isNaN(buster.assert.format.args[i][0])) {
                    continue;
                }

                assert.ok(buster.assert.format.calledWith(args[i]));
            }

            assert.equal(failListener.args[0][0].name, "AssertionError");
            assert.equal(failListener.args[0][0].message, msg);
        };

        return test;
    }

    buster.util.testCase("AssertTest", {
        setUp: testHelper.setUp,
        tearDown: testHelper.tearDown,

        "should allow true": function () {
            var okListener = sinon.spy();
            buster.assert.on("pass", okListener);

            assert.doesNotThrow(function () {
                buster.assert(true);
            });

            assert.ok(okListener.calledOnce);
            assert.ok(okListener.calledWith("assert"));
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
        },

        "should not allow false": function () {
            var okListener = sinon.spy();
            buster.assert.on("pass", okListener);

            assert.throws(function () {
                buster.assert(false);
            });

            assert.ok(!okListener.called);
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
            buster.assert.count = 0;

            try {
                buster.assert(true);
                buster.assert(false);
            } catch (e) {}

            assert.equal(2, buster.assert.count);
        },

        "should format value with assert.format": function () {
            buster.assert.format = sinon.spy();

            try {
                buster.assert(false);
            } catch (e) {}

            assert.ok(buster.assert.format.calledOnce);
            assert.ok(buster.assert.format.calledWith(false));
        },

        "should fail if not passed arguments": function () {
            try {
                buster.assert();
                throw new Error("Expected assert to fail");
            } catch (e) {
                assert.equal("[assert] Expected to receive at least 1 argument", e.message);
            }
        },

        "should not throw if not configured to": testHelper.assertFailCallbacks(function () {
            buster.assert.throwOnFailure = false;
            buster.assert(false);
        })
    });

    assertionTests("isTrue", function (pass, fail, msg, callbacks) {
        pass("for true", true);
        pass("for true with message", true, "Yup");
        fail("for false", false);
        fail("for false with message", false, "Aww");
        msg("fail with message",
            "[assert.isTrue] Awww: Expected false to be true", false, "Awww");
        msg("represent expected value in message",
            "[assert.isTrue] Awww: Expected [object Object] to be true", {}, "Awww");
        fail("for object", {});
        fail("for array", []);
        fail("for string", "32");
        fail("for number", 32);
        msg("fail if not passed arguments",
            "[assert.isTrue] Expected to receive at least 1 argument");
        callbacks(false);
    });

    assertionTests("isFalse", function (pass, fail, msg, callbacks) {
        pass("for false", false);
        pass("for false with message", false, "Yup");
        fail("for true", true);
        fail("for true with message", true, "Awww");
        msg("fail with message",
            "[assert.isFalse] Sucks: Expected true to be false", true, "Sucks");
        msg("represent expected value in message",
            "[assert.isFalse] Sucker: Expected [object Object] to be false",
            {}, "Sucker");
        fail("for empty string", "");
        fail("for 0", 0);
        fail("for NaN", NaN);
        fail("for null", null);
        fail("for undefined", undefined);
        callbacks(true);
    });

    var obj = { id: 42 };
    var obj2 = { id: 42 };

    assertionTests("same", function (pass, fail, msg, callbacks) {
        pass("when comparing object to itself", obj, obj);
        pass("when comparing object to itself with message",
             obj, obj, "These should be the same");
        fail("when comparing different objects", obj, obj2);
        pass("when comparing strings", "Hey", "Hey");
        pass("when comparing booleans", true, true);
        pass("when comparing numbers", 32, 32);
        pass("when comparing infinity", Infinity, Infinity);
        fail("when comparing without coercion", 666, "666");
        fail("when comparing falsy values without coercion", 0, "");
        pass("when comparing null to null", null, null);
        pass("when comparing undefined to undefined", undefined, undefined);
        fail("when comparing NaN to NaN", NaN, NaN);
        fail("when comparing different objects with message",
             obj, obj2, "How d'ya like that?");
        msg("include objects in message",
            "[assert.same] Expected Obj to be the same object as [object Object]",
            "Obj", {});
        msg("include custom message",
            "[assert.same] Oh noes: Expected [object Object] to be the same object as [object Object]", obj, obj2, "Oh noes");
        callbacks(true, false);
    });

    assertionTests("notSame", function (pass, fail, msg, callbacks) {
        fail("comparing object to itsel", obj, obj);
        fail("with message", obj, obj, "Aww");
        pass("when comparing different objects", obj, obj2);
        pass("with message", obj, obj2, "Aww");
        fail("when comparing strings", "Hey", "Hey");
        fail("when comparing booleans", true, true);
        fail("when comparing numbers", 32, 32);
        fail("when comparing infinity", Infinity, Infinity);
        pass("when comparing NaN", NaN, NaN);
        fail("when comparing null to null", null, null);
        fail("when comparing undefined to undefined", undefined, undefined);
        msg("include objects in message",
            "[assert.notSame] Expected [object Object] not to be the same object as [object Object]", obj, obj);
        msg("include custom message",
            "[assert.notSame] Aww: Expected [object Object] not to be the same object as [object Object]", obj, obj, "Aww");
        callbacks(2, 2);
    });

    assertionTests("equals", function (pass, fail, msg, callbacks) {
        var func = function () {};
        var arr = [];
        var date = new Date();
        var sameDate = new Date(date.getTime());
        var anotherDate = new Date(date.getTime() - 10);

        pass("when comparing object to itself", obj, obj);
        pass("when comparing object to itself with message", obj, obj, "Msg");
        pass("when comparing strings", "Hey", "Hey");
        pass("when comparing numbers", 32, 32);
        pass("when comparing booleans", false, false);
        pass("when comparing null", null, null);
        pass("when comparing undefined", undefined, undefined);
        pass("when comparing function to itself", func, func);
        fail("when comparing functions", function () {}, function () {});
        pass("when comparing array to itself", arr, arr);
        pass("when comparing date objects with same date", date, sameDate);
        fail("when comparing date objects with different dates", date, anotherDate);
        fail("when comparing date objects to null", date, null);
        pass("when comparing strings and numbers with coercion", "4", 4);
        pass("when comparing numbers and strings with coercion", 4, "4");
        pass("when comparing number object with coercion", 32, new Number(32));
        pass("when comparing number object reverse with coercion", new Number(32), 32);
        pass("when comparing falsy values with coercion", 0, "");
        pass("when comparing falsy values reverse with coercion", "", 0);
        pass("when comparing string boxing with coercion", "4", new String("4"));
        pass("when comparing string boxing reverse with coercion", new String("4"), "4");
        fail("when comparing objects with different own properties",
             { id: 42 }, { id: 42, di: 24 });
        fail("when comparing objects with different own properties #2",
             { id: undefined }, { di: 24 });
        fail("when comparing objects with different own properties #2",
             { id: 24 }, { di: undefined });
        pass("when comparing objects with one property", { id: 42 }, { id: 42 });
        pass("when comparing objects with one object property",
             { obj: { id: 42 } }, { obj: { id: 42 } });
        fail("when comparing objects with one property with different values",
             { id: 42 }, { id: 24 });

        var deepObject = {
            id: 42,
            name: "Hey",
            sayIt: function () {
                return this.name;
            },

            child: {
                speaking: function () {}
            }
        };

        pass("when comparing complex objects", deepObject, {
            sayIt: deepObject.sayIt,
            child: { speaking: deepObject.child.speaking },
            id: 42,
            name: "Hey"
        });

        function func() {}

        pass("when comparing arrays",
             [1, 2, "Hey there", func, { id: 42, prop: [2, 3] }],
             [1, 2, "Hey there", func, { id: 42, prop: [2, 3] }]);

        pass("when comparing regexp literals", /a/, /a/);
        pass("when comparing regexp objects", new RegExp("[a-z]+"), new RegExp("[a-z]+"));

        var re1 = new RegExp("[a-z]+");
        var re2 = new RegExp("[a-z]+");
        re2.id = 42;

        fail("when comparing nested array with shallow array", [["hey"]], ["hey"]);
        fail("when comparing regexp objects with custom properties", re1, re2);
        fail("when comparing different objects", { id: 42 }, {});
        fail("when comparing different objects with message", { id: 42 }, {}, "Hmm");
        fail("when comparing object to null", {}, null);
        fail("when comparing object to undefined", {}, undefined);
        fail("when comparing object to false", {}, false);
        fail("when comparing false to object", false, {});
        fail("when comparing object to true", {}, true);
        fail("when comparing true to object", true, {});
        fail("when comparing 'empty' object to date", {}, new Date());
        fail("when comparing 'empty' object to string object", {}, new String());
        fail("when comparing 'empty' object to number object", {}, new Number());
        fail("when comparing 'empty' object to empty array", {}, []);

        function gather() { return arguments; }
        var arrayLike = { length: 4, "0": 1, "1": 2, "2": {}, "3": [] };

        pass("when comparing arguments to array", [1,2,{},[]], gather(1, 2, {}, []));
        pass("when comparing array to arguments", gather(), []);

        pass("when comparing arguments to array like object",
             arrayLike, gather(1, 2, {}, []));

        msg("fail with understandable message",
            "[assert.equals] Expected [object Object] to be equal to Hey", {}, "Hey");

        msg("fail with custom message",
            "[assert.equals] Aww! Expected [object Object] to be equal to Hey",
            {}, "Hey", "Aww!");

        callbacks(3, 2);
    });

    if (typeof document != "undefined") {
        buster.util.testCase("AssertEqualsHostObjectTest", {
            setUp: testHelper.setUp,
            tearDown: testHelper.tearDown,

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

    assertionTests("notEquals", function (pass, fail, msg, callbacks) {
        fail("when comparing object to itself", obj, obj);
        fail("when comparing object to itself with message", obj, obj, "No!");
        fail("when comparing strings", "Hey", "Hey");
        fail("when comparing numbers", 32, 32);
        fail("when comparing booleans", false, false);
        fail("when comparing null", null, null);
        fail("when comparing undefined", undefined, undefined);

        var func = function () {};
        var arr = [];
        var date = new Date();
        var sameDate = new Date(date.getTime());
        var anotherDate = new Date(date.getTime() - 10);

        fail("when comparing function to itself", func, func);
        pass("when comparing functions", function () {}, function () {});
        fail("when comparing array to itself", arr, arr);
        fail("when comparing date objects with same date", date, sameDate);
        pass("when comparing date objects with different dates", date, anotherDate);
        pass("when comparing date objects to null", new Date(), null);
        fail("when comparing string with number with coercion", "4", 4);
        fail("when comparing number with string with coercion", 32, "32");
        fail("when comparing with coercion", 0, "");
        pass("when comparing objects with different own properties",
             { id: 42 }, { id: 42, di: 24 });

        pass("when comparing objects with different own properties #2",
             { id: undefined }, { di: 24 });

        pass("when comparing objects with different own properties #3",
             { id: 24 }, { di: undefined });

        fail("when comparing objects with one property", { id: 42 }, { id: 42 });

        fail("when comparing objects with one object property",
             { obj: { id: 42 } }, { obj: { id: 42 } });

        pass("when comparing objects with one property with different values",
             { id: 42 }, { id: 24 });

        var deepObject = {
            id: 42,
            name: "Hey",
            sayIt: function () {
                return this.name;
            },

            child: {
                speaking: function () {}
            }
        };

        fail("when comparing complex objects", deepObject, {
            sayIt: deepObject.sayIt,
            child: { speaking: deepObject.child.speaking },
            id: 42,
            name: "Hey"
        });

        var arr1 = [1, 2, "Hey there", func, { id: 42, prop: [2, 3] }];
        var arr2 = [1, 2, "Hey there", func, { id: 42, prop: [2, 3] }];

        fail("when comparing arrays", arr1, arr2);
        fail("when comparing regexp literals", /a/, /a/);

        fail("when comparing regexp objects", new RegExp("[a-z]+"), new RegExp("[a-z]+"));

        var re1 = new RegExp("[a-z]+");
        var re2 = new RegExp("[a-z]+");
        re2.id = 42;

        pass("when comparing regexp objects with custom properties", re1, re2);
        pass("when comparing different objects", obj, {});
        pass("when comparing different objects with message", obj, {}, "Hmm");
        pass("when comparing object to null", {}, null);
        pass("when comparing null to object", {}, null);
        pass("when comparing object to undefined", {}, undefined);
        pass("when comparing undefined to object", undefined, {});
        pass("when comparing object to false", {}, false);
        pass("when comparing false to object", false, {});
        pass("when comparing object to true", {}, true);
        pass("when comparing true to object", true, {});
        pass("when comparing 'empty' object to date", {}, new Date());
        pass("when comparing 'empty' object to string object", {}, new String());
        pass("when comparing 'empty' object to number object", {}, new Number());
        pass("when comparing 'empty' object to empty array", {}, []);

        function gather() { return arguments; }
        var arrayLike = { length: 4, "0": 1, "1": 2, "2": {}, "3": [] };

        fail("when comparing arguments to array", [1,2,{},[]], gather(1, 2, {}, []));
        fail("when comparing array to arguments", gather(), []);
        fail("when comparing arguments to array like object",
             arrayLike, gather(1, 2, {}, []));

        msg("fail with understandable message",
            "[assert.notEquals] Expected [object Object] not to be equal to [object Object]", {}, {});

        msg("fail with understandable message",
            "[assert.notEquals] Holy cow! Expected [object Object] not to be equal to [object Object]", {}, {}, "Holy cow!");

        callbacks(2, 2);
    });

    assertionTests("typeOf", function (pass, fail, msg, callbacks) {
        pass("when types match", function () {}, "function");
        pass("when types match with message", function () {}, "function", "OMG!");
        fail("when types don't match", {}, "function");
        fail("when types don't match with message", {}, "function", "OMG!");
        msg("generate failure message",
            "[assert.typeOf] Expected typeof [object Object] (object) to be function",
            {}, "function");

        msg("generate custom failure message",
            "[assert.typeOf] Crep: Expected typeof [object Object] (object) to be function",
            {}, "function", "Crep");

        callbacks({}, "function");
    });

    assertionTests("notTypeOf", function (pass, fail, msg, callbacks) {
        fail("when types match", function () {}, "function");
        fail("when types match with message", function () {}, "function", "OMG!");
        pass("when types don't match", {}, "function");
        pass("when types don't match with message", {}, "function", "OMG!");
        msg("generate failure message",
            "[assert.notTypeOf] Expected typeof [object Object] not to be object",
            {}, "object");

        msg("generate custom failure message",
            "[assert.notTypeOf] Oops: Expected typeof [object Object] not to be object",
            {}, "object", "Oops");

        callbacks({}, "object");
    });

    assertionTests("isString", function (pass, fail, msg, callbacks) {
        pass("for string", "Hey");
        pass("for string with message", "Hey", "Whatup?");
        fail("for object", {});
        fail("for object with message", {}, "Whatup?");

        msg("fail with descriptive message",
            "[assert.isString] Expected typeof [object Object] (object) to be string",
            {});

        msg("fail with custom descriptive message",
            "[assert.isString] No go: Expected typeof [object Object] (object) to be string",
            {}, "No go");

        callbacks({});
    });

    assertionTests("isObject", function (pass, fail, msg, callbacks) {
        pass("for object", {});
        pass("for object with message", {}, "Whatup?");
        fail("for function", function () {});
        fail("for null", null);
        fail("for function with message", function () {}, "Whatup?");
        msg("fail with descriptive message",
            "[assert.isObject] Expected typeof Hey (string) to be object and not null",
            "Hey");

        msg("fail with custom message",
            "[assert.isObject] Whoa: Expected typeof Hey (string) to be object and not null",
            "Hey", "Whoa");

        callbacks("");
    });

    assertionTests("isFunction", function (pass, fail, msg, callbacks) {
        pass("for function", function () {});
        pass("for function with message", function () {}, "Whatup?");
        fail("for object", {});
        fail("for object with message", {}, "Whatup?");
        msg("fail with descriptive message",
            "[assert.isFunction] Expected typeof Hey (string) to be function",
            "Hey");

        msg("fail with custom message",
            "[assert.isFunction] Err: Expected typeof Hey (string) to be function",
            "Hey", "Err");

        callbacks({});
    });

    assertionTests("isBoolean", function (pass, fail, msg, callbacks) {
        pass("for boolean", true);
        pass("for boolean with message", true, "Whatup?");
        fail("for function", function () {});
        fail("for null", null);
        fail("for function with message", function () {}, "Whatup?");
        msg("fail with descriptive message",
            "[assert.isBoolean] Expected typeof Hey (string) to be boolean", "Hey");

        msg("fail with custom message",
            "[assert.isBoolean] No: Expected typeof Hey (string) to be boolean",
            "Hey", "No");

        callbacks({});
    });

    assertionTests("isNumber", function (pass, fail, msg, callbacks) {
        pass("for number", 32);
        fail("for NaN (sic)", NaN);
        pass("for number with message", 32, "Whatup?");
        fail("for function", function () {});
        fail("for null", null);
        fail("for function with message", function () {}, "Whatup?");
        msg("fail with descriptive message", 
            "[assert.isNumber] Expected Hey (string) to be a non-NaN number",
            "Hey");

        msg("fail with descriptive message", 
            "[assert.isNumber] Hola: Expected Hey (string) to be a non-NaN number",
            "Hey", "Hola");

        callbacks({});
    });

    assertionTests("isNaN", function (pass, fail, msg, callbacks) {
        pass("for NaN", NaN);
        pass("for NaN with message", NaN, "Whatup?");
        fail("for number", 32);
        fail("for number with message", 32, "Whatup?");
        fail("for function", function () {});
        fail("for function with message", function () {}, "Whatup?");
        fail("for object", {});
        fail("for null", null);
        msg("fail with descriptive message", "[assert.isNaN] Expected 32 to be NaN", 32);
        msg("fail with custom message",
            "[assert.isNaN] Crap: Expected 32 to be NaN", 32, "Crap");

        callbacks({});
    });

    assertionTests("isNotNaN", function (pass, fail, msg, callbacks) {
        fail("for NaN", NaN);
        fail("for NaN with message", NaN, "Whatup?");
        pass("for number", 32);
        pass("for number with message", 32, "Whatup?");
        pass("for function", function () {});
        pass("for function with message", function () {}, "Whatup?");
        pass("for object", {});
        pass("for null", null);

        msg("fail with descriptive message",
            "[assert.isNotNaN] Expected not to be NaN", NaN);

        msg("fail with custom message",
            "[assert.isNotNaN] See? Expected not to be NaN", NaN, "See?");

        callbacks(NaN);
    });

    assertionTests("isArray", function (pass, fail, msg, callbacks) {
        pass("for array", []);
        pass("for array with message", [1, 2, 3], "Message");
        fail("for object", {});
        fail("for object with message", {}, "Is it an array?");

        function captureArgs() {
            return arguments;
        }

        var arrayLike = {
            length: 4,
            "0": "One",
            "1": "Two",
            "2": "Three",
            "3": "Four",
            splice: function () {}
        };

        fail("for arguments", captureArgs());
        fail("for array like", arrayLike);

        msg("fail with descriptive message",
            "[assert.isArray] Expected [object Object] to be array", {});

        msg("fail with custom message",
            "[assert.isArray] No: Expected [object Object] to be array", {}, "No");

        callbacks({});
    });

    assertionTests("isNotArray", function (pass, fail, msg, callbacks) {
        fail("for array", []);
        fail("for array with message", [1, 2, 3], "Message");
        pass("for object", {});
        pass("for object with message", {}, "Is it an array?");

        function captureArgs() {
            return arguments;
        }

        var arrayLike = {
            length: 4,
            "0": "One",
            "1": "Two",
            "2": "Three",
            "3": "Four",
            splice: function () {}
        };

        pass("for arguments", captureArgs());
        pass("for array like", arrayLike);

        msg("fail with descriptive message",
            "[assert.isNotArray] Expected 1,2 not to be array", [1, 2]);

        msg("fail with custom message",
            "[assert.isNotArray] Hmm: Expected 1,2 not to be array", [1, 2], "Hmm");

        callbacks([]);
    });

    assertionTests("isArrayLike", function (pass, fail, msg, callbacks) {
        pass("for array", []);
        pass("for array with message", [1, 2, 3], "Message");
        fail("for object", {});
        fail("for object with message", {}, "Is it an array?");

        function captureArgs() { return arguments; }

        var arrayLike = {
            length: 4,
            "0": "One",
            "1": "Two",
            "2": "Three",
            "3": "Four",
            splice: function () {}
        };

        pass("for arguments", captureArgs());
        pass("for array like", arrayLike);

        msg("fail with descriptive message",
            "[assert.isArrayLike] Expected [object Object] to be array like", {});

        msg("fail with custom message",
            "[assert.isArrayLike] No: Expected [object Object] to be array like",
            {}, "No");

        callbacks({});
    });

    assertionTests("isNotArrayLike", function (pass, fail, msg, callbacks) {
        fail("for array", []);
        fail("for array with message", [1, 2, 3], "Message");
        pass("for object", {});
        pass("for object with message", {}, "Is it an array?");

        function captureArgs() { return arguments; }

        var arrayLike = {
            length: 4,
            "0": "One",
            "1": "Two",
            "2": "Three",
            "3": "Four",
            splice: function () {}
        };

        fail("for arguments", captureArgs());
        fail("for array like", arrayLike);

        msg("fail with descriptive message",
            "[assert.isNotArrayLike] Expected 1,2 not to be array like", [1, 2]); 
        
        msg("fail with custom message",
            "[assert.isNotArrayLike] Hmm: Expected 1,2 not to be array like",
            [1, 2], "Hmm"); 

        callbacks([]);
    });

    assertionTests("isUndefined", function (pass, fail, msg, callbacks) {
        pass("for undefined", undefined);
        pass("for undefined with message", undefined, "Whatup?");
        fail("for function", function () {});
        fail("for null", null);
        fail("for function with message", function () {}, "Whatup?");

        msg("fail with descriptive message",
            "[assert.isUndefined] Expected typeof Hey (string) to be undefined",
            "Hey");

        msg("fail with custom message",
            "[assert.isUndefined] No! Expected typeof Hey (string) to be undefined",
            "Hey", "No!");

        callbacks(function () {});
    });

    assertionTests("isNotUndefined", function (pass, fail, msg, callbacks) {
        fail("for undefined", undefined);
        fail("for undefined with message", undefined, "Whatup?");
        pass("for function", function () {});
        pass("for null", null);
        pass("for function with message", function () {}, "Whatup?");

        msg("fail with descriptive message",
            "[assert.isNotUndefined] Expected not to be undefined", undefined);

        msg("fail with custom message",
            "[assert.isNotUndefined] A: Expected not to be undefined",
            undefined, "A");

        callbacks(undefined);
    });

    assertionTests("isNull", function (pass, fail, msg, callbacks) {
        pass("for null", null);
        pass("for null with message", null, "Whatup?");
        fail("for function", function () {});
        fail("for undefined", undefined);
        fail("for function with message", function () {}, "Whatup?");
        
        msg("fail with descriptive message",
            "[assert.isNull] Expected Hey to be null", "Hey").expectedFormats = 0;;

        msg("fail with custom message",
            "[assert.isNull] Yo! Expected Hey to be null",
            "Hey", "Yo!").expectedFormats = 0;;

        callbacks(function () {});
    });

    assertionTests("isNotNull", function (pass, fail, msg, callbacks) {
        fail("for null", null);
        fail("for null with message", null, "Whatup?");
        pass("for function", function () {});
        pass("for undefined", undefined);
        pass("for function with message", "Whatup?", function () {});

        msg("fail with descriptive message",
            "[assert.isNotNull] Expected not to be null", null).expectedFormats = 0;;

        msg("fail with custom message",
            "[assert.isNotNull] Sad: Expected not to be null",
            null, "Sad").expectedFormats = 0;

        callbacks(null);
    });

    assertionTests("match", function (pass, fail, msg, callbacks) {
        pass("matching regexp", "Assertions", /[a-z]/);
        pass("matching regexp with message", "Assertions", /[a-z]/, "Working?");
        pass("for generic object with test method returning true", "Assertions", {
            test: function () {
                return true;
            }
        });

        fail("for non-matching regexp", "Assertions 123", /^[a-z]$/);
        fail("for non-matching regexp with message",
             "Assertions 123", /^[a-z]$/, "Woot");

        pass("matching boolean", true, true);
        fail("mis-matching boolean", true, false);

        fail("for generic object with test method returning false", {
            test: function () {
                return false;
            }
        }, "Assertions");

        msg("fail with understandable message",
            "[assert.match] Expected Assertions 123 to match /^[a-z]+$/",
            "Assertions 123", /^[a-z]+$/);

        msg("fail with custom message",
            "[assert.match] Oops: Expected Assertions 123 to match /^[a-z]+$/",
            "Assertions 123", /^[a-z]+$/, "Oops");

        fail("fail if match object is null", "Assertions 123", null);

        msg("fail if match object is undefined",
            "[assert.match] Matcher (undefined) was not a string, a number, a function, a boolean or an object",
            "Assertions 123", undefined);

        fail("if match object is false", "Assertions 123", false);
        fail("if matching a number against a string", "Assertions 123", 23);
        pass("if matching a number against a similar string", "23", 23);
        pass("if matching a number against itself", 23, 23);

        pass("if matcher is a function that returns true",
             "Assertions 123", function (obj) {
            return true;
        });

        fail("if matcher is a function that returns false",
             "Assertions 123", function (obj) {
                 return false;
             });

        fail("if matcher is a function that returns falsy",
             "Assertions 123", function () {});

        fail("if matcher does not return explicit true",
             "Assertions 123", function () {
                 return "Hey";
             });

        this["should call matcher with assertion argument"] = function () {
            var listener = sinon.stub().returns(true);

            buster.assert.match("Assertions 123", listener);

            assert.ok(listener.calledWith("Assertions 123"));
        };

        pass("if matcher is substring of matchee", "Diskord", "or");
        pass("if matcher is string equal to matchee", "Diskord", "Diskord");
        pass("for strings ignoring case", "Look ma, case-insensitive",
             "LoOk Ma, CaSe-InSenSiTiVe");

        fail("if match string is not substring of matchee", "Vim", "Emacs");
        fail("if match string is not substring of object", {}, "Emacs");

        fail("if matcher is substring of object.toString", "Emacs", {
            toString: function () {
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

            speak: function () {
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

            speak: function () {
                return this.name;
            }
        };

        pass("for nested matcher", object2, {
            owner: {
                someDude: "Yes",
                hello: function (value) {
                    return value == "ok";
                }
            }
        });

        callbacks(NaN, "");
    });

    assertionTests("noMatch", function (pass, fail, msg, callbacks) {
        fail("matching regexp", "Assertions", /[a-z]/);
        fail("matching regexp with message", "Assertions", /[a-z]/, "Working?");
        fail("generic object with test method returning true", "Assertions", {
            test: function () {
                return true;
            }
        });

        pass("for non-matching regexp", "Assertions 123", /^[a-z]$/);

        pass("for non-matching regexp with message",
             "Assertions 123", /^[a-z]$/, "Woot");

        pass("for generic object with test method returning false", "Assertions", {
            test: function () {
                return false;
            }
        });

        msg("fail with understandable message",
            "[assert.noMatch] Expected Assertions 123 not to match /^.+$/",
            "Assertions 123", /^.+$/);

        msg("fail with custom message",
            "[assert.noMatch] No! Expected Assertions 123 not to match /^.+$/",
            "Assertions 123", /^.+$/, "No!");

        fail("if match object is null", "Assertions 123", null);
        fail("if match object is undefined", "Assertions 123", undefined);
        pass("if match object is false", "Assertions 123", false);
        pass("if matching a number against a string", "Assertions 123", 23);
        fail("if matching a number against a similar string", 23, "23");
        fail("if matching a number against itself", 23, 23);
        fail("if matcher is a function that returns true", "Assertions 123",
             function (obj) {
                 return true;
             });

        pass("if matcher is a function that returns false",
             "Assertions 123", function (obj) {
                 return false;
             });

        pass("if matcher is a function that returns falsy",
             "Assertions 123", function () {});

        pass("if matcher does not return explicit true",
             "Assertions 123", function () {
                 return "Hey";
             });

        this["should call matcher with assertion argument"] = function () {
            var listener = sinon.stub().returns(false);

            buster.assert.noMatch("Assertions 123", listener);

            assert.ok(listener.calledWith("Assertions 123"));
        };

        fail("if matcher is substring of matchee", "Diskord", "or");
        fail("if matcher is string equal to matchee", "Diskord", "Diskord");
        pass("if match string is not substring of matchee", "Vim", "Emacs");
        pass("if match string is not substring of object", {}, "Emacs");

        pass("if matcher is substring of object.toString", "Emacs", {
            toString: function () {
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

            speak: function () {
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

            speak: function () {
                return this.name;
            }
        };

        fail("for nested matcher", object2, {
            owner: {
                someDude: "Yes",
                hello: function (value) {
                    return value == "ok";
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

            speak: function () {
                return this.name;
            }
        };

        pass("for nested matcher with mismatching properties", object3, {
            owner: {
                someDude: "No",
                hello: function (value) {
                    return value == "ok";
                }
            }
        });

        callbacks("Assertions", /[a-z]/);
    });

    assertionTests("exception", function (pass, fail, msg, callbacks) {
        pass("when callback throws", function () {
            throw new Error();
        });

        fail("when callback does not throw", function () {});

        msg("fail with message", "[assert.exception] Expected exception",
            function () {});

        msg("fail with custom message", "[assert.exception] Snap: Expected exception",
            function () {}, null, "Snap").expectedFormats = 0;

        pass("when callback throws expected type", function () {
            throw new TypeError("Oh hmm");
        }, "TypeError");

        pass("with custom message and expected type", function () {
            throw new TypeError();
        }, "TypeError", "Okidoki");

        fail("when callback does not throw expected type", function () {
            throw new Error();
        }, "TypeError");

        fail("when callback does not throw and specific type os expected",
             function () {}, "TypeError");

        fail("with message when callback does not throw expected type", function () {
            throw new Error();
        }, "TypeError", "Oh noes");

        fail("with message when callback does not throw and type is expected",
             function () {}, "TypeError", "Oh noes");

        msg("fail with message when not throwing", 
            "[assert.exception] Expected TypeError but no exception was thrown",
            function () {}, "TypeError");

        msg("fail with custom message when not throwing", 
            "[assert.exception] Aww: Expected TypeError but no exception was thrown",
            function () {}, "TypeError", "Aww").expectedFormats = 1;

        msg("fail with message when throwing wrong kind of exception",
             "[assert.exception] Expected TypeError but threw Error (:()",
             function () {
                 throw new Error(":(");
             }, "TypeError");

        msg("fail with custom message when throwing wrong kind of exception",
             "[assert.exception] Aww: Expected TypeError but threw Error ()",
             function () {
                 throw new Error("");
             }, "TypeError", "Aww");

        msg("if not passed arguments",
            "[assert.exception] Expected to receive at least 1 argument");

        callbacks(function () {});
        testArgCount = 2;
        callbacks(function () { throw new Error(); }, "TypeError");
    });

    assertionTests("noException", function (pass, fail, msg, callbacks) {
        fail("when callback throws", function () {
            throw new Error();
        });

        pass("when callback does not throw", function () {});
        pass("with message when callback does not throw", function () {}, "Oh noes");

        msg("fail with message",
            "[assert.noException] Expected not to throw but threw Error (:()",
            function () {
                throw new Error(":(");
            });

        msg("fail with custom message",
            "[assert.noException] Aww: Expected not to throw but threw Error ()",
            function () {
                throw new Error("");
            }, "Aww");

        msg("fail if not passed arguments",
            "[assert.noException] Expected to receive at least 1 argument");

        callbacks(function () { throw new Error(); });
    });

    assertionTests("tagName", function (pass, fail, msg, callbacks) {
        pass("for matching tag names", { tagName: "li" }, "li");
        pass("for case-insensitive matching tag names", { tagName: "LI" }, "li");
        pass("for case-insensitive matching tag names #2", { tagName: "li" }, "LI");
        pass("for uppercase matching tag names", { tagName: "LI" }, "LI");
        pass("for matching tag names with message", { tagName: "li" }, "li", "Yup");
        fail("for non-matching tag names", { tagName: "li" }, "p");
        fail("for substring matches in tag names", { tagName: "li" }, "i");
        fail("for non-matching with message", { tagName: "li" }, "p", "Aww");

        msg("fail with message",
            "[assert.tagName] Expected tagName to be p but was li",
            { tagName: "li" }, "p");

        msg("fail with custom message",
            "[assert.tagName] Snap! Expected tagName to be p but was li",
            { tagName: "li" }, "p", "Snap!");

        msg("fail if not passed arguments",
            "[assert.tagName] Expected to receive at least 2 arguments");

        msg("fail if not passed tag name",
            "[assert.tagName] Expected to receive at least 2 arguments",
            { tagName: ""}).expectedFormats = 0;

        msg("fail if object does not have tagName property",
            "[assert.tagName] Expected [object Object] to have tagName property",
            {}, "li");

        if (typeof document != "undefined") {
            pass("for DOM elements", document.createElement("li"), "li");
        }

        callbacks({ tagName: "li" }, "p");
        callbacks({}, "p");
    });

    assertionTests("notTagName", function (pass, fail, msg, callbacks) {
        fail("for matching tag names", { tagName: "li" }, "li");
        fail("for case-insensitive matching tag names", { tagName: "LI" }, "li");
        fail("for case-insensitive matching tag names #2", { tagName: "LI" }, "li");
        fail("for same casing matching tag names", { tagName: "li" }, "li");
        fail("for matching tag names with message", { tagName: "li" }, "li", "Yup");
        pass("for non-matching tag names", { tagName: "li" }, "p");
        pass("for substring matching tag names", { tagName: "li" }, "i");
        pass("for case-insensitive non-matching tag names", { tagName: "li" }, "P");
        pass("for case-insensitive substring mathcing tag names",
             { tagName: "li" }, "i");

        pass("for non-matching with message", { tagName: "li" }, "p", "Aww");

        msg("fail with message",
            "[assert.notTagName] Expected tagName not to be li",
            { tagName: "li" }, "li");

        msg("fail with custom message",
            "[assert.notTagName] No: Expected tagName not to be li",
            { tagName: "li" }, "li", "No").expectedFormats = 1;

        msg("fail if not passed arguments",
            "[assert.notTagName] Expected to receive at least 2 arguments");

        msg("fail if not passed tag name",
            "[assert.notTagName] Expected to receive at least 2 arguments",
            { tagName: "p" }).expectedFormats = 0;

        msg("fail if object does not have tagName property",
            "[assert.notTagName] Expected [object Object] to have tagName property",
            {}, "li");

        if (typeof document != "undefined") {
            pass("for DOM elements", document.createElement("li"), "p");
        }

        callbacks({ tagName: "li" }, "li");
        callbacks({}, "li");
    });

    assertionTests("className", function (pass, fail, msg, callbacks) {
        msg("fail without arguments",
            "[assert.className] Expected to receive at least 2 arguments");

        msg("fail without class name",
            "[assert.className] Expected to receive at least 2 arguments",
            { className: "" }).expectedFormats = 0;

        msg("fail if object does not have className property",
            "[assert.className] Expected object to have className property",
            {}, "item");

        msg("fail with message if object does not have className property",
            "[assert.className] No go: Expected object to have className property",
            {}, "item", "No go");

        msg("fail when element does not include class name",
            "[assert.className] Expected object's className to include item but was ",
            { className: "" }, "item");

        pass("when element's class name matches", { className: "item" }, "item");
        pass("when element includes class name", { className: "feed item" }, "item");
        fail("when element does not include all class names",
             { className: "feed item" }, "item post");

        pass("when element includes all class names",
             { className: "feed item post" }, "item post");

        pass("when element includes all class names in different order",
             { className: "a b c d e" }, "e a d");

        pass("with class names as array", { className: "a b c d e" }, ["e","a","d"]);

        if (typeof document != "undefined") {
            var li = document.createElement("li");
            li.className = "some thing in here";

            pass("for DOM elements", li, "thing some");
        }

        callbacks({ className: "feed" }, "post");
        callbacks({}, "post");
    });

    assertionTests("notClassName", function (pass, fail, msg, callbacks) {
        msg("fail without arguments",
            "[assert.notClassName] Expected to receive at least 2 arguments");

        msg("fail without class name",
            "[assert.notClassName] Expected to receive at least 2 arguments",
            { className: "item" }).expectedFormats = 0;

        msg("fail if object does not have className property",
            "[assert.notClassName] Expected object to have className property",
            {}, "item");

        msg("fail with message if object does not have className property",
            "[assert.notClassName] No go: Expected object to have className property",
            {}, "item", "No go");

        pass("when element does not include class name", { className: "" }, "item");

        msg("fail when element's class name matches",
            "[assert.notClassName] Expected object's className not to include item",
            { className: "item" }, "item");

        msg("fail with message when element's class name matches",
            "[assert.notClassName] Aww: Expected object's className not to include item",
            { className: "item" }, "item", "Aww");

        fail("when element includes class name", { className: "feed item" }, "item");
        pass("when element does not include all class names",
             { className: "feed item" }, "item post");
        fail("when element includes all class names",
             { className: "feed item post" }, "item post");
        fail("when element includes all class names in different order",
             { className: "a b c d e" }, "e a d");
        fail("with class names as array", { className: "a b c d e" }, ["e","a","d"]);
        pass("with class names as array", { className: "a b c d e" }, ["f","a","d"]);

        if (typeof document != "undefined") {
            var li = document.createElement("li");
            li.className = "some thing in here";

            pass("for DOM elements", li, "something");
        }

        callbacks({ className: "post" }, "post");
        callbacks({}, "post");
    });

    assertionTests("inDelta", function (pass, fail, msg, callbacks) {
        pass("for equal numbers", 3, 3, 0);
        pass("for equal numbers with message", 3, 3, 0, "Yup");
        fail("for numbers out of delta range", 2, 3, 0.5);
        fail("for numbers out of delta range with message", 3, 2, 0.5, "Awww");

        msg("fail with descriptive message",
            "[assert.inDelta] Expected 3 to be equal to 2 +/- 0.6", 3, 2, 0.6);

        msg("fail with custom message",
            "[assert.inDelta] Awww: Expected 3 to be equal to 2 +/- 0.6",
            3, 2, 0.6, "Awww");

        pass("for numbers in delta range", 2, 3, 1);

        msg("fail if not passed arguments",
            "[assert.inDelta] Expected to receive at least 3 arguments");

        callbacks(3, 2, 0);
    });

    assertionTests("notInDelta", function (pass, fail, msg, callbacks) {
        fail("for equal numbers", 3, 3, 0);
        fail("for equal numbers with message", 3, 3, 0, "Yup");
        pass("for numbers out of delta range", 2, 3, 0.5);
        pass("for numbers out of delta range with message", 3, 2, 0.5, "Awww");

        msg("with descriptive message",
            "[assert.notInDelta] Expected 3 not to be equal to 3 +/- 0", 3, 3, 0);

        msg("with custom message",
            "[assert.notInDelta] Awww: Expected 3 not to be equal to 3 +/- 0",
            3, 3, 0, "Awww");

        fail("for numbers in delta range", 2, 3, 1);

        msg("fail if not passed arguments",
            "[assert.notInDelta] Expected to receive at least 3 arguments");

        callbacks(3, 3, 0);
    });
}());
