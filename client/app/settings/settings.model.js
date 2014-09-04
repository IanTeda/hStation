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
  .factory('SettingsModel', function ($resource) {

    return $resource('/api/settings/:id', {
        id: '@_id'
      }, {
        index: {
          method: 'GET',
          isArray: true
        },
        update: {
          method: 'PUT',
          params: {}
        }
      }
    );
  });
