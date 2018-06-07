
// eslint-disable-next-line
const webpack = require('webpack');
// eslint-disable-next-line
const merge = require('webpack-merge');
// eslint-disable-next-line
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const baseConfig = require('./base.config.js');
const path = require('path');

module.exports = merge(baseConfig, {
	devtool: 'source-map',
	entry: {
		vendor: [
			'axios',
			'office-ui-fabric-react',
			'react',
			'react-accessible-accordion',
			'react-dom',
			'react-dropzone',
			'react-js-pagination',
			'react-modal',
			'react-responsive',
			'react-responsive-modal',
			'react-scroll',
			'react-stickynode',
			'react-truncate',
			'sp-pnp-js',
			'moment',
		],
		app: './hub.1.0.5/src/components/HcContainer/HcContainer.js',
	},
	output: {
		path: path.join(__dirname, '../hub.1.0.5/dist'),
		filename: 'mos.1.0.5.[name].js',
	},
	module: {
		loaders: [
			{
				include: path.join(__dirname, '../hub.1.0.5/src'),
				test: /\.js$/,
				loader: 'babel-loader',
			}, {
				include: path.join(__dirname, '../hub.1.0.5/src'),
				test: /\.sass$/,
				loader: 'style-loader!css-loader!postcss-loader!sass-loader',
			}, {
				include: path.join(__dirname, '../hub.1.0.5/src'),
				test: /\.(jpg|png)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'img/',
						publicPath: 'img/',
					},
				},
			},
			{
				test: /\.(ttf|eot|woff|woff2)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: 'fonts/[name].[ext]',
					},
				},
			},
		],
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			output: {
				comments: false,
			},
			include: path.join(__dirname, '../hub.1.0.5/src'),
			test: /\.js$/,
			uglifyOptions: {
				ecma: 5,
				compress: true,
				toplevel: true,
			},
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity,
		}),
	],
});
