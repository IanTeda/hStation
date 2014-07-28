'use strict';

angular.module('hStationApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
      {
        'title': 'Latest',
        'link': '/'
      }
    ];

    $scope.menuReadings = [
      {
        'title': 'Temperature',
        'link': '/readings/temperature'
      },
      {
        'title': 'Humidity',
        'link': '/readings/humidity'
      },
      {
        'title': 'Dew Point',
        'link': '/readings/dew-point'
      },
      {
        'title': 'Pressure',
        'link': '/readings/pressure'
      }
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });