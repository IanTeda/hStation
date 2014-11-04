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
  .service('PressureService', function Temperature(PressureModel) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return {

      /**
       * Get all documents from the model
       * @param callback
       * @returns {$promise|*}
       */
      index: function (callback) {
        return PressureModel.index(function (pressures) {
          return callback(pressures);
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
      create: function (pressure, callback) {
        var cb = callback || angular.noop;

        return PressureModel.create(pressure,
          function (pressure) {
            return cb(pressure);
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
      show: function (pressure_id, callback) {
        var cb = callback || angular.noop;

        return PressureModel.show({ id: pressure_id },
          function (pressure) {
            return cb(pressure);
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
        var pressure_id = '0';

        return PressureModel.show({ id: pressure_id },
          function (pressure) {
            return cb(pressure);
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
      update: function (pressure, callback) {
        var cb = callback || angular.noop;

        return PressureModel.update({id: pressure._id}, pressure,
          function (pressure) {
            return cb(pressure);
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
      delete: function (pressure, callback) {
        var cb = callback || angular.noop;

        return PressureModel.delete({id: pressure._id},
          function (pressure) {
            return cb(pressure);
          },
          function (err) {
            return cb(err);
          }).$promise;
      }

    };
  });