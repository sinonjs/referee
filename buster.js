exports["browser"] = {
	environment: "browser",
    libs: [
        "node_modules/lodash/dist/lodash.js",
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

exports["node"] = {
    environment: "node",
    testHelpers: ["test/test-helper.js"],
    tests: ["test/*-test.js"]
};
