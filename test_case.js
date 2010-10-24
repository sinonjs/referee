var sys = require("sys");

function red(str) {
    return "\033[31m" + str + "\033[39m";
};

function green(str) {
    return "\033[32m" + str + "\033[39m";
};

exports.testCase = function (name, tests) {
    var testCount = 0;
    var failCount = 0;
    sys.puts("\n" + name + "\n----------------------------------------");

    for (var test in tests) {
        sys.print(test);
        testCount += 1;

        try {
            tests[test]();
            sys.print(" " + green("OK") + "\n");
        } catch (e) {
            sys.print(" " + red("BUSTED") + "\n    " + e + "\n");
            failCount += 1;
        }
    }

    sys.puts("\n" + testCount + " tests, " + (failCount ? failCount + " failed" : "all green"));
};
