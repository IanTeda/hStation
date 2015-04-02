'use strict';

angular.module('hStationApp')
  .controller('WeatherCtrl', function ($scope, WeatherService) {

    // Load the last 24 hours of all sensors
    WeatherService.last24hrs('all', function(last24hrs) {
      $scope.last24hrs = last24hrs;
    });

    $scope.sideBarMenu = [
      {
        'title': 'Summary',
        'link': '/weather',
        'state': 'weather.summary'
      }, {
        'title': 'Carbon Monoxide',
        'link': '/weather/carbon-monoxide',
        'state': 'weather.carbonMonoxide'
      }, {
        'title': 'Dew Point',
        'link': '/weahter/dew-point',
        'state': 'weather.dewPoint'
      }, {
        'title': 'Dust',
        'link': '/weather/dust',
        'state': 'weather.dust'
      }, {
        'title': 'Humidity',
        'link': '/weather/humidity',
        'state': 'weather.humidity'
      }, {
        'title': 'Infrared',
        'link': '/weather/infrared',
        'state': 'weather.infrared'
      }, {
        'title': 'Lux',
        'link': '/weather/lux',
        'state': 'weather.lux'
      }, {
        'title': 'Methane',
        'link': '/weather/methane',
        'state': 'weather.methane'
      }, {
        'title': 'Barometric Pressure',
        'link': '/weather/barometric-pressure',
        'state': 'weather.barometricPressure'
      }, {
        'title': 'Temperature',
        'link': '/weather/temperature',
        'state': 'weather.temperature'
      }, {
        'title': 'Ultraviolet',
        'link': '/weather/ultraviolet',
        'state': 'weather.ultraviolet'
      }
    ];

  });
