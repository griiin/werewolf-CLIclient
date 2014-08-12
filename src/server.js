define(['lodash',
'q',
'log',
'localStorage',
'rl',
'socket.io-client'],
function (_, Q, log, localStorage, rl, socketIO) {
  var _serverUrl;
  var _serverPort;
  var _socket;

  var serverConnecter = function () {

  };

  serverConnecter.prototype.getSocket = function () {
    return _socket;
  };

  serverConnecter.prototype.connectAsync = function () {
    var deferred = Q.defer();

    getServerUrlAsync()
    .then(getServerPortAsync)
    .then(connect)
    .then(saveServerUrlAsync)
    .then(saveServerPortAsync)
    .then(function () {
      deferred.resolve();
    });

    return deferred.promise;
  };

  function connect() {
    var deferred = Q.defer();

    var addr = _serverUrl + ":" + _serverPort;
    log.info('Connection to "' + addr + '" server...');
    _socket = socketIO.connect(addr, {
      'reconnection delay' : 0,
      'reopen delay' : 0,
      'force new connection' : true
    });
    _socket.on("connect", function () {
      log.info("Done!");
      return deferred.resolve();
    });

    return deferred.promise;
  }

  function saveServerUrlAsync() {
    var deferred = Q.defer();

    localStorage.saveAsync("serverUrl", _serverUrl)
    .then(function () {
      deferred.resolve();
    })
    .done();

    return deferred.promise;
  }

  function saveServerPortAsync() {
    var deferred = Q.defer();

    localStorage.saveAsync("serverPort", _serverPort)
    .then(function () {
      deferred.resolve();
    })
    .done();

    return deferred.promise;
  }

  function getServerPortAsync() {
    var deferred = Q.defer();

    localStorage.getAsync("serverPort")
    .then(askServerPortAsync)
    .then(function () {
      deferred.resolve();
    })

    return deferred.promise;
  }

  function askServerPortAsync(value) {
    var deferred = Q.defer();

    if (!value) {
      rl.question("What is the server port? [4242]", function (input) {
        if (!input || input.length === 0) {
          _serverPort = '4242';
        } else {
          _serverPort = input;
        }
        deferred.resolve();
      });
    } else {
      _serverPort = value;
      deferred.resolve();
    }

    return deferred.promise;
  }

  function getServerUrlAsync() {
    var deferred = Q.defer();

    localStorage.getAsync("serverUrl")
    .then(askServerUrlAsync)
    .then(function () {
      deferred.resolve();
    });

    return deferred.promise;
  }

  function askServerUrlAsync(value) {
    var deferred = Q.defer();

    if (!value) {
      rl.question("What is the server url? [http://localhost]", function (input) {
        if (!input || input.length === 0) {
          _serverUrl = 'http://localhost';
        } else {
          _serverUrl = input;
        }
        deferred.resolve();
      });
    } else {
      _serverUrl = value;
      deferred.resolve();
    }

    return deferred.promise;
  }

  // return singleton
  var instance;
  return (function () {
    if (!instance) {
      instance = new serverConnecter();
    }
    return instance;
  })();
});
