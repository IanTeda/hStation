'use strict';

angular.module('hStationApp')
  .controller('SettingsCtrl', function ($scope, $http, socket, SettingsService, toaster) {

    $scope.settings = [];

    // Cron string and select display
    $scope.sensor_crons = [
      {cron: '*/1 * * * *', every: 'every 1 minute'},
      {cron: '*/10 * * * *', every: 'every 10 minutes'},
      {cron: '*/15 * * * *', every: 'every 15 minutes'},
      {cron: '*/30 * * * *', every: 'every 30 minutes'},
      {cron: '* */1 * * *', every: 'every 1 hour'},
      {cron: '* */3 * * *', every: 'every 3 hours'},
      {cron: '* */6 * * *', every: 'every 6 hours'},
      {cron: '* */12 * * *', every: 'every 12 hours'},
      {cron: '* */24 * * *', every: 'every 24 hours'}
    ];

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

    // When take reading select is changed update setting document
    $scope.takeReadingsSelected = function() {
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
