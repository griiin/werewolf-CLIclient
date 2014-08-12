define(['lodash',
'q',
'log',
'rl',
'server'],
function (_, Q, log, rl, server) {
  var _socket;

  var serverListenner = function () {

  };

  serverListenner.prototype.listen = function () {
    _socket = server.getSocket();
    displayPrompt();
  };

  function displayPrompt() {
    rl.question(">", function (input) {
      if (input === "quit") {
        log.quit();
        rl.close();
        _socket.disconnect();
      } else {
        displayPrompt();
      }
    });
  }

  // return singleton
  var instance;
  return (function () {
    if (!instance) {
      instance = new serverListenner();
    }
    return instance;
  })();
});
