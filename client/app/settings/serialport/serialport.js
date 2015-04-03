'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('settings.serialport', {
        views: {
          'main': {
            templateUrl: 'app/settings/serialport/serialport.html',
            controller: 'SettingsSerialPortCtrl'
          }
        }
      });
  });
