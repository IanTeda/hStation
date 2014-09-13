'use strict';

angular.module('hStationApp')
  .controller('AgendaCtrl', function ($scope, $http, socket, AgendaService) {

    $scope.agendas = [];

    $scope.intervals = [
      {period: 'every 5 minutes'},
      {period: 'every 10 minutes'},
      {period: 'every 15 minutes'},
      {period: 'every 30 minutes'},
      {period: 'every 1 hour'},
      {period: 'every 3 hours'},
      {period: 'every 6 hours'},
      {period: 'every 12 hours'},
      {period: 'every 24 hours'}
    ];

    // Retrive agendas from the server
    AgendaService.index( function(agendas) {
      $scope.agendas = agendas;
      socket.syncUpdates('agendas', $scope.agendas);
    });


  });
