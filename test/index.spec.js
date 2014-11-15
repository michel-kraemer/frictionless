var errors = require("../lib/errors");
var mocks = require("mocks");
var path = require("path");

describe("frictionless", function() {
    var fs;
    var frictionless;

    beforeEach(function() {
        // mock 'fs' module required by 'index' module
        fs = mocks.fs.create({
            "test1": {
            },
            "test2": {
                "README": 1
            },
            "test3": {
                "LICENSE": 1
            },
            "test4": {
                "README.md": 1
            },
            "test5": {
                "MIT_LICENSE": 1
            },
            "test6": {
                "MIT_LICENSE.md": 1
            },
            "testall": {
                "README": 1,
                "LICENSE": 1
            }
        });
        spyOn(fs, "existsSync").and.callThrough();
        spyOn(fs, "readdirSync").and.callThrough();
        frictionless = mocks.loadFile(__dirname + "/../lib/index", {fs: fs}).module.exports;
    });

    it("should report missing directory", function() {
        var r = frictionless("unknown");
        expect(fs.existsSync).toHaveBeenCalledWith("unknown");
        expect(r).toEqual([{dir: "unknown", errors: [errors.DIR]}]);
    });

    it("should report missing directories", function() {
        var r = frictionless(["unknown", "unknown2"]);
        expect(fs.existsSync).toHaveBeenCalledWith("unknown");
        expect(fs.existsSync).toHaveBeenCalledWith("unknown2");
        expect(r).toEqual([
            {dir: "unknown", errors: [errors.DIR]},
            {dir: "unknown2", errors: [errors.DIR]}
        ]);
    });

    function expectMissingFile(file, pattern) {
        var r = frictionless(["/test1"]);
        expect(fs.existsSync).toHaveBeenCalledWith("/test1");
        expect(fs.readdirSync).toHaveBeenCalledWith("/test1");
        expect(r.length).toBe(1);
        expect(r[0].dir).toBe("/test1");
        expect(r[0].errors).toContain(errors[file]);
    }

    it("should report missing README", function() {
        expectMissingFile("README", "README*");
    });

    it("should report missing LICENSE", function() {
        expectMissingFile("LICENSE", "*LICENSE*");
    });

    it("should not report existing README", function() {
        var r = frictionless(["/test2"]);
        expect(fs.existsSync).toHaveBeenCalledWith("/test2");
        expect(fs.readdirSync).toHaveBeenCalledWith("/test2");
        expect(r.length).toBe(1);
        expect(r[0].dir).toBe("/test2");
        expect(r[0].errors).not.toContain(errors.README);
    });

    it("should not report existing LICENSE", function() {
        var r = frictionless(["/test3"]);
        expect(fs.existsSync).toHaveBeenCalledWith("/test3");
        expect(fs.readdirSync).toHaveBeenCalledWith("/test3");
        expect(r.length).toBe(1);
        expect(r[0].dir).toBe("/test3");
        expect(r[0].errors).not.toContain(errors.LICENSE);
    });

    it("should not report existing README.md", function() {
        var r = frictionless(["/test4"]);
        expect(fs.existsSync).toHaveBeenCalledWith("/test4");
        expect(fs.readdirSync).toHaveBeenCalledWith("/test4");
        expect(r.length).toBe(1);
        expect(r[0].dir).toBe("/test4");
        expect(r[0].errors).not.toContain(errors.README);
    });

    it("should not report existing MIT_LICENSE", function() {
        var r = frictionless(["/test5"]);
        expect(fs.existsSync).toHaveBeenCalledWith("/test5");
        expect(fs.readdirSync).toHaveBeenCalledWith("/test5");
        expect(r.length).toBe(1);
        expect(r[0].dir).toBe("/test5");
        expect(r[0].errors).not.toContain(errors.LICENSE);
    });

    it("should not report existing MIT_LICENSE.md", function() {
        var r = frictionless(["/test6"]);
        expect(fs.existsSync).toHaveBeenCalledWith("/test6");
        expect(fs.readdirSync).toHaveBeenCalledWith("/test6");
        expect(r.length).toBe(1);
        expect(r[0].dir).toBe("/test6");
        expect(r[0].errors).not.toContain(errors.LICENSE);
    });

    it("should not report nothing", function() {
        var r = frictionless(["/testall"]);
        expect(fs.existsSync).toHaveBeenCalledWith("/testall");
        expect(fs.readdirSync).toHaveBeenCalledWith("/testall");
        expect(r.length).toBe(1);
        expect(r[0].dir).toBe("/testall");
        expect(r[0].errors.length).toBe(0);
    });
});
