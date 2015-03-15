'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('settings.serialport', {
        url: '/settings/serialport',
        templateUrl: 'app/settings/serialport/serialport.html',
        controller: 'SettingsSerialPortCtrl'
      });
  });
