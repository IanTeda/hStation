'use strict';

angular.module('hStationApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
      {
        'title': 'Dashboard',
        'link': '/'
      },{
        'title': 'Weather',
        'link': '/weather'
      }

    ];

    $scope.menuReadings = [
      {
        'title': 'Carbon Monoxide',
        'link': '/weather/carbon-monoxide'
      },
      {
        'title': 'Dew Point',
        'link': '/weather/dew-point'
      },
      {
        'title': 'Dust',
        'link': '/weather/dust'
      },
      {
        'title': 'Humidity',
        'link': '/weather/humidity'
      },
      {
        'title': 'Infra Red',
        'link': '/weather/infra-red'
      },
      {
        'title': 'Lux',
        'link': '/weather/lux'
      },
      {
        'title': 'Methane',
        'link': '/weather/methane'
      },
      {
        'title': 'Barometric Pressure',
        'link': '/weather/barometric-pressure'
      },
      {
        'title': 'Temperature',
        'link': '/weather/temperature'
      },
      {
        'title': 'Ultra Violet',
        'link': '/weather/ultra-violet'
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