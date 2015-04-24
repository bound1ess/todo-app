// The Gulp package itself.
var gulp = require("gulp"),
    // This package provides some great additions to Gulp (see util.log()).
    util = require("gulp-util"),
    // This package provides HTML code minification tool.
    minifyHtml = require("gulp-minify-html"),
    // This package compiles LESS files into normal CSS ones.
    less = require("gulp-less"),
    // This package provides CSS code minification tool.
    minifyCss = require("gulp-minify-css"),
    // This package provides JS code minification tool.
    minifyJs = require("gulp-uglify"),
    // This package helps you make your CSS code more compatible.
    autoprefixer = require("gulp-autoprefixer");

// gulp html
// This task performs HTML minification (in src/html/) using gulp-minify-html package.
// The result will be stored in public/.
gulp.task("html", function() {
    util.log("Minifying...");

    gulp.src("src/html/*.html")
        .pipe(minifyHtml({}))
        .pipe(gulp.dest("public/"));

    util.log("Done!");
});

// gulp less
// This task performs LESS compilation (gulp-less) and then minification (gulp-minify-css).
// The result will be stored in public/css/.
gulp.task("less", function() {
    util.log("Compiling and minifying, autoprefixing...");

    gulp.src("src/less/*.less")
        .pipe(less())
        .pipe(autoprefixer({browsers: ["last 5 versions"]}))
        .pipe(minifyCss({cache: false}))
        .pipe(gulp.dest("public/css/"));

    util.log("Done!");
});

// gulp js
// This task performs JS minification using gulp-uglify package.
// The result will be stored in public/js/.
gulp.task("js", function() {
    util.log("Minifying...");

    gulp.src("src/js/*.js")
        .pipe(minifyJs({mangle: false, compress: false}))
        .pipe(gulp.dest("public/js/"));

    util.log("Done!");
});

// gulp watch
// The file watcher.
// Any change in the source directory will be instantly reflected in the public one.
gulp.task("watch", function() {
    gulp.watch("src/html/*.html", ["html"]);
    gulp.watch("src/less/**/*.less", ["less"]);
    gulp.watch("src/js/*.js", ["js"]);
});

// gulp
// This task will run "html", "less", "js" tasks first and then fire the file watcher.
gulp.task("default", ["html", "less", "js", "watch"], function() {
    util.log("Done!");
});

// gulp data
// This task will copy all JSON files stored in src/data/ into public/data/.
gulp.task("data", function() {
    util.log("Copying src/data/ into public/data/...");

    gulp.src("src/data/*.json")
        .pipe(gulp.dest("public/data/"));

    util.log("Done!");
});
