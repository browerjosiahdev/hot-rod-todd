var gulp = require('gulp');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var open = require('gulp-open');
var sourcemaps = require('gulp-sourcemaps');
var gls = require('gulp-live-server');
var scsslint = require('gulp-scss-lint');
var path = require('path');
var systemjs = require('systemjs-builder');
var htmlreplace = require('gulp-html-replace');
var del = require('del');
var es = require('event-stream');

/**
 * SASS lint task.
 * Lints all sass files.
 */
gulp.task('lint-sass', function() {
  return gulp.src('./src/sass/**/*')
    .pipe(scsslint());
});

/**
* Clean task.
* Cleans previous distribution files.
 */
gulp.task('clean', function (cb) {
	del([
        'dist'
    ], cb);
});

/**
 * Handlebars precompile task.
 * Precompiles all handlebars files into a single js file.
 * The templates.js file is updated for previewing in the src folder,
 * but it is not sent to the distribution folder. It is included in the
 * bundle.min.js file through an import statement in the app.js file.
 */
gulp.task('precompile-templates', function(){
  return gulp.src('./src/templates/**/*.hbs')
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'Handlebars.templates',
      noRedeclare: true,
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./src/'));
});

/**
 * SASS process task.
 * Combines and minifies all sass files into a single stylesheet, and
 * copies over external font files.
 * The stylesheet and fonts are updated for previewing in the src folder,
 * but they are not automatically sent to the distribution folder. These items
 * get sent to the distribution folder in the copy-assets task.
 */
gulp.task('process-sass', function() {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(minifycss())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./src'));
});

/**
 * Copy assets task.
 * Sends asset files, including css, to the distribution folder.
 */
gulp.task('copy-assets', ['clean', 'process-sass'], function() {
  return es.merge(
    gulp.src([
      './src/*.css',
      './src/*.map',
      './src/*.xml',
      './src/*.xsd',
      './src/data.js'
    ]).pipe(gulp.dest('./dist')),
    gulp.src(['./src/js/*.js'])
      .pipe(gulp.dest('./dist/js')),
    gulp.src(['./src/schema/data.js'])
      .pipe(gulp.dest('./dist/schema')),
    gulp.src(['./src/assets/**/*'])
      .pipe(gulp.dest('./dist/assets'))
  );
});

/**
 * JavaScript build task.
 * Combines, transpiles and minifies all js modules into a single file.
 * Production ready file is sent to the distribution folder.
 */
gulp.task('build-js', ['clean', 'precompile-templates'], function() {
  var builder = new systemjs();
  return builder.loadConfig('./src/config.js')
    .then(function() {
      var options = {
        minify: true,
        sourceMaps: true
      };
      builder.config({ baseURL: 'file:' + path.resolve('./src') });
      return builder.buildSFX('./app', './dist/js/bundle.min.js', options);
    });
});

/**
 * HTML build task.
 * Replaces references to development files with production ready files.
 * Production ready file is sent to the distribution folder.
 */
gulp.task('build-html', ['clean'], function() {
  return gulp.src('./src/index.html')
    .pipe(htmlreplace({
        'js': 'js/bundle.min.js'
    }))
    .pipe(gulp.dest('./dist'));
});

/**
 * WebServer task.
 * Starts a web server and watchs for file changes.
 */
gulp.task('webserver', function() {
  var server = gls.new('app.js');
  server.start();

  gulp.watch(['src/templates/**/*.hbs'], ['precompile-templates']);
  gulp.watch(['src/sass/**/*.scss'], ['process-sass']);
  gulp.watch(['src/**/*.css', 'src/**/*.js', 'src/**/*.json', 'src/index.html'],
    server.notify);
  gulp.watch('app.js', server.start);
});

/**
 * Launch task.
 * Launches the application in the default browser.
 */
gulp.task('launch', function() {
  var options = {
    url: 'http://localhost'
  };
  gulp.src('./src/index.html')
    .pipe(open('', options));
});

/**
 * Lint task.
 * Lint all source files for consistancy.
 */
gulp.task('lint', ['lint-sass']);

/**
 * Build task.
 * Build all source files into production ready files.
 */
gulp.task('build', ['clean', 'precompile-templates', 'process-sass',
  'copy-assets', 'build-js', 'build-html']);

/**
 * Development task.
 * Process the SASS files, start the server, watch for changes to all files,
 * and launch the application.
 * SASS must be processed to preview changes, but the JavaScript can be loaded
 * and transpiled on the fly.
 */
gulp.task('default', ['precompile-templates', 'process-sass',
  'webserver', 'launch']);
