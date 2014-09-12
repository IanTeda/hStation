'use strict';

describe('Controller: TemperatureCtrl', function () {

  // load the controller's module
  beforeEach(module('hStationApp'));

  var TemperatureCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TemperatureCtrl = $controller('TemperatureCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
