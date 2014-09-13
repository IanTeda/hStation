'use strict';

angular.module('hStationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('agenda', {
        url: '/settings/agenda',
        templateUrl: 'app/settings/agenda/agenda.html',
        controller: 'AgendaCtrl'
      });
  });