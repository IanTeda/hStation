'use strict';

angular.module('hStationApp')
  .controller('LogCtrl', function ($scope, $http) {

    // Request JSON from server end point
    $http.get('/api/logs').success(function(logs) {
      $scope.logs = logs;
      console.log('logs ' + JSON.stringify($scope.logs));
    });

  });
