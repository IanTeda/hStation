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
  .service('WeatherService', function Temperature(WeatherModel) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return {

      /**
       * Get all documents from the model
       * @param callback
       * @returns {$promise|*}
       */
      index: function (callback) {
        return WeatherModel.index(function (documents) {
          return callback(documents);
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
      create: function (document, callback) {
        var cb = callback || angular.noop;

        return WeatherModel.create(document,
          function (document) {
            return cb(document);
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
      show: function (document_id, callback) {
        var cb = callback || angular.noop;

        return WeatherModel.show({ id: document_id },
          function (document) {
            return cb(document);
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
        var document_id = '0';

        return WeatherModel.show({ id: document_id },
          function (document) {
            return cb(document);
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
      update: function (document, callback) {
        var cb = callback || angular.noop;

        return WeatherModel.update({id: document._id}, document,
          function (document) {
            return cb(document);
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
      delete: function (document, callback) {
        var cb = callback || angular.noop;

        return WeatherModel.delete({id: document._id},
          function (document) {
            return cb(document);
          },
          function (err) {
            return cb(err);
          }).$promise;
      }

    };
  });