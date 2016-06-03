/* reference http://justinmccandless.com/post/a-tutorial-for-getting-started-with-gulp/ */

const gulp = require('gulp');
const path = require('path');

const gulpSequence = require('gulp-sequence');
const print = require('gulp-print');
const copy = require('gulp-copy');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const responsive = require('gulp-responsive');

var bases = {
  src: 'src/',
  dist: 'dist/',
};

var paths = {
  scripts: ['js/**/*.js'],
  styles: ['css/bootstrap.min.css', 'css/main.css'],
  images: ['img/**/*.jpg', 'img/**/*.png'],
  svgs: ['img/**/*.svg'],
  fonts: ['fonts/**/*'],
  img_out: '/img',
  css_out: '/css',
  fonts_out: '/fonts',
  scripts_out: '/js',
  html: ['**/*.html'],
  clean: ['**/*.*'],
  extras: ['apple-touch-icon.png.xml', 'browserconfig.xml', 'favicon.ico', 'robots.txt', 'favicon.ico'],
};

gulp.task('build', gulpSequence(['responsive', 'svg', 'extras', 'html', 'css', 'scripts']));

gulp.task('default', gulpSequence('clean', 'build'));

// Delete the dist directory
gulp.task('clean', function() {
 return gulp.src(paths.clean, {cwd: bases.dist, read: false})
 .pipe(print())
 .pipe(clean());
});

gulp.task('wipe', function() {
  return gulp.src(bases.dist, {read:false})
  .pipe(clean());
});

// Copy base files
gulp.task('extras', function() {
   gulp.src(paths.extras, {cwd: bases.src})
   .pipe(gulp.dest(bases.dist));
});

// Process html
gulp.task('html', function() {
 gulp.src(paths.html, {cwd: bases.src})
 .pipe(print())
 .pipe(gulp.dest(bases.dist));
});

// Process css
gulp.task('css', function() {
  gulp.src(paths.styles, {cwd: bases.src})
 .pipe(print())
 .pipe(gulp.dest(bases.dist + paths.css_out));
});

// Process svgs
gulp.task('svg', function() {
  gulp.src(paths.svgs, {cwd: bases.src})
 .pipe(print())
 .pipe(gulp.dest(bases.dist + paths.img_out));
});

// Process fonts
gulp.task('fonts', function() {
  gulp.src(paths.fonts, {cwd: bases.src})
 .pipe(print())
 .pipe(gulp.dest(bases.dist + paths.fonts_out));
});

// Process scripts
gulp.task('scripts', function() {
 gulp.src(paths.scripts, {cwd: bases.src})
 .pipe(print())
 .pipe(gulp.dest(bases.dist + paths.scripts_out));
});


gulp.task('responsive', function () {
  gulp.src(paths.images, {cwd: bases.src})
    .pipe(print())
    .pipe(responsive({
          '*top_image*.jpg':
          [
            {
              width: 640,
              // don't rename --- this will be our fallback size
            }
            ,{
              width: 1200,
              rename: { suffix: '@2x' }
            }
          ],
          '**/content*.jpg': [{
              width: 400,
              rename: { suffix: '_400' }
            }
            ,{
              width: 720,
              rename: { suffix: '_720' }
            }],
        },
        {
          // Global configuration for all images
          // The output quality for JPEG, WebP and TIFF output formats
          quality: 70,
          // Use progressive (interlace) scan for JPEG and PNG output
          progressive: true,
          // Strip all metadata
          withMetadata: false,
          // Don't notify enlargements
          errorOnEnlargement: false,
          // Don't error on missing configs
          errorOnUnusedImage: false
        }))
    .pipe(gulp.dest(bases.dist.concat('/', paths.img_out)));
});




