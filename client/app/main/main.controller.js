'use strict';

angular.module('hStationApp')
  .controller('MainCtrl', function ($scope, $http, socket) {

    console.log('MainCtrl');

    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    // Set latest temp to scope
    $scope.latestTemperature = {reading: -100.00, timestamp: Date.now()};
    $scope.latestDewPoint = {reading: -100.00, timestamp: Date.now()};
    $scope.latestHumidity = {reading: -100.00, timestamp: Date.now()};
    $scope.latestPressure = {reading: -1000.00, timestamp: Date.now()};

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