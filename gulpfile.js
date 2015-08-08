var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

$css = {
  cssnext: require('cssnext'),
  autoprefixer: require('autoprefixer-core'),
  mqpacker: require('css-mqpacker'),
  csswring: require('csswring'),
  extends: require('postcss-extend'),
  nested: require('postcss-nested')
};

const PATH = {
  JS:{
    SRC: './static/js/app.js',
    DEST: './public/js/'
  },
  CSS:{
    FILES: './static/css/**/*.css',
    SRC: './static/css/main.css',
    DEST: './public/css/'
  },
  IMG: {
    SRC: './static/img/',
    DEST: './public/img/'
  }
};

gulp.task('css', function() {
  var processors = [
      $css.autoprefixer({browsers: ['last 1 version']}),
      $css.cssnext(),
      $css.mqpacker,
      $css.extends(),
      $css.nested,
      $css.csswring
  ];
  return gulp.src(PATH.CSS.SRC)
      .pipe($.sourcemaps.init())
      .pipe($.postcss(processors))
      .pipe($.rename('style.css'))
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest(PATH.CSS.DEST));
});

gulp.task('watch', function() {
  gulp.watch(PATH.CSS.FILES, ['css']);
});

gulp.task('js', function() {
  return compile();
});

gulp.task('js:watch', function() {
  return compile(true);
});

function compile(watch) {
  var bundler = watchify(browserify(PATH.JS.SRC, { debug: true }).transform(babelify));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) {
        console.error(err); this.emit('end');
      })
     .pipe(source('all.js'))
     .pipe(buffer())
     .pipe($.sourcemaps.init({ loadMaps: true }))
     .pipe($.sourcemaps.write('./'))
     .pipe(gulp.dest(PATH.JS.DEST));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

gulp.task('server', function() {
  $.livereload.listen();
  $.nodemon({
    watch: ["app/"],
    script: 'app.js',
    ext: 'js jade'
  }).on('restart', function() {
    setTimeout(function() {
    }, 10);
  });
});

gulp.task('default', [
  'build',
  'server',
  'watch',
  'js:watch'
]);

gulp.task('build', [
  'css',
  'js'
]);
