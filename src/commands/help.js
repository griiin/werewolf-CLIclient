define(['lodash',
'q',
'log',
'rl',
'server'],
function (_, Q, log, rl, server) {
  return function (data) {
    var deferred = Q.defer();

    log.info("help        => Display all available cmds");
    log.info("sign_in     => Sign in");
    deferred.resolve();

    return deferred.promise;
  };
});
