'use strict';
console.log(`You are developing the frontend code for perpetualguardian.co.nz`);
const gulp = require('gulp');

// CSS
// Compile CSS
const sass = require('gulp-sass');
// Parse CSS and add vendor prefixes
const autoprefixer = require('gulp-autoprefixer');
// Minify CSS
const cleanCss = require('gulp-clean-css');
// CSS linter
const stylelint = require('gulp-stylelint');

// JS
// Add sourcemaps
const sourcemaps = require('gulp-sourcemaps');
// JavaScript linter
const eslint = require('gulp-eslint');
// Use it here to compile and minify vue files
const webpack = require('webpack');
const stream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

// Utilities
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

const BUILD_PATH = './app/web/build/';
const SOURCE_PATH = './src/';
const TEMPLATES_PATH = './app/templates/';

const config = {
    PORT: '3005',
    SITEURL: 'perpetualguardian.co.nz.local',
    BUILD_PATH: BUILD_PATH,
    SOURCE_PATH: SOURCE_PATH,
    SASS_WATCH: [
        SOURCE_PATH + 'scss/**/*.scss'
    ],
    SASS_INPUT: SOURCE_PATH + 'scss/app.scss',
    CSS_OUTPUT: 'app.css',
    CSS_OUTPUT_MIN: 'app.min.css',
    JS_WATCH: [
        SOURCE_PATH + 'js/**/*.js'
    ],
    JS_INPUT: SOURCE_PATH + 'js/app.js',
    JS_OUTPUT: BUILD_PATH,
    REFRESH_WATCH: [
        TEMPLATES_PATH + '**/*.twig',
        TEMPLATES_PATH + '**/*.html',
        BUILD_PATH + '*.js'
    ]
};

gulp.task('stylelint', function() {
    return gulp
        .src(config.SASS_WATCH)
        .pipe(stylelint({
            failAfterError: false,
            reporters: [
                {
                    formatter: 'string',
                    console: true
                }
            ]
        }));
});

gulp.task('sass', ['stylelint'], function() {
    return gulp.src(config.SASS_INPUT)
      .pipe(sourcemaps.init())
      .pipe(autoprefixer({
          browsers: ['> 3%']
      }))
      .pipe(sass({
          includePaths: [
              require('node-normalize-scss').includePaths,
              'node_modules/bootstrap/scss',
              'node_modules/air-datepicker/src/sass'
          ]
      }).on('error', sass.logError))
      .pipe(rename(config.CSS_OUTPUT))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(config.BUILD_PATH))
      .pipe(browserSync.stream());
});

gulp.task('minify-css', ['sass'], function() {
    return gulp.src(config.BUILD_PATH + config.CSS_OUTPUT)
        .pipe(cleanCss({compatibility:'ie8'}))
        .pipe(rename(config.CSS_OUTPUT))
        .pipe(gulp.dest(config.BUILD_PATH));
});

gulp.task('eslint', function() {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(config.JS_INPUT)
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

gulp.task('webpack', ['eslint'], function() {
    return gulp.src(config.JS_INPUT)
        .pipe(sourcemaps.init())
        .pipe(stream(webpackConfig))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.BUILD_PATH));
});

gulp.task('watch', ['sass', 'webpack'], function() {
    // Start browser sync server
    browserSync.init({
        port: config.PORT,
        proxy: config.SITEURL
    });
    // Watch SASS files
    gulp.watch(config.SASS_WATCH, ['sass']);
    // Watch html, php and JS files to reload page
    gulp.watch(config.REFRESH_WATCH).on('change', browserSync.reload);
    // Watch js and do webpack
    gulp.watch(config.JS_WATCH, ['webpack']);
});

gulp.task('build', ['minify-css', 'webpack']);
