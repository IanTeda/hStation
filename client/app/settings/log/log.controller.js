'use strict';

angular.module('hStationApp')
  .controller('LogCtrl', function ($scope, $http) {
    console.log('LogCtrl');
    $scope.message = 'Hello';

    $scope.logs = [];

    $http.get('/api/logs').success(function(logs) {
      $scope.logs = logs;
      console.log(JSON.stringify(logs));
    });

  });
