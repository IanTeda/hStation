'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('settings.log', {
        url: '/settings/log',
        templateUrl: 'app/settings/log/log.html',
        controller: 'SettingsLogCtrl'
      });
  });
