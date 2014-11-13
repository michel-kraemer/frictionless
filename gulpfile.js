var gulp = require("gulp");
var jasmine = require("gulp-jasmine");
var jscs = require("gulp-jscs");
var jshint = require("gulp-jshint");

var paths = {
    gulpfile: "gulpfile.js",
    scripts: "lib/**/*.js",
    tests: "test/**/*.js"
};

gulp.task("lint", function() {
    return gulp.src([paths.gulpfile, paths.scripts, paths.tests])
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
        .pipe(jshint.reporter("fail"));
});

gulp.task("jscs", function() {
    return gulp.src([paths.gulpfile, paths.scripts, paths.tests])
        .pipe(jscs());
});

gulp.task("test", function() {
    return gulp.src(paths.tests)
        .pipe(jasmine());
});

gulp.task("check", ["test", "lint", "jscs"]);

gulp.task("watch", function() {
    return gulp.watch([paths.gulpfile, paths.scripts, paths.tests], ["check"]);
});

gulp.task("build", []);

gulp.task("clean", function(cb) {
    del(["build"], cb);
});

gulp.task("default", ["build"]);
