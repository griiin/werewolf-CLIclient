var requirejs = require('requirejs');

requirejs.config({
  //Pass the top-level main.js/index.js require
  //function to requirejs so that node modules
  //are loaded relative to the top-level JS file.
  nodeRequire: require,
  baseUrl: './src/.'
});

requirejs([
  'lodash',
  'Q',
  'localStorage'
  ],
  function (_, Q, localStorage) {
    localStorage.getAsync("username")
    .then (function (username) {
      console.log(username);
      if (!username) {
        localStorage.saveAsync("username", "paul_napolini");
      }
    })
  });
