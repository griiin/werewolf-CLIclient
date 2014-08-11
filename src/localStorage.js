define([
  'lodash',
  'q',
  'fs'
  ], function (_, Q, fs) {
    var FOLDER_PATH = './.storage';
    var FILE_PATH = FOLDER_PATH + '/localStorage.json';
    var _folderCreated = false;

    var localStorage = function () {

    };

    localStorage.prototype.saveAsync = function (key, value) {
      var deferred = Q.defer();

      deserializeAsync()
      .then(function (data) {
        data[key] = value;

        return data;
      })
      .then(serializeAsync)
      .then(function (newData) {
        deferred.resolve(newData);
      });

      return deferred.promise;
    };

    localStorage.prototype.getAsync = function (key) {
      var deferred = Q.defer();
      
      deserializeAsync()
      .then(function (data) {
        deferred.resolve(data[key]);
      });

      return deferred.promise;
    };

    function initFolderAsync () {
      var deferred = Q.defer();

      if (!_folderCreated) {
        fs.mkdir(FOLDER_PATH, function (err) {
          if (err && err.code !== 'EEXIST') {
            throw "Fatal error: Can't create local storage folder";
          }
          deferred.resolve();
        });
      } else {
        deferred.resolve();
      }

      return deferred.promise;
    }

    function readFileAsync () {
      var deferred = Q.defer();

      initFolderAsync()
      .then(function () {
        fs.readFile(FILE_PATH, 'utf8', function (err, data) {
          if (err && err.code !== 'ENOENT') {
            throw "Fatal error: Can't read local storage file";
          }
          deferred.resolve(data);
        });
      });

      return deferred.promise;
    }

    function writeFileAsync (data) {
      var deferred = Q.defer();

      initFolderAsync()
      .then(function () {
        fs.writeFile(FILE_PATH, data, function (err) {
          if (err) {
            throw "Fatal error: Can't write in local storage file";
          }
        });
      });

      return deferred.promise;
    }

    function serializeAsync (data) {
      var deferred = Q.defer();

      var stringifiedData = JSON.stringify(data);
      writeFileAsync(stringifiedData)
      .then(function () {
        deferred.resolve(stringifiedData);
      });

      return deferred.promise;
    }

    function deserializeAsync () {
      var deferred = Q.defer();

      readFileAsync()
      .then(function (rawData) {
        var data;
        try {
          data = !rawData ? {} : JSON.parse(rawData);
        } catch (e) {
          throw "Fatal error: Can't deserialize local storage file";
        }
        deferred.resolve(data);
      });

      return deferred.promise;
    }

    // return singleton
    var instance;
    return (function () {
      if (!instance) {
        instance = new localStorage();
      }
      return instance;
    })();
  });
