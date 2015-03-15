'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('settings.app', {
        url: '/settings/app',
        templateUrl: 'app/settings/app/app.html',
        controller: 'SettingsAppCtrl'
      });
  });
