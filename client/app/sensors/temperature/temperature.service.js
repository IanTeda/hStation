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
  .service('TemperatureService', function Temperature(TemperatureModel) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return {

      /**
       * Get all documents from the model
       * @param callback
       * @returns {$promise|*}
       */
      index: function (callback) {
        return TemperatureModel.index(function (temperatures) {
          return callback(temperatures);
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
      create: function (temperature, callback) {
        var cb = callback || angular.noop;

        return TemperatureModel.create(temperature,
          function (temperature) {
            return cb(temperature);
          },
          function (err) {
            return cb(err);
          }).$promise;
      },

      /**
       * Get a particular document from the model
       * @param temperature_id
       * @param callback
       * @returns {*}
       */
      show: function (temperature_id, callback) {
        var cb = callback || angular.noop;

        return TemperatureModel.show({ id: temperature_id },
          function (temperature) {
            return cb(temperature);
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
      update: function (temperature, callback) {
        var cb = callback || angular.noop;

        return TemperatureModel.update({id: temperature._id}, temperature,
          function (temperature) {
            return cb(temperature);
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
      delete: function (temperature, callback) {
        var cb = callback || angular.noop;

        return TemperatureModel.delete({id: temperature._id},
          function (temperature) {
            return cb(temperature);
          },
          function (err) {
            return cb(err);
          }).$promise;
      }

    };
  });