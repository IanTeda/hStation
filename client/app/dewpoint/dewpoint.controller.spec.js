'use strict';

describe('Controller: DewpointCtrl', function () {

  // load the controller's module
  beforeEach(module('hStationApp'));

  var DewpointCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DewpointCtrl = $controller('DewpointCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
