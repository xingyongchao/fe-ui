var paths = require('./paths');
const goalFilePath = "src";
var outPut = "dist";
module.exports = {
  entry: {
    'polyfill': `./${goalFilePath}/objectAssignPolyfill.js`,
  },
  output: {
    path: paths(outPut),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': paths(`${goalFilePath}`),
      'assets': paths('assets'),
      'components': paths('components'),
      'containers': paths('containers'),
      'pages': paths('pages'),
      'public': paths('public'),
      'router': paths('router'),
      'store': paths('store'),
      'yutils': paths('yutils'),
      'bee': '@diworkfe/public-components/build/bee-adapter',
      'bee-adapter': '@diworkfe/public-components/build/bee-adapter',
      '@u': '@diworkfe/public-components/build/utils',
      'pub-comp': '@diworkfe/public-components/build',
    }
  },
  externals: {
    // IM: {
    //   type: 'var',
    //   var: 'typeof InitEsnIM === "undefined" ? function(){console.log("IM load fail")} : InitEsnIM',
    // },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [paths(`${goalFilePath}`)],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name]-[hash:8].[ext]'
        }
      },
      {
        test: /\.(woff2?|woff|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'font/[name]-[hash:8].[ext]'
        }
      }
    ]
  }
}
