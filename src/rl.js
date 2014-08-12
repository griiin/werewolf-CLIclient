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
      // instance.ask = function (query, cb) {
      //   instance.question(query, cb);
      // }

      process.stdin.setEncoding('utf8');
      instance = {};
      process.stdin.on('readable', function() {
        var chunk = process.stdin.read();
        if (chunk !== null) {
          chunk = chunk.slice(0, chunk.length - 1);
          if (instance.toCb)
          instance.toCb(chunk);
        }
      });
      instance.ask = function (query, cb) {
        process.stdout.write(query.grey);
        instance.toCb = cb;
      };
      instance.close = function () {
        process.stdin.end();
      };
    }
    return instance;
  })();
});
