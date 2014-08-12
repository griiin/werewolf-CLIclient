define(['lodash',
'q',
'log',
'serverConnecter'],
function (_, Q, log, serverConnecter) {
  var _socket;

  var server = function () {

  };

  server.prototype.connectAsync = function () {
    var deferred = Q.defer();

    serverConnecter.connectAsync()
    .then(function () {
      _socket = serverConnecter.getSocket();
      deferred.resolve();
    });

    return deferred.promise;
  };

  server.prototype.listen


  // return singleton
  var instance;
  return (function () {
    if (!instance) {
      instance = new server();
    }
    return instance;
  })();
});
