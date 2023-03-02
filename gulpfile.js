'use strict';

//Gulp
var gulp = require('gulp'),

//Plugins
 sass = require('gulp-sass')(require('sass')),
 concat = require('gulp-concat'),
 uglify = require('gulp-uglify'),
 //rename = require('gulp-rename'),
 fileInclude = require('gulp-file-include'),
 //imageMin = require('gulp-imagemin');
 eslint = require('gulp-eslint');

//Sass
gulp.task('sass', function() {
    return gulp.src('source/assets/sass/**/*.scss')
    .pipe(sass({
        style: 'compressed'
    }))
    .pipe(gulp.dest('./build/assets/css'))
});

//Concatenate and minify the Js Plugins
gulp.task('jsplugins', function() {
    return gulp.src('source/assets/js/plugins/*.js')
        .pipe(concat('plugins.js'))
        .pipe(gulp.dest('./build/assets/js'))
        //.pipe(rename('plugins.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/assets/js/'));
});

//Minify main JS
gulp.task('jsmain', function() {
    return gulp.src('scripts/*.js')
        .pipe(uglify())
        //.pipe(rename('main.min.js'))
        .pipe(gulp.dest('./build/assets/js'));
});

//Images
gulp.task('images', function() {
    return gulp.src('source/assets/images/**.*')
        .pipe(imageMin({progressive: true}))
        .pipe(gulp.dest('build/assets/images/'))
});

//Includes
gulp.task('fileInclude', function() {
  gulp.src(['source/*.html'])
    .pipe(fileInclude({prefix: '@@',basepath: '@file'}))
    .pipe(gulp.dest('./build'));
});

gulp.task('eslinter', () => {
    return gulp.src(['scripts/*.js'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint({
            "extends": "airbnb-base",
            "parserOptions": {
                "ecmaVersion": 8,
                "sourceType": "module"
            },
            "env": {
                "node": true,
                "es6": true
            },
            "rules": {
                "no-console": 0,
                "no-unused-vars": 1
            }
        }))
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});


//Main Watch
gulp.task('watch', function() {
    //gulp.watch('**/*.scss', gulp.series('sass'));
    //gulp.watch('*.html', gulp.series('fileInclude'));
    gulp.watch('scripts/*.js', gulp.series('eslinter'));
    //gulp.watch('source/assets/js/plugins/*.js', gulp.series('jsplugins'));
    //gulp.watch('source/assets/images/**.*', gulp.series('images'));

    //gulp.watch('source/assets/sass/**/*.scss', gulp.series('sass'));
    //gulp.watch('source/*.html', gulp.series('fileInclude'));
    //gulp.watch('source/assets/js/main.js', gulp.series('jsmain'));
    //gulp.watch('source/assets/js/plugins/*.js', gulp.series('jsplugins'));
    //gulp.watch('source/assets/images/**.*', gulp.series('images'));
});

//Main Command
gulp.task('default', gulp.series('watch'), function() {
    process.exit(0);
});