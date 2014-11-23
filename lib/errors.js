module.exports.DIR = "ERR_DIR";
module.exports.README = "ERR_README";
module.exports.LICENSE = "ERR_LICENSE";
module.exports.GITIGNORE = "ERR_GITIGNORE";
module.exports.CONTRIBUTING = "ERR_CONTRIBUTING";
module.exports.BOOTSTRAP = "ERR_BOOTSTRAP";
module.exports.TEST = "ERR_TEST";

var messages = {};
messages[module.exports.DIR] = "Directory does not exist";
messages[module.exports.README] = "README file does not exist";
messages[module.exports.LICENSE] = "LICENSE file does not exist";
messages[module.exports.GITIGNORE] = ".gitignore file does not exist";
messages[module.exports.CONTRIBUTING] = "CONTRIBUTING guide does not exist";
messages[module.exports.BOOTSTRAP] = "Bootstrap script does not exist";
messages[module.exports.TEST] = "Test script does not exist";

var severityLevels = {};
severityLevels.FATAL = "FATAL";
severityLevels.ERROR = "ERROR";
severityLevels.WARNING = "WARNING";
severityLevels.INFO = "INFO";

var severity = {};
severity[module.exports.DIR] = severityLevels.FATAL;
severity[module.exports.README] = severityLevels.ERROR;
severity[module.exports.LICENSE] = severityLevels.ERROR;
severity[module.exports.GITIGNORE] = severityLevels.WARNING;
severity[module.exports.CONTRIBUTING] = severityLevels.WARNING;
severity[module.exports.BOOTSTRAP] = severityLevels.WARNING;
severity[module.exports.TEST] = severityLevels.WARNING;

module.exports.messages = messages;
module.exports.severityLevels = severityLevels;
module.exports.severity = severity;
