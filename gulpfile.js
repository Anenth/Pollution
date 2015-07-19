var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var $ = gulpLoadPlugins();
const PATH = {
  JS:{
    SRC: './static/js/app.js',
    DEST: './public/js/'
  },
  CSS:{
    SRC: './static/css/main.css',
    DEST: './public/css/'
  },
  IMG: {
    SRC: './static/img/',
    DEST: './dist/img/'
  }
};

// gulp.task('sass', function() {
//   gulp.src('./public/css/*.scss')
//     .pipe($.plumber())
//     .pipe($.sass())
//     .pipe(gulp.dest('./public/css'))
//     .pipe($.livereload());
// });

gulp.task('css', function() {
  var processors = [
      $.autoprefixer({browsers: ['last 1 version']}),
      $.mqpacker,
      $.csswring
  ];
  return gulp.src(PATH.CSS.SRC)
      .pipe($.postcss(processors))
      .pipe(gulp.dest(PATH.CSS.DIST));
});

gulp.task('watch', function() {
  gulp.watch(PATH.CSS.SRC, ['css']);
  // gulp.watch('/public/js/src/*.js', ['js']);
});

// gulp.task('js', function () {
//   return gulp.src('./public/js/src/*.js')
//     .pipe(sourcemaps.init())
//     .pipe(watch())
//     .pipe(concat('all.js'))
//     .pipe(babel())
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest('./public/js/'));
// });

gulp.task('js', function() {
  gulp.src(PATH.JS.SRC)
      .pipe($.browserify({
        insertGlobals: true,
        debug: true
      }))
      .pipe(gulp.dest(PATH.JS.DIST));
});

gulp.task('server', function() {
  $.livereload.listen();
  $.nodemon({
    script: 'app.js',
    ext: 'js jade'
  }).on('restart', function() {
    setTimeout(function() {
      $.livereload.changed(__dirname);
    }, 500);
  });
});

gulp.task('default', [
  'css',
  'server',
  'watch'
]);

gulp.task('build', [
  'css',
  'js'
]);
