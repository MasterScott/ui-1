var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var notifier = require('node-notifier');
var server = require('gulp-server-livereload');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var postcss = require('gulp-postcss');
var babelify = require('babelify');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');

// PostCSS processors
var autoprefixer = require('autoprefixer');
var cssnext = require('postcss-cssnext');
var precss = require('precss');
var lost = require('lost');
var mqpacker = require('css-mqpacker');

var notify = function(error) {
  var message = 'In: ';
  var title = 'Error: ';

  if(error.description) {
    title += error.description;
  } else if (error.message) {
    title += error.message;
  }

  if(error.filename) {
    var file = error.filename.split('/');
    message += file[file.length-1];
  }

  if(error.lineNumber) {
    message += '\nOn Line: ' + error.lineNumber;
  }

  console.log(title + message);
  notifier.notify({title: title, message: message});
};

var bundler = watchify(browserify({
  entries: ['./src/app.jsx'],
  transform: babelify.configure({
              presets: ["es2015", "react"]
            }),
  extensions: ['.jsx'],
  debug: true,
  cache: {},
  packageCache: {},
  fullPaths: true
}));

function bundle() {
  return bundler
    .bundle()
    .on('error', notify)
    .pipe(source('main.js'))
    .pipe(gulp.dest('./'))
}
bundler.on('update', bundle)

gulp.task('build', function() {
  bundle()
});

gulp.task('serve', function(done) {
  gulp.src('')
    .pipe(server({
      livereload: {
        enable: true,
        filter: function(filePath, cb) {
          if(/main.js/.test(filePath)) {
            cb(true)
          } else if(/style.css/.test(filePath)){
            cb(true)
          }
        }
      },
      open: true
    }));
});

gulp.task('pcss', function(){
  var processors = [
    autoprefixer,
    cssnext,
    precss,
    lost,
    mqpacker
  ];
  return gulp.src('./pcss/**/*.pcss')
    .pipe(postcss(processors))
    .on('error', notify)
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./'));
});


gulp.task('default', ['build', 'serve', 'pcss', 'watch']);
gulp.task('deploy', function(){
  var bundler = browserify({
    entries: ['./src/app.jsx'],
    transform: babelify.configure({
                presets: ["es2015", "react"]
              }),
    extensions: ['.jsx'],
    debug: false,
    cache: {},
    packageCache: {},
    fullPaths: true
  });

  var processors = [
    autoprefixer,
    cssnext,
    precss,
    lost,
    mqpacker
  ];
  gulp.src('./pcss/**/*.pcss')
    .pipe(postcss(processors))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./dist'));

  bundler
    .bundle()
    .pipe(source('main.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('./dist'))

  gulp.src('*.html')
    .pipe(gulp.dest('./dist'))

});

gulp.task('watch', function () {
  gulp.watch('./pcss/**/*.pcss', ['pcss']);
});
