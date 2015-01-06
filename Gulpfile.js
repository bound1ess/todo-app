var gulp = require("gulp"),
    util = require("gulp-util"),
    minifyHtml = require("gulp-minify-html");

gulp.task("html", function() {
    util.log("Minifying...");
    
    gulp.src("src/html/*.html")
        .pipe(minifyHtml({}))
        .pipe(gulp.dest("public/"));

    util.log("Done!");
});

gulp.task("default", ["html"], function() {
    util.log("Done!");
});
