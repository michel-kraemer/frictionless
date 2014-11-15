var mocks = require("mocks");

describe("frictionless cli", function() {
    var frictionless;
    var cli;

    beforeEach(function() {
        // mock 'frictionless' module required by 'cli' module
        frictionless = jasmine.createSpy("frictionless").and.returnValue([]);
        cli = mocks.loadFile(__dirname + "/../lib/cli", {"./index": frictionless}).module.exports;
    });

    it("should call frictionless with current directory", function() {
        cli({_: []});
        expect(frictionless).toHaveBeenCalledWith(["."]);
    });

    it("should call frictionless with destination directory", function() {
        cli({_: ['test']});
        expect(frictionless).toHaveBeenCalledWith(["test"]);
    });
});
