'use strict';

angular.module('hStationApp')
  .controller('SettingsCtrl', function ($scope, $http, socket, SettingsService) {

    //console.log('SettingsCtrl2');

    $scope.settings = [];

    // Request JSON from server end point
    $http.get('/api/settings').success(function(settings) {
      $scope.settings = settings;
      socket.syncUpdates('settings', $scope.settings);
    });

    // Request JSON from server end point
    $http.get('/api/serialport').success(function(serialports) {
      $scope.serialports = serialports;
    });

    // When serial port select is changed update setting document
    $scope.serialportSelected = function() {

      // Update settings scope with new serial port selection
      $scope.settings[0].serialport = $scope.selectedSerialPort.comName;

      // Update settings document
      SettingsService.update($scope.settings[0]);

    };

  });
