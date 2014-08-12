define(['lodash',
'q',
'log'],
function (_, Q, log) {
  var _socket;
  var _cmds = [
    { name: "sign_up_response", handler: basicHandler },
    { name: "sign_in_response", handler: basicHandler },
    { name: "list_games_response", handler: basicHandler },
    { name: "create_game_response", handler: basicHandler },
    { name: "list_roles_response", handler: basicHandler },
    { name: "join_game_response", handler: basicHandler },
    { name: "leave_game_response", handler: basicHandler },
    { name: "cityhall_start", handler: basicHandler },
    { name: "new_player", handler: basicHandler },
    { name: "player_left", handler: basicHandler },
    { name: "cityhall_stop", handler: basicHandler },
    { name: "vote_response", handler: basicHandler },
    { name: "msg", handler: basicHandler },
    { name: "end_game", handler: basicHandler },
    { name: "your_role", handler: basicHandler }
  ];

  var serverListenner = function () {

  };

  serverListenner.prototype.listen = function (socket) {
    _socket = socket;

    _(_cmds).forEach(function (cmd) {
      _socket.on(cmd.name, cmd.handler);
    });
  };

  function basicHandler(data) {
    log.input("Form server =>", data);
  }

  // return singleton
  var instance;
  return (function () {
    if (!instance) {
      instance = new serverListenner();
    }
    return instance;
  })();
});
