"use strict";

var commonjs = require("rollup-plugin-commonjs");

module.exports = {
    entry: "lib/referee.js",
    format: "umd",
    moduleName: "referee",
    plugins: [
        commonjs({sourceMap: false})
    ]
};
