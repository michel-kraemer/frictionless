var errors = require("./errors");
var _ = require("underscore");
var fs = require("fs");
var path = require("path");

function existsFile(dir, file, ws, we) {
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

function check(dir) {
    if (!fs.existsSync(dir)) {
        return [errors.DIR];
    }

    var result = [];

    // check for README
    if (!existsFile(dir, "README", false, true)) {
        result.push(errors.README);
    }

    // check for LICENSE
    if (!existsFile(dir, "LICENSE", true, true)) {
        result.push(errors.LICENSE);
    }

    // check for .gitignore
    if (!existsFile(dir, ".gitignore", false, false)) {
        result.push(errors.GITIGNORE);
    }

    return result;
}

module.exports = function(dirs) {
    if (!_.isArray(dirs)) {
        dirs = [dirs];
    }

    var result = [];

    for (var i = 0; i < dirs.length; ++i) {
        var dir = dirs[i];
        var e = check(dir);
        result.push({dir: dir, errors: e});
    }

    return result;
};
