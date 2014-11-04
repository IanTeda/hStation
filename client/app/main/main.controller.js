'use strict';

angular.module('hStationApp')
  .controller('MainCtrl', function ($scope, $http, DewpointService, HumidityService, PressureService, TemperatureService, socket) {

    //console.log('MainCtrl');

    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    // Initialise latest readings
    $scope.latestTemperature = {reading: -10000.00, timestamp: Date.now()};
    $scope.latestDewPoint = {reading: -10000.00, timestamp: Date.now()};
    $scope.latestHumidity = {reading: -10000.00, timestamp: Date.now()};
    $scope.latestPressure = {reading: -100000.00, timestamp: Date.now()};

    // Use service to retrieve all settings, which is only one in this case
    DewpointService.latest( function(latest) {
      $scope.latestDewPoint = latest;
      console.log('DewpointService.latest: ' + JSON.stringify(latest));
    });

    // Use service to retrieve all settings, which is only one in this case
    HumidityService.latest( function(latest) {
      $scope.latestHumidity = latest;
      console.log('HumidityService.latest: ' + JSON.stringify(latest));
    });

    // Use service to retrieve all settings, which is only one in this case
    PressureService.latest( function(latest) {
      $scope.latestPressure = latest
      console.log('PressureService.latest: ' + JSON.stringify(latest));
    });

    // Use service to retrieve all settings, which is only one in this case
    TemperatureService.latest( function(latest) {
      $scope.latestTemperature = latest
      console.log('TemperatureService.latest: ' + JSON.stringify(latest));
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };



    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });