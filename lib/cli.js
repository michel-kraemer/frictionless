var colors = require("colors/safe");
var errors = require("./errors");
var friction = require("./index");
var fs = require("fs");
var path = require("path");

var pkg = JSON.parse(fs.readFileSync(__dirname + "/../package.json").toString());
var NAME = pkg.name;
var VERSION = pkg.version;

module.exports = function(argv) {
    colors.enabled = (typeof argv.colors === "undefined") ? true : !!argv.colors;

    if (argv.version) {
        console.log(NAME + " " + VERSION);
        return;
    }

    var dirs = ["."];
    if (argv._.length > 0) {
        dirs = argv._;
    }

    var rs = friction(dirs);
    for (var i = 0; i < rs.length; ++i) {
        var r = rs[i];
        var dir = r.dir;
        for (var j = 0; j < r.errors.length; ++j) {
            var err = r.errors[j];
            console.log(colors.bold(path.join(dir, "/")));
            console.log("  [" + colors.red("ERROR") + "] " + errors.messages[err]);
        }
    }
};
