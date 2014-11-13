var errors = require("./errors");
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

    if (!existsFile(dir, "README")) {
        result.push(errors.README);
    }

    return result;
}

module.exports = function(dirs) {
    if (!(dirs instanceof Array)) {
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
