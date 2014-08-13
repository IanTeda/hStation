'use strict';

angular.module('hStationApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window, $http) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };


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

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
