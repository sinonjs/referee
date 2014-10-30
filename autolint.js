module.exports = {
    linter: "jshint",
    paths: [
        "lib/**/*.js",
        "test/**/*.js"
    ],
    linterOptions: {
        node: true,
        browser: true,
        plusplus: false,
        strict: false,
        onevar: false,
        nomen: false,
        regexp: true,
        predef: [
            "define",
            "assert",
            "refute",
            "buster"
        ]
    }
};
