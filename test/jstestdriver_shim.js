function testCase(name, tests) {
    var testCase = TestCase(name);

    for (var test in tests) {
        testCase.prototype["test " + test] = tests[test]
    }

    return testCase;
}

var assert = this;

(function () {
    var mappedAssertions = {
        ok: "True",
        doesNotThrow: "NoException",
        throws: "Exception",
        equal: "Equals"
    };

    for (var assertion in mappedAssertions) {
        assert[assertion] = assert["assert" + mappedAssertions[assertion]];
    }
}());