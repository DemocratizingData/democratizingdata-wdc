const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
module.exports = {
	entry: './wdc/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'wdc/index.html'
		}),
		new CopyPlugin({
			patterns: [
				"wdc/tableSchema.json"
			]
		}),
	],
};
