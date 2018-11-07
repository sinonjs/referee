"use strict";

var assert = require("../referee").assert;
var refute = require("../referee").refute;

require("./has-arity");

describe("hasArity assertion", function() {
    describe("integration", function() {
        it("should be available as hasArity", function() {
            assert.isFunction(assert.hasArity);
            assert.isFunction(refute.hasArity);
        });
    });

    describe("assert.hasArity", function() {
        it("should accept function with matching arity", function() {
            var functions = [
                function(one) {
                    return [one];
                },
                function(one, two) {
                    return [one, two];
                },
                function(one, two, three) {
                    return [one, two, three];
                }
            ];

            functions.forEach(function(func, index) {
                var expectedArity = index + 1;

                assert.hasArity(func, expectedArity);
            });
        });

        it("should refuse function with mismatching arity", function() {
            var functions = [
                function(one) {
                    return [one];
                },
                function(one, two) {
                    return [one, two];
                },
                function(one, two, three) {
                    return [one, two, three];
                }
            ];

            functions.forEach(function(func, index) {
                assert.exception(function() {
                    assert.hasArity(func, index);
                });
            });
        });

        describe("when actual is not a Function", function() {
            it("should throw a TypeError", function() {
                var nonFunctions = [
                    null,
                    undefined,
                    "hello",
                    123,
                    new Date(),
                    new Set(),
                    [],
                    {}
                ];

                function verify(nonFunc) {
                    assert.exception(
                        function() {
                            assert.hasArity(nonFunc, 1);
                        },
                        {
                            message:
                                'hasArity expects "actual" argument to be a Function',
                            name: "TypeError"
                        }
                    );
                }

                nonFunctions.forEach(verify);
            });
        });

        describe("when arity is not a non-negative Number", function() {
            it("should throw a TypeError", function() {
                var invalidNumbers = [
                    -123,
                    null,
                    undefined,
                    "hello",
                    new Date(),
                    new Set(),
                    [],
                    {}
                ];

                function noop() {
                    return null;
                }

                function verify(arity) {
                    assert.exception(
                        function() {
                            assert.hasArity(noop, arity);
                        },
                        {
                            message:
                                'hasArity expected "expected" argument to be a non-negative Number',
                            name: "TypeError"
                        }
                    );
                }

                invalidNumbers.forEach(verify);
            });
        });
    });
});

var testHelper = require("../test-helper");
testHelper.assertionTests("assert", "hasArity", function(
    pass,
    fail,
    msg,
    error
) {
    function arityZero() {
        return undefined;
    }

    function arityOne(one) {
        return one;
    }

    function arityTwo(one, two) {
        return one + two;
    }

    function arityThree(one, two, three) {
        return one + two + three;
    }

    function arityFour(one, two, three, four) {
        return one + two + three + four;
    }

    function arityFive(one, two, three, four, five) {
        return one + two + three + four + five;
    }

    function aritySix(one, two, three, four, five, six) {
        return one + two + three + four + five + six;
    }

    pass("when function has arity 0", arityZero, 0);
    pass("when function has arity 1", arityOne, 1);
    pass("when function has arity 2", arityTwo, 2);
    pass("when function has arity 3", arityThree, 3);
    pass("when function has arity 4", arityFour, 4);
    pass("when function has arity 5", arityFive, 5);
    pass("when function has arity 6", aritySix, 6);

    fail("when function arity does not match", arityOne, 0);

    msg(
        "with descriptive message",
        "[assert.hasArity] Expected arityOne to have arity of 0 but was 1",
        arityOne,
        0
    );

    fail("when arity does not match", arityOne, 0);
    fail("when arity does not match", arityTwo, 1);
    fail("when arity does not match", arityThree, 2);
    error(
        "for mismatched arity",
        {
            actual: arityOne,
            expected: 2,
            code: "ERR_ASSERTION",
            operator: "assert.hasArity"
        },
        arityOne,
        2
    );
});

testHelper.assertionTests("refute", "hasArity", function(
    pass,
    fail,
    msg,
    error
) {
    function arityZero() {
        return undefined;
    }

    function arityOne(one) {
        return one;
    }

    function arityTwo(one, two) {
        return one + two;
    }

    function arityThree(one, two, three) {
        return one + two + three;
    }

    function arityFour(one, two, three, four) {
        return one + two + three + four;
    }

    function arityFive(one, two, three, four, five) {
        return one + two + three + four + five;
    }

    function aritySix(one, two, three, four, five, six) {
        return one + two + three + four + five + six;
    }

    pass("when function has arity 0", arityZero, 99);
    pass("when function has arity 1", arityOne, 99);
    pass("when function has arity 2", arityTwo, 99);
    pass("when function has arity 3", arityThree, 99);
    pass("when function has arity 4", arityFour, 99);
    pass("when function has arity 5", arityFive, 99);
    pass("when function has arity 6", aritySix, 99);

    fail("when function arity matches", arityOne, 1);

    msg(
        "with descriptive message",
        "[refute.hasArity] Expected arityOne to not have arity of 1",
        arityOne,
        1
    );

    fail("when arity matches", arityOne, 1);
    fail("when arity matches", arityTwo, 2);
    fail("when arity matches", arityThree, 3);
    error(
        "for matched arity",
        {
            code: "ERR_ASSERTION",
            operator: "refute.hasArity"
        },
        arityOne,
        1
    );
});
