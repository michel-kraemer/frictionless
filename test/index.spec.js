var constants = require("../lib/constants");
var errors = require("../lib/errors");
var mocks = require("mocks");
var path = require("path");

describe("frictionless", function() {
    var fs;
    var frictionless;
    var path;

    beforeEach(function() {
        // mock 'fs' and 'path' modules required by 'index' module
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
            "test9": {
                "script": {
                    "bootstrap": 1
                }
            },
            "test10": {
                "script": {
                    "test": 1
                }
            },
            "testall": {
                "README": 1,
                "LICENSE": 1,
                "CONTRIBUTING": 1,
                ".gitignore": 1,
                "script": {
                    "bootstrap": 1,
                    "test": 1
                }
            }
        });

        path = jasmine.createSpyObj("path", ["join"]);
        path.join.and.callFake(function(a, b) {
            // do not use windows backslashes. the fs mock won't work with that.
            return a + "/" + b;
        });

        spyOn(fs, "existsSync").and.callThrough();
        spyOn(fs, "readdirSync").and.callThrough();

        frictionless = mocks.loadFile(__dirname + "/../lib/index", {
            fs: fs,
            path: path
        }).module.exports;
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

    function expectMissingFile(error) {
        var r = frictionless(["/test1"]);
        expect(fs.existsSync).toHaveBeenCalledWith("/test1");
        expect(fs.readdirSync).toHaveBeenCalledWith("/test1");
        expect(r.length).toBe(1);
        expect(r[0].dir).toBe("/test1");
        expect(r[0].errors.length).toBeGreaterThan(1);
        expect(r[0].errors).toContain(errors[error]);
    }

    function expectSkipFile(error) {
        var r = frictionless(["/test1"], [constants["SKIP_" + error]]);
        expect(fs.existsSync).toHaveBeenCalledWith("/test1");
        expect(fs.readdirSync).toHaveBeenCalledWith("/test1");
        expect(r.length).toBe(1);
        expect(r[0].dir).toBe("/test1");
        expect(r[0].errors.length).toBeGreaterThan(1);
        expect(r[0].errors).not.toContain(errors[error]);
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
        expectMissingFile("GITIGNORE");
    });

    it("should report missing boostrap script", function() {
        expectMissingFile("BOOTSTRAP");
    });

    it("should report missing test script", function() {
        expectMissingFile("TEST");
    });

    it("should skip missing README", function() {
        expectSkipFile("README");
    });

    it("should skip missing LICENSE", function() {
        expectSkipFile("LICENSE");
    });

    it("should skip missing CONTRIBUTING guide", function() {
        expectSkipFile("CONTRIBUTING");
    });

    it("should skip missing .gitignore", function() {
        expectSkipFile("GITIGNORE");
    });

    it("should skip missing boostrap script", function() {
        expectSkipFile("BOOTSTRAP");
    });

    it("should skip missing test script", function() {
        expectSkipFile("TEST");
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

    it("should not report existing boostrap script", function() {
        expectExistingFile("/test9", "BOOTSTRAP");
    });

    it("should not report existing test script", function() {
        expectExistingFile("/test10", "TEST");
    });

    it("should report nothing", function() {
        var r = frictionless(["/testall"]);
        expect(fs.existsSync).toHaveBeenCalledWith("/testall");
        expect(fs.readdirSync).toHaveBeenCalledWith("/testall");
        expect(r.length).toBe(1);
        expect(r[0].dir).toBe("/testall");
        expect(r[0].errors.length).toBe(0);
    });
});
