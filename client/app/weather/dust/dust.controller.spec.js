'use strict';

describe('Controller: DustCtrl', function () {

  // load the controller's module
  beforeEach(module('hStationApp'));

  var DustCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DustCtrl = $controller('DustCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
