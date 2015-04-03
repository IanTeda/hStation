'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('settings.log', {
        views: {
          'main': {
            templateUrl: 'app/settings/log/log.html',
            controller: 'SettingsLogCtrl'
          }
        }
      });
  });
