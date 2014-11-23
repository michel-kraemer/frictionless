var colors = require("colors/safe");
var constants = require("./constants");
var errors = require("./errors");
var frictionless = require("./index");
var fs = require("fs");
var path = require("path");

module.exports = function(argv, log) {
    var exitCode = 0;

    colors.enabled = (typeof argv.colors === "undefined") ? true : !!argv.colors;

    if (argv.version) {
        log(constants.NAME + " " + constants.VERSION);
        return exitCode;
    }

    var dirs = ["."];
    if (argv._.length > 0) {
        dirs = argv._;
    }

    var skip = [];
    if (argv.skipReadme) {
        skip.push(constants.SKIP_README);
    }
    if (argv.skipLicense) {
        skip.push(constants.SKIP_LICENSE);
    }
    if (argv.skipContributing) {
        skip.push(constants.SKIP_CONTRIBUTING);
    }
    if (argv.skipGitignore) {
        skip.push(constants.SKIP_GITIGNORE);
    }
    if (argv.skipBootstrap) {
        skip.push(constants.SKIP_BOOTSTRAP);
    }
    if (argv.skipTest) {
        skip.push(constants.SKIP_TEST);
    }
    if (argv.skipScripts) {
        skip.push(constants.SKIP_BOOTSTRAP);
        skip.push(constants.SKIP_TEST);
    }

    var rs = frictionless(dirs, skip);
    for (var i = 0; i < rs.length; ++i) {
        var r = rs[i];
        var dir = r.dir;
        log(colors.bold(path.join(dir, "/")));
        if (r.errors && r.errors.length) {
            for (var j = 0; j < r.errors.length; ++j) {
                var err = r.errors[j];

                var msg = errors.messages[err];
                var severity = errors.severity[err];

                var label;
                if (severity == errors.severityLevels.FATAL) {
                    label = colors.bold.red("FAIL");
                } else if (severity == errors.severityLevels.ERROR) {
                    label = colors.red("FAIL");
                } else if (severity == errors.severityLevels.WARNING) {
                    label = colors.yellow("WARN");
                } else {
                    label = colors.cyan("INFO");
                }

                log("  [" + label + "] " + msg);
            }
            exitCode = 1;
        } else {
            log("  [" + colors.green("PASS") + "] Everything is alright.");
        }
    }

    return exitCode;
};
