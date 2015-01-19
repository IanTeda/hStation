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
  .factory('WeatherLatestModel', function ($resource) {

    return $resource('/api/weathers/latest', {
      }, {
        index : {
          method: 'GET',
          isArray: false
        }
      }
    );
  });
