
/* eslint-disable no-multiple-empty-lines */

// ----- PULL IN DOTENV MODULE TO CONFIG ENVIRONMENT

/* const dotenv = require('dotenv');

dotenv.config({ path: './.env' }); */

// ----- PULL IN MODULES

const gulp = require('gulp');
const gulpSPSave = require('gulp-spsave');
const cached = require('gulp-cached');
const plumber = require('gulp-plumber');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
// const run = require('gulp-run');
// const runSequence = require('run-sequence');
const webpackV4DevConfig = require('./webpack/v4.dev.css.config');
const webpackV5DevConfig = require('./webpack/v5.dev.config');
const gulpBaseConfig = require('./gulp/base.config');
const gulpV4DevConfig = require('./gulp/v4.dev.config');
// const gulpV4ProdConfig = require('./gulp/v4.prod.config');
const gulpV5DevConfig = require('./gulp/v5.dev.config');
const gulpV5ProdConfig = require('./gulp/v5.prod.config');

// ----- CONFIG TASKS

// V4 ---

// build style file
gulp.task('4-dev-build-styles', () => {
	// for specified src style file
	gulp.src(gulpV4DevConfig.ReturnV4DevStylesSrcFile())
		// replace the standard pipe method
		.pipe(plumber())
		// pipe it through webpack
		.pipe(webpackStream(webpackV4DevConfig), webpack)
		// to the specified style folder
		.pipe(gulp.dest(gulpV4DevConfig.ReturnV4DevStylesDistFolder()));
});

// push style file to dev
gulp.task('4-dev-push-styles', () =>
	// for specified dist style file
	gulp.src(gulpV4DevConfig.ReturnV4DevStylesDistFile())
		// replace the standard pipe method
		.pipe(plumber())
		// pipe them into a caching proxy 
		.pipe(cached('spFiles'))
		// and then to SP dev location
		.pipe(gulpSPSave(
			gulpV4DevConfig.ReturnV4SPSaveDevCSSOptions(),
			gulpBaseConfig.ReturnGulpSPSaveCredentials(),
		)));

// build style file and push style file to dev
gulp.task('4-dev-build-push-styles', () =>
	// for specified style file
	gulp.src(gulpV4DevConfig.ReturnV4DevStylesSrcFile())
		// replace the standard pipe method
		.pipe(plumber())
		// pipe it through webpack
		.pipe(webpackStream(webpackV4DevConfig), webpack)
		// to the specified style folder
		.pipe(gulp.dest(gulpV4DevConfig.ReturnV4DevStylesDistFolder()))
		// and then to SP dev location
		.pipe(gulpSPSave(
			gulpV4DevConfig.ReturnV4SPSaveDevCSSOptions(),
			gulpBaseConfig.ReturnGulpSPSaveCredentials(),
		)));

// when the specified src style file changes, build dist file and push dist to prod
gulp.task('4-dev-watch-build-push-styles', () => {
	// watch the src folder; upon changes, build dist file and push dist to prod
	gulp.watch([gulpV4DevConfig.ReturnV4DevStylesSrcFile()], ['4-dev-push-styles']);
});








// V5 ---

// build dist file
gulp.task('5-dev-build', () => {
	// for all files in the src folder
	gulp.src(`${gulpV5DevConfig.ReturnV5DevSrcFolder()}/**`)
		// replace the standard pipe method
		.pipe(plumber())
		// pipe them through webpack
		.pipe(webpackStream(webpackV5DevConfig), webpack)
		// to the dist folder
		.pipe(gulp.dest(`${gulpV5DevConfig.ReturnV5DevDistFolder()}`));
});


// push dist to dev
gulp.task('5-dev-push', () =>
	// for all files in the dist folder
	gulp.src(`${gulpV5DevConfig.ReturnV5DevDistFolder()}/**`)
		// replace the standard pipe method
		.pipe(plumber())
		// pipe them into a caching proxy 
		.pipe(cached('spFiles'))
		// and then to SP dev location
		.pipe(gulpSPSave(
			gulpV5DevConfig.ReturnV5SPSaveDevOptions(), 
			gulpBaseConfig.ReturnGulpSPSaveCredentials(),
		)));

// build dist file and push dist to dev
gulp.task('5-dev-build-push', () =>
	// for all files in the src folder
	gulp.src(`${gulpV5DevConfig.ReturnV5DevSrcFolder()}/**`)
		// replace the standard pipe method
		.pipe(plumber())
		// pipe them through webpack
		.pipe(webpackStream(webpackV5DevConfig), webpack)
		// to the dist folder
		.pipe(gulp.dest(`${gulpV5DevConfig.ReturnV5DevDistFolder()}`))
		// and then to SP dev location
		.pipe(gulpSPSave(
			gulpV5DevConfig.ReturnV5SPSaveDevOptions(), 
			gulpBaseConfig.ReturnGulpSPSaveCredentials(),
		)));

// when src changes, build dist file and push dist to dev
gulp.task('5-dev-watch-build-push', () => {
	// watch the src folder; upon changes, build dist file and push dist to dev
	gulp.watch([`${gulpV5DevConfig.ReturnV5DevSrcFolder()}/**`], ['build-push-dev']);
});


// push dist to prod
gulp.task('5-push-prod', () =>
	// for all files in the dist folder
	gulp.src(`${gulpV5DevConfig.ReturnV5DevDistFolder()}/**`)
		// replace the standard pipe method
		.pipe(plumber())
		// pipe them into a caching proxy 
		.pipe(cached('spFiles'))
		// and then to SP prod location
		.pipe(gulpSPSave(
			gulpV5ProdConfig.ReturnV5SPSaveProdOptions(), 
			gulpBaseConfig.ReturnGulpSPSaveCredentials(),
		)));

// build dist file and push dist to prod
gulp.task('5-build-push-prod', () =>
	// for all files in the src folder
	gulp.src(`${gulpV5DevConfig.ReturnV5DevSrcFolder()}/**`)
		// replace the standard pipe method
		.pipe(plumber())
		// pipe them through webpack
		.pipe(webpackStream(webpackV5DevConfig), webpack)
		// to the dist folder
		.pipe(gulp.dest(`${gulpV5DevConfig.ReturnV5DevDistFolder()}`))
		// and then to SP prod location
		.pipe(gulpSPSave(
			gulpV5ProdConfig.ReturnV5SPSaveProdOptions(), 
			gulpBaseConfig.ReturnGulpSPSaveCredentials(),
		)));

// when src changes, build dist file and push dist to prod
gulp.task('5-watch-build-push-prod', () => {
	// watch the src folder; upon changes, build dist file and push dist to prod
	gulp.watch([`${gulpV5DevConfig.ReturnV5DevSrcFolder()}/**`], ['build-push-prod']);
});

