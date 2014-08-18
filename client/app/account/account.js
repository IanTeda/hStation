'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('account', {
        url: '/account',
        templateUrl: 'app/account/details/details.html',
        controller: 'DetailsCtrl',
        authenticate: true
      });
  });