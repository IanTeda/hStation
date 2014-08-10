'use strict';

angular.module('hStationApp')
  .controller('FooterCtrl', function ($scope, $http) {

    $scope.appInfo = [
      {
        'name': 'Not Found',
        'description' : 'Description',
        'version': '-1',
        'author' : {
          'name' : 'Some One',
          'email' : 'someone@hotmail.com',
          'web' : 'www.someone.com'
        }
      }
    ];

    $http.get('/api/app').success(function(appInfo) {
      $scope.appInfo = appInfo;
    });

  });