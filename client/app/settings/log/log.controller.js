'use strict';

angular.module('hStationApp')
  .controller('SettingsLogCtrl', function ($scope, $http) {

    // Request JSON from server end point
    $http.get('/api/logs').success(function(logs) {
      $scope.logs = logs;
    });

  });
