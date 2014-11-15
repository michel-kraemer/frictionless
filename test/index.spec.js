var errors = require("../lib/errors");
var mocks = require("mocks");
var path = require("path");

describe("frictionless", function() {
    var fs;
    var frictionless;

    beforeEach(function() {
        // mock 'fs' module required by 'index' module
        fs = jasmine.createSpyObj("fs", ["existsSync"]);
        frictionless = mocks.loadFile(__dirname + "/../lib/index", {fs: fs}).module.exports;
    });

    it("should report missing directory", function() {
        fs.existsSync.and.returnValue(false);
        var r = frictionless("test");
        expect(fs.existsSync).toHaveBeenCalledWith("test");
        expect(r).toEqual([{dir: "test", errors: [errors.DIR]}]);
    });

    it("should report missing directories", function() {
        fs.existsSync.and.returnValue(false);
        var r = frictionless(["test", "test2"]);
        expect(fs.existsSync).toHaveBeenCalledWith("test");
        expect(fs.existsSync).toHaveBeenCalledWith("test2");
        expect(r).toEqual([
            {dir: "test", errors: [errors.DIR]},
            {dir: "test2", errors: [errors.DIR]}
        ]);
    });

    function expectFileChecked(file) {
        fs.existsSync.and.callFake(function(dir) {
            if (dir == "test") {
                return true;
            }
            return false;
        });

        var r = frictionless(["test"]);

        expect(fs.existsSync).toHaveBeenCalledWith("test");
        expect(fs.existsSync).toHaveBeenCalledWith(path.join("test", file));
        expect(r.length).toBe(1);
        expect(r[0].dir).toBe("test");
        expect(r[0].errors).toContain(errors[file]);
    }

    it("should report missing README", function() {
        expectFileChecked("README");
    });

    it("should report missing LICENSE", function() {
        expectFileChecked("LICENSE");
    });
});
