'use strict';

describe('Controller: InfraredCtrl', function () {

  // load the controller's module
  beforeEach(module('hStationApp'));

  var InfraredCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InfraredCtrl = $controller('InfraredCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
