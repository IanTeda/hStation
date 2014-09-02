'use strict';

angular.module('hStationApp')
  .factory('settingsApi', function ($resource) {

    return $resource('/api/settings/:setting', {
        setting: 'setting'
      },
      {
        update: {
          method: 'PUT',
          params: {}
        }
      }
    );
  });
