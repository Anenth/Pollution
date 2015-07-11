var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  sass = require('gulp-sass'),
  sourcemaps = require("gulp-sourcemaps"),
  babel = require("gulp-babel"),
  browserify = require("gulp-browserify"),
  concat = require("gulp-concat");

gulp.task('sass', function () {
  gulp.src('./public/css/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  // gulp.watch('./public/css/*.scss', ['sass']);
  gulp.watch('/public/js/src/*.js', ['js']);
});

// gulp.task("js", function () {
//   return gulp.src("./public/js/src/*.js")
//     .pipe(sourcemaps.init())
//     .pipe(watch())
//     .pipe(concat("all.js"))
//     .pipe(babel())
//     .pipe(sourcemaps.write("."))
//     .pipe(gulp.dest("./public/js/"));
// });

gulp.task("js", function () {
  gulp.src('./public/js/src/*.js')
      .pipe(browserify({
        insertGlobals : true,
        debug : true
      }))
      .pipe(gulp.dest('./public/js/'));
});

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js jade',
  }).on('restart', function () {
    setTimeout(function () {
      livereload.changed(__dirname);
    }, 500);
  });
});

gulp.task('default', [
  'sass',
  'develop',
  'watch'
]);
