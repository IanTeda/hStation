'use strict';

describe('Controller: InfraRedCtrl', function () {

  // load the controller's module
  beforeEach(module('hStationApp'));

  var InfraRedCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InfraRedCtrl = $controller('InfraRedCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
