
// ----- PULL IN DOTENV MODULE TO CONFIG ENVIRONMENT

/* const dotenv = require('dotenv');

dotenv.config({ path: './.env' }); */

// ----- PULL IN MODULES

const gulp = require('gulp');
const spsave = require('gulp-spsave');
const cached = require('gulp-cached');
const plumber = require('gulp-plumber');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackV5DevConfig = require('./webpack/v5.dev.config');
const gulpBaseConfig = require('./gulp/base.config');
const gulpV5DevConfig = require('./gulp/v5.dev.config');
const gulpV5ProdConfig = require('./gulp/v5.prod.config');

// ----- CONFIG TASKS

// build dist file
gulp.task('build', () => {
	// for all files in the src folder
	gulp.src(`${gulpV5DevConfig.ReturnV5DevgulpV5DevConfig.ReturnV5DevSrcFolder()()}/**`)
		// replace the standard pipe method
		.pipe(plumber())
		// pipe them through webpack
		.pipe(webpackStream(webpackV5DevConfig), webpack)
		// to the dist folder
		.pipe(gulp.dest(`${gulpV5DevConfig.ReturnV5DevgulpV5DevConfig.ReturnV5DevDistFolder()()}`));
});

// push dist to dev
gulp.task('push-dev', () =>
	// for all files in the dist folder
	gulp.src(`${gulpV5DevConfig.ReturnV5DevDistFolder()}/**`)
		// replace the standard pipe method
		.pipe(plumber())
		// pipe them into a caching proxy 
		.pipe(cached('spFiles'))
		// and then to SP dev location
		.pipe(spsave(gulpV5DevConfig.ReturnV5SPSaveDevOptions(), gulpBaseConfig.ReturnGulpSPSaveCredentials())));

// build dist file and push dist to dev
gulp.task('build-push-dev', () =>
	// for all files in the src folder
	gulp.src(`${gulpV5DevConfig.ReturnV5DevSrcFolder()}/**`)
		// replace the standard pipe method
		.pipe(plumber())
		// pipe them through webpack
		.pipe(webpackStream(webpackV5DevConfig), webpack)
		// to the dist folder
		.pipe(gulp.dest(`${gulpV5DevConfig.ReturnV5DevDistFolder()}`))
		// and then to SP dev location
		.pipe(spsave(gulpV5DevConfig.ReturnV5SPSaveDevOptions(), gulpBaseConfig.ReturnGulpSPSaveCredentials())));

// when src changes, build dist file and push dist to dev
gulp.task('watch-build-push-dev', () => {
	// watch the src folder; upon changes, build dist file and push dist to dev
	gulp.watch([`${gulpV5DevConfig.ReturnV5DevSrcFolder()}/**`], ['build-push-dev']);
});


// push dist to prod
gulp.task('push-prod', () =>
	// for all files in the dist folder
	gulp.src(`${gulpV5DevConfig.ReturnV5DevDistFolder()}/**`)
		// replace the standard pipe method
		.pipe(plumber())
		// pipe them into a caching proxy 
		.pipe(cached('spFiles'))
		// and then to SP prod location
		.pipe(spsave(gulpV5ProdConfig.ReturnV5SPSaveProdOptions(), gulpBaseConfig.ReturnGulpSPSaveCredentials())));

// build dist file and push dist to prod
gulp.task('build-push-prod', () =>
	// for all files in the src folder
	gulp.src(`${gulpV5DevConfig.ReturnV5DevSrcFolder()}/**`)
		// replace the standard pipe method
		.pipe(plumber())
		// pipe them through webpack
		.pipe(webpackStream(webpackV5DevConfig), webpack)
		// to the dist folder
		.pipe(gulp.dest(`${gulpV5DevConfig.ReturnV5DevDistFolder()}`))
		// and then to SP prod location
		.pipe(spsave(gulpV5ProdConfig.ReturnV5SPSaveProdOptions(), gulpBaseConfig.ReturnGulpSPSaveCredentials())));

// when src changes, build dist file and push dist to prod
gulp.task('watch-build-push-prod', () => {
	// watch the src folder; upon changes, build dist file and push dist to prod
	gulp.watch([`${gulpV5DevConfig.ReturnV5DevSrcFolder()}/**`], ['build-push-prod']);
});

