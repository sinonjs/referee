"use strict";

// Internal helper. Used throughout to fail assertions if they receive
// too few arguments. The name is provided for a helpful error message.
function assertArgNum(defaultFail, name, args, num, customFail) {
    var fail = customFail || defaultFail;

    if (args.length < num) {
        fail(
            "[" +
                name +
                "] Expected to receive at least " +
                num +
                " argument" +
                (num > 1 ? "s" : "")
        );
        return false;
    }

    return true;
}

module.exports = assertArgNum;
