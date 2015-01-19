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
  .factory('WeatherLast24HrsModel', function ($resource) {

    return $resource('/api/weathers/last24hrs/:sensor', {
        sensor: 'sensor'
      }, {
        index : {
          method: 'GET',
          isArray: true
        }
      }
    );
  });
