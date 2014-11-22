var constants = require("../lib/constants");
var mocks = require("mocks");

describe("frictionless cli", function() {
    var frictionless;
    var cli;
    var log;

    beforeEach(function() {
        log = jasmine.createSpy("log");

        // mock 'frictionless' module required by 'cli' module
        frictionless = jasmine.createSpy("frictionless").and.returnValue([]);
        cli = mocks.loadFile(__dirname + "/../lib/cli", {"./index": frictionless}).module.exports;
    });

    it("should call frictionless with current directory", function() {
        expect(cli({_: []}, log)).toBe(0);
        expect(frictionless).toHaveBeenCalledWith(["."], []);
    });

    it("should call frictionless with destination directory", function() {
        expect(cli({_: ['test']}, log)).toBe(0);
        expect(frictionless).toHaveBeenCalledWith(["test"], []);
    });

    it("should display version and exit", function() {
        expect(cli({version: true}, log)).toBe(0);
        expect(log).toHaveBeenCalledWith(constants.NAME + " " + constants.VERSION);
        expect(frictionless).not.toHaveBeenCalled();
    });

    it("should skip check for README", function() {
        expect(cli({skipReadme: true, _: ['test']}, log)).toBe(0);
        expect(frictionless).toHaveBeenCalledWith(["test"], [constants.SKIP_README]);
    });

    it("should skip check for CONTRIBUTING", function() {
        expect(cli({skipContributing: true, _: ['test']}, log)).toBe(0);
        expect(frictionless).toHaveBeenCalledWith(["test"], [constants.SKIP_CONTRIBUTING]);
    });

    it("should skip all checks", function() {
        expect(cli({skipReadme: true, skipLicense: true, skipContributing: true,
            skipGitignore: true, skipBootstrap: true, skipTest: true,
            _: ['test']}, log)).toBe(0);
        expect(frictionless).toHaveBeenCalledWith(["test"], [
            constants.SKIP_README, constants.SKIP_LICENSE,
            constants.SKIP_CONTRIBUTING, constants.SKIP_GITIGNORE,
            constants.SKIP_BOOTSTRAP, constants.SKIP_TEST]);
    });
});
