'use strict';

angular.module('hStationApp')
  .controller('WeatherCtrl', function ($scope, WeatherService) {

    $scope.last24hrs ={};

    WeatherService.last24hrs( function(last24hrs) {
      $scope.last24hrs = last24hrs;
    });

  });
