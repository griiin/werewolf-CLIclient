var requirejs = require('requirejs');

requirejs.config({
  nodeRequire: require,
  baseUrl: './src'
});

requirejs(['lodash',
'q',
'log',
'server',
'client'],
function (_, Q, log, server, client) {
  log.welcome();
  server.connectAsync()
  .then(server.listen)
  .then(client.listen);
});
