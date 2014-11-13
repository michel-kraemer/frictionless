var expectRequire = require("a").expectRequire;

describe("node-friction cli", function() {
    var friction;
    var cli;

    beforeEach(function() {
        // mock 'friction' module required by 'cli' module
        friction = jasmine.createSpy("friction").and.returnValue([]);
        expectRequire("./index").return(friction);
        cli = require("../lib/cli");
    });

    afterEach(function() {
        // remove 'cli' module from require cache so we can
        // mock it again
        delete require.cache[require.resolve("../lib/cli")];
    });

    it("should call friction with current directory", function() {
        cli({_: []});
        expect(friction).toHaveBeenCalledWith(["."]);
    });

    it("should call friction with destination directory", function() {
        cli({_: ['test']});
        expect(friction).toHaveBeenCalledWith(["test"]);
    });
});
