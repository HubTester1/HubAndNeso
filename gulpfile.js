
// ----- PULL IN MODULES

const gulp = require('gulp');
const spSave = require('gulp-spsave');
const cached = require('gulp-cached');
const plumber = require('gulp-plumber');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const { argv } = require('yargs');
const webpackV4DevConfig = require('./webpack/v4.dev.css.config');
const webpackV4ProdConfig = require('./webpack/v4.prod.css.config');
const webpackV5DevConfig = require('./webpack/v5.dev.config');
const gulpBaseConfig = require('./gulp/base.config');
const gulpV4DevConfig = require('./gulp/v4.dev.config');
const gulpV4ProdConfig = require('./gulp/v4.prod.config');
const gulpV5DevConfig = require('./gulp/v5.dev.config');
const gulpV5ProdConfig = require('./gulp/v5.prod.config');

// ----- CONFIG TASKS


// SWF APP SETTINGS ---

// push specified settings file to specified location
gulp.task('push-settings', () =>
	// for specified settings file
	gulp.src(gulpBaseConfig.ReturnSWFSettingsFile(argv.app))
		// replace the standard pipe method
		.pipe(plumber())
		// pipe them into a caching proxy 
		.pipe(cached('spFiles'))
		// and then to specified SP location
		.pipe(spSave(
			gulpBaseConfig.ReturnSPSaveSWFSettingsOptions(argv.app),
			gulpBaseConfig.ReturnGulpSPSaveCredentials(),
		)));
// when the specified settings file changes, push it to specified location
gulp.task('watch-push-settings', () => {
	// watch the src style file; upon changes, build dist style file and push it to dev
	gulp.watch([gulpBaseConfig.ReturnSWFSettingsFile(argv.app)], ['push-settings']);
});


// V4 API & STYLES ---

// DEV

// build style file
gulp.task('4-dev-build-styles', () =>
	// for specified src style file
	gulp.src(gulpV4DevConfig.ReturnV4DevStylesSrcFile())
		// replace the standard pipe method
		.pipe(plumber())
		// pipe it through webpack
		.pipe(webpackStream(webpackV4DevConfig), webpack)
		// to the specified style folder
		.pipe(gulp.dest(gulpV4DevConfig.ReturnV4DevStylesDistFolder())));
// push style file to dev
gulp.task('4-dev-push-styles', () =>
	// for specified dist style file
	gulp.src(gulpV4DevConfig.ReturnV4DevStylesDistFile())
		// replace the standard pipe method
		.pipe(plumber())
		// pipe them into a caching proxy 
		.pipe(cached('spFiles'))
		// and then to SP dev location
		.pipe(spSave(
			gulpV4DevConfig.ReturnV4DevSPSaveCSSOptions(),
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
		.pipe(spSave(
			gulpV4DevConfig.ReturnV4DevSPSaveCSSOptions(),
			gulpBaseConfig.ReturnGulpSPSaveCredentials(),
		)));
// when the specified src style file changes, build dist style file and push it to dev
gulp.task('4-dev-watch-build-push-styles', () => {
	// watch the src style file; upon changes, build dist style file and push it to dev
	gulp.watch([gulpV4DevConfig.ReturnV4DevStylesSrcFile()], ['4-dev-push-styles']);
});
// push specified swf api file to dev
gulp.task('4-dev-push-api', () =>
	// for specified dist swf api file
	gulp.src(gulpV4DevConfig.ReturnV4DevSWFAPIFile(argv.api))
		// and then to SP dev location
		.pipe(spSave(
			gulpV4DevConfig.ReturnV4DevSPSaveSWFAPIOptions(),
			gulpBaseConfig.ReturnGulpSPSaveCredentials(),
		)));
// wait for save and then push specified swf api file to dev
gulp.task('4-dev-wait-push-api', () => {
	setTimeout(
		() => 
			// for specified dist swf api file
			gulp.src(gulpV4DevConfig.ReturnV4DevSWFAPIFile(argv.api))
			// and then to SP dev location
				.pipe(spSave(
					gulpV4DevConfig.ReturnV4DevSPSaveSWFAPIOptions(),
					gulpBaseConfig.ReturnGulpSPSaveCredentials(),
				))
		, 500,
	);
});
// when the specified swf api file changes, push it to dev
gulp.task('4-dev-watch-push-api', () => {
	// watch the src style file; upon changes, build dist style file and push it to dev
	gulp.watch([gulpV4DevConfig.ReturnV4DevSWFAPIFile(argv.api)], ['4-dev-wait-push-api']);
});

// PROD

// build style file
gulp.task('4-prod-build-styles', () =>
	// for specified src style file
	gulp.src(gulpV4ProdConfig.ReturnV4ProdStylesSrcFile())
		// replace the standard pipe method
		.pipe(plumber())
		// pipe it through webpack
		.pipe(webpackStream(webpackV4ProdConfig), webpack)
		// to the specified style folder
		.pipe(gulp.dest(gulpV4ProdConfig.ReturnV4ProdStylesDistFolder())));
// push style file to dev
gulp.task('4-prod-push-styles', () =>
	// for specified dist style file
	gulp.src(gulpV4ProdConfig.ReturnV4ProdStylesDistFile())
		// replace the standard pipe method
		.pipe(plumber())
		// pipe them into a caching proxy 
		.pipe(cached('spFiles'))
		// and then to SP dev location
		.pipe(spSave(
			gulpV4ProdConfig.ReturnV4ProdSPSaveCSSOptions(),
			gulpBaseConfig.ReturnGulpSPSaveCredentials(),
		)));
// build style file and push style file to dev
gulp.task('4-prod-build-push-styles', () =>
	// for specified style file
	gulp.src(gulpV4ProdConfig.ReturnV4ProdStylesSrcFile())
		// replace the standard pipe method
		.pipe(plumber())
		// pipe it through webpack
		.pipe(webpackStream(webpackV4ProdConfig), webpack)
		// to the specified style folder
		.pipe(gulp.dest(gulpV4ProdConfig.ReturnV4ProdStylesDistFolder()))
		// and then to SP dev location
		.pipe(spSave(
			gulpV4ProdConfig.ReturnV4ProdSPSaveCSSOptions(),
			gulpBaseConfig.ReturnGulpSPSaveCredentials(),
		)));
// when the specified src style file changes, build dist style file and push it to dev
gulp.task('4-prod-watch-build-push-styles', () => {
	// watch the src style file; upon changes, build dist style file and push it to dev
	gulp.watch([gulpV4ProdConfig.ReturnV4ProdStylesSrcFile()], ['4-prod-push-styles']);
});
// push specified swf api file to dev
gulp.task('4-prod-push-api', () =>
	// for specified dist swf api file
	gulp.src(gulpV4ProdConfig.ReturnV4ProdSWFAPIFile(argv.api))
		// and then to SP dev location
		.pipe(spSave(
			gulpV4ProdConfig.ReturnV4ProdSPSaveSWFAPIOptions(),
			gulpBaseConfig.ReturnGulpSPSaveCredentials(),
		)));
// wait for save and then push specified swf api file to dev
gulp.task('4-prod-wait-push-api', () => {
	setTimeout(
		() =>
			// for specified dist swf api file
			gulp.src(gulpV4ProdConfig.ReturnV4ProdSWFAPIFile(argv.api))
				// and then to SP dev location
				.pipe(spSave(
					gulpV4ProdConfig.ReturnV4ProdSPSaveSWFAPIOptions(),
					gulpBaseConfig.ReturnGulpSPSaveCredentials(),
				))
		, 500,
	);
});
// when the specified swf api file changes, push it to dev
gulp.task('4-prod-watch-push-api', () => {
	// watch the src style file; upon changes, build dist style file and push it to dev
	gulp.watch([gulpV4ProdConfig.ReturnV4ProdSWFAPIFile(argv.api)], ['4-prod-wait-push-api']);
});


// V5 ---

// build dist file
gulp.task('5-dev-build', () =>
	// for all files in the src folder
	gulp.src(`${gulpV5DevConfig.ReturnV5DevSrcFolder()}/**`)
		// replace the standard pipe method
		.pipe(plumber())
		// pipe them through webpack
		.pipe(webpackStream(webpackV5DevConfig), webpack)
		// to the dist folder
		.pipe(gulp.dest(`${gulpV5DevConfig.ReturnV5DevDistFolder()}`)));
// push dist to dev
gulp.task('5-dev-push', () =>
	// for all files in the dist folder
	gulp.src(`${gulpV5DevConfig.ReturnV5DevDistFolder()}/**`)
		// replace the standard pipe method
		.pipe(plumber())
		// pipe them into a caching proxy 
		.pipe(cached('spFiles'))
		// and then to SP dev location
		.pipe(spSave(
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
		.pipe(spSave(
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
		.pipe(spSave(
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
		.pipe(spSave(
			gulpV5ProdConfig.ReturnV5SPSaveProdOptions(), 
			gulpBaseConfig.ReturnGulpSPSaveCredentials(),
		)));
// when src changes, build dist file and push dist to prod
gulp.task('5-watch-build-push-prod', () => {
	// watch the src folder; upon changes, build dist file and push dist to prod
	gulp.watch([`${gulpV5DevConfig.ReturnV5DevSrcFolder()}/**`], ['build-push-prod']);
});
