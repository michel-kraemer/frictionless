var _ = require("underscore");
var constants = require("./constants");
var errors = require("./errors");
var fs = require("fs");
var path = require("path");

function existsFile(dir, file, ws, we) {
    if (!fs.existsSync(dir)) {
        return false;
    }

    var files = fs.readdirSync(dir);
    for (var i = 0; i < files.length; ++i) {
        var f = files[i];
        if (ws) {
            if (f.indexOf(file) >= 0) {
                return true;
            }
        } else if (we) {
            if (f.indexOf(file) === 0) {
                return true;
            }
        } else {
            if (f === file) {
                return true;
            }
        }
    }

    return false;
}

function check(dir, skip) {
    if (!fs.existsSync(dir)) {
        return [errors.DIR];
    }

    var result = [];

    // determine which tests should be skipped
    var skipReadme = false;
    var skipLicense = false;
    var skipContributing = false;
    var skipGitignore = false;
    var skipBootstrap = false;
    var skipTest = false;
    for (var si = 0; si < skip.length; ++si) {
        var sk = skip[si];
        if (sk == constants.SKIP_README) {
            skipReadme = true;
        } else if (sk == constants.SKIP_LICENSE) {
            skipLicense = true;
        } else if (sk == constants.SKIP_CONTRIBUTING) {
            skipContributing = true;
        } else if (sk == constants.SKIP_GITIGNORE) {
            skipGitignore = true;
        } else if (sk == constants.SKIP_BOOTSTRAP) {
            skipBootstrap = true;
        } else if (sk == constants.SKIP_TEST) {
            skipTest = true;
        }
    }

    // check for README
    if (!skipReadme && !existsFile(dir, "README", false, true)) {
        result.push(errors.README);
    }

    // check for LICENSE
    if (!skipLicense && !existsFile(dir, "LICENSE", true, true)) {
        result.push(errors.LICENSE);
    }

    // check for CONTRIBUTING guide
    if (!skipContributing && !existsFile(dir, "CONTRIBUTING", false, true)) {
        result.push(errors.CONTRIBUTING);
    }

    // check for .gitignore
    if (!skipGitignore && !existsFile(dir, ".gitignore", false, false)) {
        result.push(errors.GITIGNORE);
    }

    // check for bootstrap script
    if (!skipBootstrap && !existsFile(path.join(dir, "script"), "bootstrap", false, false)) {
        result.push(errors.BOOTSTRAP);
    }

    // check for test script
    if (!skipTest && !existsFile(path.join(dir, "script"), "test", false, false)) {
        result.push(errors.TEST);
    }

    return result;
}

module.exports = function(dirs, skip) {
    // make sure 'dirs' is an array
    dirs = dirs || [];
    if (!_.isArray(dirs)) {
        dirs = [dirs];
    }

    // make sure 'skip' is an array
    skip = skip || [];
    if (!_.isArray(skip)) {
        skip = [skip];
    }

    var result = [];

    for (var i = 0; i < dirs.length; ++i) {
        var dir = dirs[i];
        var e = check(dir, skip);
        result.push({dir: dir, errors: e});
    }

    return result;
};
