var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('sass', function() {
  return gulp.src('./src/sass/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('./css/'));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './',
      index: 'index.html'
    }
  });
});

gulp.task('default', ['sass', 'browser-sync'], function() {
  gulp.watch('./src/sass/app.scss', ['sass']).on('change', reload);
  gulp.watch('./**/*.html').on('change', reload);
});