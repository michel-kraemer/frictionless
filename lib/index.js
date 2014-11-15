var errors = require("./errors");
var _ = require("underscore");
var fs = require("fs");
var path = require("path");

function existsFile(dir, file) {
    return fs.existsSync(path.join(dir, file));
}

function check(dir) {
    if (!fs.existsSync(dir)) {
        return [errors.DIR];
    }

    var result = [];

    // check for README
    if (!existsFile(dir, "README")) {
        result.push(errors.README);
    }

    // check for LICENSE
    if (!existsFile(dir, "LICENSE")) {
        result.push(errors.LICENSE);
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
