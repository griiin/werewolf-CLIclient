define(['lodash',
'colors'],
function (_, colors) {
  var log = function () {

  };

  log.prototype.welcome = function () {
    var str;
    str  = " _     _  _______  ______    _______  _     _  _______  ___      _______ \n";
    str += "| | _ | ||       ||    _ |  |       || | _ | ||       ||   |    |       |\n";
    str += "| || || ||    ___||   | ||  |    ___|| || || ||   _   ||   |    |    ___|\n";
    str += "|       ||   |___ |   |_||_ |   |___ |       ||  | |  ||   |    |   |___ \n";
    str += "|       ||    ___||    __  ||    ___||       ||  |_|  ||   |___ |    ___|\n";
    str += "|   _   ||   |___ |   |  | ||   |___ |   _   ||       ||       ||   |    \n";
    str += "|__| |__||_______||___|  |_||_______||__| |__||_______||_______||___|    \n";
    str += "Welcome to Werewolf CLI client !!    \n";

    console.log(colors.red(str));
  };

  log.prototype.info = function () {
    coloredLog(colors.grey, arguments);
  };

  log.prototype.input = function () {
    coloredLog(colors.cyan, arguments);
  };

  log.prototype.debug = function () {
    var args = Array.prototype.slice.call(arguments, 0);
    args.unshift("[debug]".cyan);
    console.log.apply(this, args);
  };

  function coloredLog (color, arguments) {
    var coloredArgs = _.map(arguments, function (arg) {
      coloredArg = color(arg);
      return coloredArg;
    });
    logIt(coloredArgs);
  }

  function logIt(args) {
    console.log.apply(this, args);
  };

  // return singleton
  var instance;
  return (function () {
    if (!instance) {
      instance = new log();
    }
    return instance;
  })();
});
