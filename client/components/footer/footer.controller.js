'use strict';

angular.module('hStationApp')
  .controller('FooterCtrl', function ($scope, $http) {

    console.log('FooterCtrl');

    $scope.hStationApp = [
      {
        'name': 'Not Found',
        'description' : 'Description',
        'author' : 'Some One',
        'email' : 'someone@hotmail.com',
        'homepage' : 'www.someone.com',
        'version': '-1'
      }
    ];

    $http.get('/api/app/version').success(function(hStationAppVersion) {
      $scope.hStationApp.version = hStationAppVersion;
    });

  });