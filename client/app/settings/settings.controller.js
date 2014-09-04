'use strict';

angular.module('hStationApp')
  .controller('SettingsCtrl', function ($scope, $http, socket, SettingsService) {

    $scope.settings = [];

    // Use service to retrieve all settings, which is only one in this case
    SettingsService.index( function(settings) {
      $scope.settings = settings;
      socket.syncUpdates('settings', $scope.settings);
      //console.log('SettingsService.index: ' + JSON.stringify($scope.settings));
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
