'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('settings.app', {
        views: {
          'main': {
            templateUrl: 'app/settings/app/app.html',
            controller: 'SettingsAppCtrl'
          }
        }
      });
  });
