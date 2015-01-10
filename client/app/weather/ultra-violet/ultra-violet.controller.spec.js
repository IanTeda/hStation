'use strict';

describe('Controller: UltraVioletCtrl', function () {

  // load the controller's module
  beforeEach(module('hStationApp'));

  var UltraVioletCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UltraVioletCtrl = $controller('UltraVioletCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
