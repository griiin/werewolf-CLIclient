define(['lodash',
'q',
'log',
'rl',
'server'],
function (_, Q, log, rl, server) {
  return function (data) {
    var deferred = Q.defer();

    log.info("=[");
    deferred.resolve();

    return deferred.promise;
  };
});
