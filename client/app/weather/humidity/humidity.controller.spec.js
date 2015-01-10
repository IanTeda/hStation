'use strict';

describe('Controller: HumidityCtrl', function () {

  // load the controller's module
  beforeEach(module('hStationApp'));

  var HumidityCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HumidityCtrl = $controller('HumidityCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
