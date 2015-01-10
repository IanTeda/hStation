'use strict';

describe('Controller: LuxCtrl', function () {

  // load the controller's module
  beforeEach(module('hStationApp'));

  var LuxCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LuxCtrl = $controller('LuxCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
