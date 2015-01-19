'use strict';

describe('Controller: UltravioletCtrl', function () {

  // load the controller's module
  beforeEach(module('hStationApp'));

  var UltravioletCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UltravioletCtrl = $controller('UltravioletCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
