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
  .factory('TemperatureModel', function ($resource) {

    return $resource('/api/temperature/:id', {
        id: '@_id'
      }, {
        index : {
          method: 'GET',
          isArray: true
        },
        create : {
          method: 'POST',
          params: {}
        },
        show: {
          method: 'GET',
          params: {}
        },
        update: {
          method: 'PUT',
          params: {}
        },
        destroy: {
          method: 'DELETE'
        }
      }
    );
  });