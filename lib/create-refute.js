"use strict";

var assertArgNum = require("./assert-arg-num");
var countAssertion = require("./count-assertion");

function createRefute(referee) {
    function refute(actual, message) {
        countAssertion(referee);
        if (!assertArgNum(referee.fail, "refute", arguments, 1)) {
            return;
        }

        if (actual) {
            referee.fail(
                message ||
                    "[refute] Expected " + String(actual) + " to be falsy"
            );
            return;
        }

        referee.emit("pass", "refute", message || "", actual);
    }

    refute.toString = function() {
        return "referee.refute()";
    };

    return refute;
}

module.exports = createRefute;
