var errors = require("../lib/errors");
var expectRequire = require("a").expectRequire;
var path = require("path");

describe("node-friction", function() {
    var fs;
    var friction;

    beforeEach(function() {
        // mock 'fs' module required by 'index' module
        fs = jasmine.createSpyObj("fs", ["existsSync"]);
        expectRequire("fs").return(fs);
        friction = require("../lib/index");
    });

    afterEach(function() {
        // remove 'index' module from require cache so we can
        // mock it again
        delete require.cache[require.resolve("../lib/index")];
    });

    it("should report missing directory", function() {
        fs.existsSync.and.returnValue(false);
        var r = friction(["test"]);
        expect(fs.existsSync).toHaveBeenCalledWith("test");
        expect(r).toEqual([{dir: "test", errors: [errors.DIR]}]);
    });

    it("should report missing directories", function() {
        fs.existsSync.and.returnValue(false);
        var r = friction(["test", "test2"]);
        expect(fs.existsSync).toHaveBeenCalledWith("test");
        expect(fs.existsSync).toHaveBeenCalledWith("test2");
        expect(r).toEqual([
            {dir: "test", errors: [errors.DIR]},
            {dir: "test2", errors: [errors.DIR]}
        ]);
    });

    it("should report missing README", function() {
        fs.existsSync.and.callFake(function(dir) {
            if (dir == "test") {
                return true;
            }
            return false;
        });

        var r = friction(["test"]);

        expect(fs.existsSync).toHaveBeenCalledWith("test");
        expect(fs.existsSync).toHaveBeenCalledWith(path.join("test", "README"));
        expect(r).toEqual([{dir: "test", errors: [errors.README]}]);
    });
});
