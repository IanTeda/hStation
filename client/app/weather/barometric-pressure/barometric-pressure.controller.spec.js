'use strict';

describe('Controller: BarometricPressureCtrl', function () {

  // load the controller's module
  beforeEach(module('hStationApp'));

  var BarometricPressureCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BarometricPressureCtrl = $controller('BarometricPressureCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
