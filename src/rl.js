define(['readline',
'colors'],
function (readline, colors) {


  // return singleton
  var instance;
  return (function () {
    if (!instance) {
      // instance = readline.createInterface({
      //   input: process.stdin,
      //   output: process.stdout
      // });
      process.stdin.setEncoding('utf8');
      instance = {};
      instance.ask = function (query, cb) {
        process.stdin.write(query.grey);
        process.stdin.on('readable', function() {
          var chunk = process.stdin.read();
          if (chunk !== null) {
            chunk = chunk.slice(0, chunk.length - 1);
            cb(chunk);
          }
        });
      };
      instance.close = function () {
        process.stdin.end();
      };
    }
    return instance;
  })();
});
