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
  // .then(server.listen)
  // .then(client.listen);
  // server.listen();
  .then(function () {
    log.info("Done");
  })
});
