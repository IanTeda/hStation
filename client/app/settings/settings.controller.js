'use strict';

angular.module('hStationApp')
  .controller('SettingsCtrl', function ($scope, $http, SettingsService) {

    // Request JSON from server end point
    $http.get('/api/settings').success(function(setttings) {
      $scope.settings = settings;
    });

    // Request JSON from server end point
    $http.get('/api/serialport').success(function(serialports) {
      $scope.serialports = serialports;
    });

    // When serial port select is changed save to database
    $scope.serialportSelected = function(selectedSerialPort) {
      SettingsService.setting('serialport', selectedSerialPort);
    };

  });
