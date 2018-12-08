"use strict";

var testHelper = require("../test-helper");
var captureArgs = require("../test-helper/capture-args");

testHelper.assertionTests("assert", "isDataView", function(
    pass,
    fail,
    msg,
    error
) {
    var ab = new global.ArrayBuffer(8);
    var dv = new global.DataView(ab);

    pass("for DataView", dv);
    fail("for ArrayBuffer", ab);
    fail("for array", []);
    fail("for object", {});
    fail("for arguments", captureArgs());
    msg(
        "fail with descriptive message",
        "[assert.isDataView] Expected {  } to be a DataView",
        {}
    );
    msg(
        "fail with custom message",
        "[assert.isDataView] Nope: Expected {  } to be a DataView",
        {},
        "Nope"
    );
    error(
        "for object",
        {
            code: "ERR_ASSERTION",
            operator: "assert.isDataView"
        },
        {}
    );
});
