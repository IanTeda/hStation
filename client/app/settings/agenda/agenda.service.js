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
  .service('AgendaService', function Temperature(AgendaModel) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return {

      /**
       * Get all documents from the model
       * @param callback
       * @returns {$promise|*}
       */
      index: function (callback) {
        return AgendaModel.index(function (agendas) {
          return callback(agendas);
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
      create: function (agenda, callback) {
        var cb = callback || angular.noop;

        return AgendaModel.create(agenda,
          function (agenda) {
            return cb(agenda);
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
      show: function (agenda_id, callback) {
        var cb = callback || angular.noop;

        return AgendaModel.show({ id: agenda_id },
          function (agenda) {
            return cb(agenda);
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
      update: function (agenda, callback) {
        var cb = callback || angular.noop;

        return AgendaModel.update({id: agenda._id}, agenda,
          function (agenda) {
            return cb(agenda);
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
      delete: function (agenda, callback) {
        var cb = callback || angular.noop;

        return AgendaModel.delete({id: agenda._id},
          function (agenda) {
            return cb(agenda);
          },
          function (err) {
            return cb(err);
          }).$promise;
      }

    };
  });