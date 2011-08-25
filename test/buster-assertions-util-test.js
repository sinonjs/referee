if (typeof require != "undefined") {
    var assert = require("assert");

    var buster = {
        util: require("buster-util"),
        assertions: require("../lib/buster-assertions")
    };
}

(function () {
    var create = function (obj) {
        function F() {}
        F.prototype = obj;
        return new F();
    };

    var ba = buster.assertions;

    buster.util.testCase("IsArgumentsTest", {
        "should recognize real arguments object": function () {
            assert.ok(ba.isArguments(arguments));
        },

        "should reject primitive": function () {
            assert.ok(!ba.isArguments(42));
        },

        "should reject object without length": function () {
            assert.ok(!ba.isArguments({}));
        },

        "should reject array": function () {
            assert.ok(!ba.isArguments([]));
        }
    });

    buster.util.testCase("KeysTest", {
        "should return keys of object": function () {
            var obj = { a: 1, b: 2, c: 3 };

            assert.equal(ba.keys(obj).sort().join(""), "abc");
        },

        "should exclude inherited properties": function () {
            var obj = { a: 1, b: 2, c: 3 };
            var obj2 = create(obj);
            obj2.d = 4;
            obj2.e = 5;

            assert.deepEqual(ba.keys(obj2).sort().join(""), "de");
        }
    });
}());
