var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
var baseWebpackConfig = require('./webpack.base.conf');
var paths = require('./paths');
var goalFilePath = "src";

module.exports = function (config) {
  var webpackConfig = merge(baseWebpackConfig, {
    entry: {
      main: `./${goalFilePath}/main.js`,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: [paths(`${goalFilePath}`)],
          loader: 'babel-loader',
          options: {
            compact: true,
          },
        },
        {
          test: /\.css$/,
          include: [paths('assets'), paths('node')],
          use: ExtractTextPlugin.extract(
            Object.assign({
              fallback: {
                loader: 'style-loader',
                options: {
                  hmr: false,
                },
              },
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    modules: false,
                    localIdentName: '[local]--[hash:base64:5]',
                    importLoaders: 1,
                    minimize: true,
                    sourceMap: true,
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: false
                  }
                }
              ]
            })
          )
        },
        {
          test: /\.css$/,
          include: [paths(`${goalFilePath}`)],
          exclude: [paths('assets')],
          use: ExtractTextPlugin.extract(
            Object.assign({
              fallback: {
                loader: 'style-loader',
                options: {
                  hmr: false,
                },
              },
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                    localIdentName: '[local]--[hash:base64:5]',
                    importLoaders: 1,
                    minimize: true,
                    sourceMap: true,
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    ident: 'postcss',
                    sourceMap: false
                  }
                }
              ]
            })
          )
        }
      ]
    },
    devtool: config.productionSourceMap ? '#source-map' : false,
    output: {
      publicPath: config.assetsPublicPath,
      filename: config.env == '"production"' || config.env == '"pre"' ? 'js/[name]-[chunkhash:8].js' : 'js/[name].js',
      chunkFilename: config.env == '"production"' || config.env == '"pre"' ? 'js/chunk/[name]-[id]-[chunkhash:8].js' : 'js/chunk/[name]-[id].js'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': config.env,
        'process.env.HOST': config.host,
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        sourceMap: config.productionSourceMap
      }),
      // extract css into its own file
      new ExtractTextPlugin({
        filename: config.env == '"production"' || config.env == '"pre"' ? 'css/[name]-[chunkhash:4][hash:4].css' : 'css/[name].css',
        allChunks: true
      }),
      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different components can be deduped.
      new OptimizeCSSPlugin({
        cssProcessorOptions: {
          safe: true
        }
      }),
      // split vendor js into its own file
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module, count) {
          // any required modules inside node_modules are extracted to vendor
          return (
            module.resource &&
            /\.js$/.test(module.resource) &&
            module.resource.indexOf(
              path.join(__dirname, '../node_modules/@diworkfe/public-components/build/utils')
            ) === 0
          )
        }
      }),
      // extract webpack runtime and module manifest to its own file in order to
      // prevent vendor hash from being updated whenever app bundle is updated
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        chunks: ['vendor']
      })
    ]
  })

  if (config.gzip) {
    var CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
      new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' +
          config.gzipExtensions.join('|') +
          ')$'
        ),
        threshold: 10240,
        minRatio: 0.8
      })
    )
  }

  if (config.bundleAnalyzerReport) {
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
  }
  return webpackConfig
}
