var fs = require("fs");

var pkg = JSON.parse(fs.readFileSync(__dirname + "/../package.json").toString());

module.exports.NAME = pkg.name;
module.exports.VERSION = pkg.version;

module.exports.SKIP_README = "README";
module.exports.SKIP_LICENSE = "LICENSE";
module.exports.SKIP_CONTRIBUTING = "CONTRIBUTING";
module.exports.SKIP_GITIGNORE = ".gitignore";
module.exports.SKIP_BOOTSTRAP = "script/bootstrap";
module.exports.SKIP_TEST = "script/test";
