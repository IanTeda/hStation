'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('settings.users', {
        views: {
          'main': {
            templateUrl: 'app/settings/users/users.html',
            controller: 'UsersCtrl'
          }
        }
      });
  });
