var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
$css = {
  cssnext: require('cssnext'),
  autoprefixer: require('autoprefixer-core'),
  mqpacker: require('css-mqpacker'),
  csswring: require('csswring'),
};

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
    DEST: './public/img/'
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
      $css.autoprefixer({browsers: ['last 1 version']}),
      $css.mqpacker,
      $css.csswring,
      $css.cssnext(),
  ];
  return gulp.src(PATH.CSS.SRC)
      .pipe($.sourcemaps.init())
      .pipe($.postcss(processors))
      .pipe($.rename('style.css'))
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest(PATH.CSS.DEST));
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
      .pipe(gulp.dest(PATH.JS.DEST));
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
