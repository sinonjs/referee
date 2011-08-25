if (typeof require != "undefined") {
    var assert = require("assert");

    var buster = {
        util: require("buster-util"),
        assertions: require("../lib/buster-assertions")
    };
}

buster.util.testCase("IsArgumentsTest", {
    "should recognize real arguments object": function () {
        assert.ok(buster.assertions.isArguments(arguments));
    },

    "should reject primitive": function () {
        assert.ok(!buster.assertions.isArguments(42));
    },

    "should reject object without length": function () {
        assert.ok(!buster.assertions.isArguments({}));
    },

    "should reject array": function () {
        assert.ok(!buster.assertions.isArguments([]));
    }
});
