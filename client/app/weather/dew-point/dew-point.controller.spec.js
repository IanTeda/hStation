'use strict';

describe('Controller: DewPointCtrl', function () {

  // load the controller's module
  beforeEach(module('hStationApp'));

  var DewPointCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DewPointCtrl = $controller('DewPointCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
