/**
 * Requirement:
 * Webpack @^1
 */
var webpack = require('webpack');

module.exports = {
    context: __dirname + "/src",
    entry: {
        main: ['./main.js']
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].bundle.js",
        chunkFilename: "[id].bundle.js",
        publicPath: 'http://localhost:8000/static',
        libraryTarget: "umd"
    },

    plugins: [
      new webpack.ProvidePlugin({
        React: 'react',
        Axios: 'axios',
        $: 'jquery',
        Config: 'app.config'
      }),
      new webpack.NoErrorsPlugin(),
      // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DefinePlugin({
         'process.env': {
             // This has effect on the react lib size
             'NODE_ENV': JSON.stringify('production'),
         }
      }),
      // new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        sourceMap: false
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.DedupePlugin()
    ],

    module: {
      loaders: [
        {test: /\.js$/, loader: 'babel?presets[]=es2015,presets[]=react,presets[]=stage-0,plugins[]=transform-decorators-legacy,plugins[]=react-hot-loader/babel', exclude: /node_modules/},
        {test: /\.css$/, loader: 'babel?plugins[]=react-hot-loader/babel!style!css'},
        {test: /\.json$/, loader: 'json'}
      ]
    },
    resolve: {
      modulesDirectories: ['web_modules', 'node_modules', './', './services', './components'],
      extensions: ['', '.js', '.jsx']
    }
}