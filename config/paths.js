var path = require('path')
var goalFilePath = "src";
var outPut = "dist";


function resolve(dir) {
  return path.join(__dirname, `../${goalFilePath}/`, dir)
}

var paths = {
  src: resolve(''),
  assets: resolve('assets'),
  components: resolve('components'),
  containers: resolve('containers'),
  pages: resolve('pages'),
  public: resolve('public'),
  router: resolve('router'),
  store: resolve('store'),
  yutils: resolve('utils'),
  static: path.join(__dirname, '../static'),
  node: path.join(__dirname, '../node_modules'),
}
paths[outPut] = path.join(__dirname, `../${outPut}`);
module.exports = function (key) {
  return paths[key] || paths.src;
}
