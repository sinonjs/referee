exports["Browser"] = {
    libs: [
        "node_modules/lodash/lodash.js",
        "node_modules/samsam/lib/samsam.js",
        "node_modules/bane/lib/bane.js"
    ],
    sources: [
        "lib/referee.js",
        "lib/expect.js"
    ],
    testHelpers: ["test/test-helper.js"],
    tests: ["test/*-test.js"]
};

exports["Node"] = {
    environment: "node",
    testHelpers: ["test/test-helper.js"],
    tests: ["test/*-test.js"]
};