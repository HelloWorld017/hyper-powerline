const fs = require('fs');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
	entry: path.join(__dirname, 'src/index.js'),
	devtool: 'source-map',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'index.js',
		library: 'hyperPowerline',
		libraryTarget: 'umd',
		umdNamedDefine: true
	},

	module: {
		rules: [
			{
				test: /(\.js)$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}
		]
	},
	target: 'node',
	externals: [nodeExternals()]
};
