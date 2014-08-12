define(['readline'],
function (readline) {


  // return singleton
  var instance;
  return (function () {
    if (!instance) {
      instance = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
    }
    return instance;
  })();
});
