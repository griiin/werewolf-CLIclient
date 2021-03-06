define(['lodash',
'q',
'log',
'rl',
'server'],
function (_, Q, log, rl, server) {
  var _username;
  var _password;
  var _email;
  var _gender;

  var cmd = function (data) {
    var deferred = Q.defer();

    askUsername()
    .then(askPassword)
    .then(signIn)
    .then(function () {
      deferred.resolve();
    })

    return deferred.promise;
  };

  function askUsername() {
    var deferred = Q.defer();

    rl.ask("Pick a username: ", function (input) {
      _username = input;
      deferred.resolve();
    });

    return deferred.promise;
  }

  function askPassword() {
    var deferred = Q.defer();

    rl.ask("Pick a password: ", function (input) {
      _password = input;
      deferred.resolve();
    });

    return deferred.promise;
  }

  function signIn() {
    var deferred = Q.defer();

    server.getSocket().on("sign_in_response", function (response) {
      if (response.result) {
        log.info("You're logged in.");
      } else {
        log.info("Incorrect data!");
      }
      deferred.resolve();
    });
    server.getSocket().emit("sign_in", {
      username: _username,
      password: _password
    });

    return deferred.promise;
  }

  return cmd;
});
