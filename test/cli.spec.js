var mocks = require("mocks");

describe("node-friction cli", function() {
    var friction;
    var cli;

    beforeEach(function() {
        // mock 'friction' module required by 'cli' module
        friction = jasmine.createSpy("friction").and.returnValue([]);
        cli = mocks.loadFile(__dirname + "/../lib/cli", {"./index": friction}).module.exports;
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
