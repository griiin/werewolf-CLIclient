define(['lodash',
'q',
'log',
'rl',
'fs',
'server'],
function (_, Q, log, rl, fs, server) {
  var _socket;
  var _data;

  var serverListenner = function () {

  };

  serverListenner.prototype.listen = function () {
    _socket = server.getSocket();
    displayPrompt();
  };

  function displayPrompt () {
    rl.ask(">", function (input) {
      if (input === "quit") {
        quit();
      } else {
        parseCmdAsync(input)
        .then(function () {
          displayPrompt();
        });
      }
    });

    function parseCmdAsync (input) {
      var deferred = Q.defer();

      path = './src/commands/' + input + '.js';
      if (fs.existsSync(path)) {
        require('commands/' + input)(_data)
        .then(function () {
          deferred.resolve();
        })
      } else {
        log.info("Command not found.");
        deferred.resolve();
      }

      return deferred.promise;
    }

    function quit () {
      rl.close();
      _socket.disconnect();
    }
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
