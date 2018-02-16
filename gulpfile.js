var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var gutil = require('gulp-util');
var gulpStylelint = require('gulp-stylelint');
var pug = require('gulp-pug');
var minify = require('gulp-minify');

gulp.task('styles', function() {
    gulp.src('./resources/assets/scss/**/*.scss')
        .pipe(sass().on('error', gutil.log))
        .pipe(gulp.dest('./dist/assets/css/'))
});


gulp.task('views', function buildHTML() {
    gulp.src('./resources/assets/pug/**/*.pug')
        .pipe(pug()).on('error', gutil.log).pipe(gulp.dest('./dist'))
});


//Watch task
gulp.task('default', function() {
    gulp.watch('./resources/assets/**/*.scss', ['styles']);
    gulp.watch('./resources/assets/pug/**/*.pug', ['views']);
    gulp.watch('./resources/assets/js/*.js', ['compress']);
});

//Lint task
gulp.task('lint', function lintCssTask() {
    return gulp
        .src('dist/css/**/*.css')
        .pipe(gulpStylelint({
            fix: true,
            reporters: [
                { formatter: 'verbose', console: true }
            ]
        }));
});

//Watch autoprefixer

gulp.task('autoprefix', () =>
    gulp.src('dist/assets/css/app.css')
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('dist/assets/css'))
);

gulp.task('compress', function() {
    gulp.src('./resources/assets/js/*.js')
        .pipe(minify({
            ext: {
                src: '-debug.js',
                min: '.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest('./dist/assets/js'))
});