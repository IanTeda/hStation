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
  .service('DewpointService', function Temperature(DewpointModel) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return {

      /**
       * Get all documents from the model
       * @param callback
       * @returns {$promise|*}
       */
      index: function (callback) {
        return DewpointModel.index(function (dewpoints) {
          return callback(dewpoints);
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
      create: function (dewpoint, callback) {
        var cb = callback || angular.noop;

        return DewpointModel.create(dewpoint,
          function (dewpoint) {
            return cb(dewpoint);
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
      show: function (dewpoint_id, callback) {
        var cb = callback || angular.noop;

        return DewpointModel.show({ id: dewpoint_id },
          function (dewpoint) {
            return cb(dewpoint);
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
      update: function (dewpoint, callback) {
        var cb = callback || angular.noop;

        return DewpointModel.update({id: dewpoint._id}, dewpoint,
          function (dewpoint) {
            return cb(dewpoint);
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
      delete: function (dewpoint, callback) {
        var cb = callback || angular.noop;

        return DewpointModel.delete({id: dewpoint._id},
          function (dewpoint) {
            return cb(dewpoint);
          },
          function (err) {
            return cb(err);
          }).$promise;
      }

    };
  });