if (typeof module == "object" && typeof require == "function") {
    var buster = require("buster-core");
    buster.assertions = require("../buster-assertions");
    buster.assertions.that = require("./that");
}

buster.assertions.that(buster.assertions.refute);

if (typeof module == "object") {
    module.exports = buster.assertions.refute.that;
}
