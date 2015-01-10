'use strict';

describe('Controller: MethaneCtrl', function () {

  // load the controller's module
  beforeEach(module('hStationApp'));

  var MethaneCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MethaneCtrl = $controller('MethaneCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
