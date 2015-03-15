'use strict';

angular.module('hStationApp')
  .controller('SideBarSettingsCtrl', function ($scope) {

    $scope.sideBarMenu = [
      {
        'title': 'Settings',
        'link': '/settings',
        'state': 'settings/app'
      },{
        'title': 'Serial Port',
        'link': '/serialport',
        'state': 'settings.serialport'
      },{
        'title': 'Log',
        'link': '/settings/log',
        'state': 'settings.log'
      }

    ];

  });
