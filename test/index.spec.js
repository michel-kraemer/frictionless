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
            "test7": {
                "CONTRIBUTING": 1
            },
            "test8": {
                ".gitignore": 1
            },
            "testall": {
                "README": 1,
                "LICENSE": 1,
                "CONTRIBUTING": 1,
                ".gitignore": 1
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

    function expectMissingFile(file, error) {
        error = error || file;
        var r = frictionless(["/test1"]);
        expect(fs.existsSync).toHaveBeenCalledWith("/test1");
        expect(fs.readdirSync).toHaveBeenCalledWith("/test1");
        expect(r.length).toBe(1);
        expect(r[0].dir).toBe("/test1");
        expect(r[0].errors).toContain(errors[error]);
    }

    function expectExistingFile(dir, error) {
        var r = frictionless([dir]);
        expect(fs.existsSync).toHaveBeenCalledWith(dir);
        expect(fs.readdirSync).toHaveBeenCalledWith(dir);
        expect(r.length).toBe(1);
        expect(r[0].dir).toBe(dir);
        expect(r[0].errors).not.toContain(errors[error]);
    }

    it("should report missing README", function() {
        expectMissingFile("README");
    });

    it("should report missing LICENSE", function() {
        expectMissingFile("LICENSE");
    });

    it("should report missing CONTRIBUTING guide", function() {
        expectMissingFile("CONTRIBUTING");
    });

    it("should report missing .gitignore", function() {
        expectMissingFile(".gitignore", "GITIGNORE");
    });

    it("should not report existing README", function() {
        expectExistingFile("/test2", "README");
    });

    it("should not report existing LICENSE", function() {
        expectExistingFile("/test3", "LICENSE");
    });

    it("should not report existing README.md", function() {
        expectExistingFile("/test4", "README");
    });

    it("should not report existing MIT_LICENSE", function() {
        expectExistingFile("/test5", "LICENSE");
    });

    it("should not report existing MIT_LICENSE.md", function() {
        expectExistingFile("/test6", "LICENSE");
    });

    it("should not report existing CONTRIBUTING guide", function() {
        expectExistingFile("/test7", "CONTRIBUTING");
    });

    it("should not report existing .gitignore file", function() {
        expectExistingFile("/test8", "GITIGNORE");
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
