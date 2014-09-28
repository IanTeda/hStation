'use strict';

angular.module('hStationApp')
  .controller('SettingsCtrl', function ($scope, $http, socket, SettingsService, toaster) {

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
      //console.log('serialports: ' + JSON.stringify(serialports));
    });

    // When serial port select is changed update setting document
    $scope.serialportSelected = function() {
      // Update settings document
      SettingsService.update($scope.settings[0]);

    };

    $scope.refreshSerialPorts = function() {
      $http.get('/api/serialport').success(function(serialports) {

        // Update scope with serial port list
        $scope.serialports = serialports;

        // Toast we found the Arduino
        toaster.pop('info', "Serial Ports", 'Refreshed list of serial ports', 3000);
      });
    };

    $scope.autoDetectArduino = function() {

      // We first need to update the list of serial ports in case the Arduino has just been plugged in
      $http.get('/api/serialport').success(function(serialports) {

        // Update scope with serial port list
        $scope.serialports = serialports;

        // Now try and find the Arduino
        $http.get('/api/serialport/search').success(function(port) {
          if (port.com == 'Not Found'){

            // Toast we didn't find the Ardino
            toaster.pop('error', "Autodect", 'Arduino not found', 3000);
          } else {

            // Toast we found the Arduino
            toaster.pop('info', "Arduino found", 'Found on port ' + port.com, 3000);

            // Update scope for serial port with the Arduino
            $scope.settings[0].serialport = port.com;

            // Update settings document
            SettingsService.update($scope.settings[0]);
          }
        });
      });
    };

  });
