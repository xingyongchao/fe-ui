var api = [
	'/history/list',            // 历史记录
	'/menubar/getAllLight/v2'
]

var rapApi = [
  // '/menubar/getAllLight/v2',     //大菜单
];



function makeRapConfig(key) {
  var config = {
    target: 'https://mock.yonyoucloud.com',
    changeOrigin: true,
    pathRewrite: function (path, req) {
      return `/mock/370${key}`;
    }
  };
  return config
}


function makeStaticConfig(key) {
  var config = {
    target: 'http://localhost:3000/static',
    pathRewrite: function (path, req) {
      return key + '.json';
    }
  };
  return config;
}

function addApi() {
  var obj = {};
  var options = Array.prototype.slice.call(arguments, 0);
  options.forEach(function (options) {
    var makeConfig = options[0]
    var apis = options[1]
    apis.forEach(function (api) {
      obj[api] = makeConfig(api)
    })
  })
  return obj;
}

module.exports = addApi([makeStaticConfig, api], [makeRapConfig, rapApi], )
