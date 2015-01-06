var gulp = require("gulp"),
    util = require("gulp-util"),
    minifyHtml = require("gulp-minify-html"),
    less = require("gulp-less"),
    minifyCss = require("gulp-minify-css");

gulp.task("html", function() {
    util.log("Minifying...");
    
    gulp.src("src/html/*.html")
        .pipe(minifyHtml({}))
        .pipe(gulp.dest("public/"));

    util.log("Done!");
});

gulp.task("less", function() {
    util.log("Compiling and minifying...");

    gulp.src("src/less/*.less")
        .pipe(less())
        .pipe(minifyCss({cache: false}))
        .pipe(gulp.dest("public/css/"));

    util.log("Done!");
});

gulp.task("watch", function() {
    gulp.watch("src/html/*.html", ["html"]);
    gulp.watch("src/less/**/*.less", ["less"]);
});

gulp.task("default", ["html", "less", "watch"], function() {
    util.log("Done!");
});
