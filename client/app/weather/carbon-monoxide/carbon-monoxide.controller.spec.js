'use strict';

describe('Controller: CarbonMonoxideCtrl', function () {

  // load the controller's module
  beforeEach(module('hStationApp'));

  var CarbonMonoxideCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CarbonMonoxideCtrl = $controller('CarbonMonoxideCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
