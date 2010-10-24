var sys = require("sys");

function red(str) {
    return "\033[31m" + str + "\033[39m";
};

function green(str) {
    return "\033[32m" + str + "\033[39m";
};

exports.testCase = function (name, tests) {
    sys.puts("\n" + name + "\n----------------------------------------");

    for (var test in tests) {
        sys.print(test);

        try {
            tests[test]();
            sys.print(" " + green("OK") + "\n");
        } catch (e) {
            sys.print(" " + red("BUSTED") + " " + e + "\n");
        }
    }
};
