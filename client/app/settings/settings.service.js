'use strict';

angular.module('hStationApp')
  .factory('SettingsService', function Settings(settingsApi) {

    // AngularJS will instantiate a singleton by calling "new" on this function
    return {

      setting: function (key, value, callback) {
        var cb = callback || angular.noop;

        return settingsApi.update({setting:key}, value,
          function (value) {
            return cb(value);
          }, function (error) {
            return cb(error);
          }
        ).$promise;
      }

    }
  });
