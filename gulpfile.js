
// ----- PULL IN DOTENV MODULE TO CONFIG ENVIRONMENT

const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

// ----- PULL IN MODULES

const gulp = require('gulp');
const spsave = require('gulp-spsave');
const cached = require('gulp-cached');
const plumber = require('gulp-plumber');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

// ----- CONFIG SETTINGS

const srcFolder = './src';
const distFolder = './dist';

const gulpSPSaveDevOptions = {
	siteUrl: 'https://bmos.sharepoint.com/sites/hubdev',
	notification: true,
	folder: 'DevCode5',
	flatten: false,
};
const gulpSPSaveProdOptions = {
	siteUrl: 'https://bmos.sharepoint.com/sites/hubprod',
	notification: true,
	folder: 'Code5',
	flatten: false,
};
const gulpSPSaveCredentials = {
	username: process.env.spUser,
	password: process.env.spPassword,
};

// ----- CONFIG TASKS

// build dist file
gulp.task('build', () => {
	// for all files in the src folder
	gulp.src(`${srcFolder}/**`)
		// replace the standard pipe method
		.pipe(plumber())
		// pipe them through webpack
		.pipe(webpackStream(webpackConfig), webpack)
		// to the dist folder
		.pipe(gulp.dest(`${distFolder}`));
});

// push dist to dev
gulp.task('push-dev', () =>
	// for all files in the dist folder
	gulp.src(`${distFolder}/**`)
		// replace the standard pipe method
		.pipe(plumber())
		// pipe them into a caching proxy 
		.pipe(cached('spFiles'))
		// and then to SP dev location
		.pipe(spsave(gulpSPSaveDevOptions, gulpSPSaveCredentials)));

// build dist file and push dist to dev
gulp.task('build-push-dev', () =>
	// for all files in the src folder
	gulp.src(`${srcFolder}/**`)
		// replace the standard pipe method
		.pipe(plumber())
		// pipe them through webpack
		.pipe(webpackStream(webpackConfig), webpack)
		// to the dist folder
		.pipe(gulp.dest(`${distFolder}`))
		// and then to SP dev location
		.pipe(spsave(gulpSPSaveDevOptions, gulpSPSaveCredentials)));

// when src changes, build dist file and push dist to dev
gulp.task('watch-build-push-dev', () => {
	// watch the src folder; upon changes, build dist file and push dist to dev
	gulp.watch([`${srcFolder}/**`], ['build-push-dev']);
});


// push dist to prod
gulp.task('push-prod', () =>
	// for all files in the dist folder
	gulp.src(`${distFolder}/**`)
		// replace the standard pipe method
		.pipe(plumber())
		// pipe them into a caching proxy 
		.pipe(cached('spFiles'))
		// and then to SP prod location
		.pipe(spsave(gulpSPSaveProdOptions, gulpSPSaveCredentials)));

// build dist file and push dist to prod
gulp.task('build-push-prod', () =>
	// for all files in the src folder
	gulp.src(`${srcFolder}/**`)
		// replace the standard pipe method
		.pipe(plumber())
		// pipe them through webpack
		.pipe(webpackStream(webpackConfig), webpack)
		// to the dist folder
		.pipe(gulp.dest(`${distFolder}`))
		// and then to SP prod location
		.pipe(spsave(gulpSPSaveProdOptions, gulpSPSaveCredentials)));

// when src changes, build dist file and push dist to prod
gulp.task('watch-build-push-prod', () => {
	// watch the src folder; upon changes, build dist file and push dist to prod
	gulp.watch([`${srcFolder}/**`], ['build-push-prod']);
});

