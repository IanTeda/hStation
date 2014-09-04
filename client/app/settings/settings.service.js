'use strict';

/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

angular.module('hStationApp')
  .factory('SettingsService', function Settings(SettingsModel) {

    // AngularJS will instantiate a singleton by calling "new" on this function
    return {

      /**
       * Return all values
       * @param callback
       * @returns {$promise|*}
       */
      index: function(callback) {
        return SettingsModel.index( function(settings) {
          return callback(settings);
        }, function(err) {
          return callback(err);
        }).$promise;
      },

      /**
       * Update row
       * @param setting
       * @param callback
       * @returns {$promise|*}
       */
      update: function(setting, callback) {
        var cb = callback || angular.noop;

        return SettingsModel.update({id:setting._id}, setting,
          function(setting) {
            return cb(setting);
          },
          function(err) {
            return cb(err);
          }).$promise;
      }
    }
  });
