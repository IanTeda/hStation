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
  .service('HumidityService', function Temperature(HumidityModel) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return {

      /**
       * Get all documents from the model
       * @param callback
       * @returns {$promise|*}
       */
      index: function (callback) {
        return HumidityModel.index(function (humiditys) {
          return callback(humiditys);
        }, function (err) {
          return callback(err);
        }).$promise;
      },

      /**
       * Create a new document in the model
       * @param setting
       * @param callback
       * @returns {*}
       */
      create: function (humidity, callback) {
        var cb = callback || angular.noop;

        return HumidityModel.create(humidity,
          function (humidity) {
            return cb(humidity);
          },
          function (err) {
            return cb(err);
          }).$promise;
      },

      /**
       * Get a particular document from the model
       * @param pressure_id
       * @param callback
       * @returns {*}
       */
      show: function (humidity_id, callback) {
        var cb = callback || angular.noop;

        return HumidityModel.show({ id: humidity_id },
          function (humidity) {
            return cb(humidity);
          },
          function (err) {
            return cb(err);
          }).$promise;
      },

      /**
       * Get the latest document from the model
       * @param pressure_id
       * @param callback
       * @returns {*}
       */
      latest: function (callback) {
        var cb = callback || angular.noop;

        // 0 will return the latest document
        var humidity_id = '0';

        return HumidityModel.show({ id: humidity_id },
          function (humidity) {
            return cb(humidity);
          },
          function (err) {
            return cb(err);
          }).$promise;
      },

      /**
       * Update a particular document from the model
       * @param temperature
       * @param callback
       * @returns {$promise|*}
       */
      update: function (humidity, callback) {
        var cb = callback || angular.noop;

        return HumidityModel.update({id: humidity._id}, humidity,
          function (humidity) {
            return cb(humidity);
          },
          function (err) {
            return cb(err);
          }).$promise;
      },

      /**
       * Delete a particular document from the model
       * @param temperature
       * @param callback
       * @returns {*}
       */
      delete: function (humidity, callback) {
        var cb = callback || angular.noop;

        return HumidityModel.delete({id: humidity._id},
          function (humidity) {
            return cb(humidity);
          },
          function (err) {
            return cb(err);
          }).$promise;
      }

    };
  });