'use strict';

describe('Controller: PressureCtrl', function () {

  // load the controller's module
  beforeEach(module('hStationApp'));

  var PressureCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PressureCtrl = $controller('PressureCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
