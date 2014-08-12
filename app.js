var requirejs = require('requirejs');

requirejs.config({
  nodeRequire: require,
  baseUrl: './src'
});

requirejs(['lodash',
'q',
'log',
'server'],
function (_, Q, log, server) {
  log.welcome();
  server.connectAsync()
  .then(function () {
    console.log("done");
  });
  // server.listen();
});
