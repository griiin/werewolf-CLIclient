define(['lodash',
'q',
'log',
'serverConnecter',
'serverListenner'],
function (_, Q, log, serverConnecter, serverListenner) {
  var _isConnected = false;

  var server = function () {

  };

  server.prototype.connectAsync = function () {
    var deferred = Q.defer();

    serverConnecter.connectAsync()
    .then(function () {
      _isConnected = true;
      deferred.resolve();
    });

    return deferred.promise;
  };

  server.prototype.getSocket = function () {
    return serverConnecter.getSocket();
  };

  server.prototype.listen = function () {
    if (!_isConnected) {
      throw "Fatal error: Can't listen server input if not connected";
    }
    var socket = serverConnecter.getSocket();
    serverListenner.listen(socket);
  };

  // return singleton
  var instance;
  return (function () {
    if (!instance) {
      instance = new server();
    }
    return instance;
  })();
});
