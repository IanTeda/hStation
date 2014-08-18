'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/settings/settings.html',
        controller: 'SettingsCtrl',
      })
      .state('log', {
        url: '/settings/log',
        templateUrl: 'app/settings/log/log.html',
        controller: 'LogCtrl',
      });
  });