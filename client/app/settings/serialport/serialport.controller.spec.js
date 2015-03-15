'use strict';

describe('Controller: SerialPortCtrl', function () {

  // load the controller's module
  beforeEach(module('hStationApp'));

  var SerialPortCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SerialPortCtrl = $controller('SerialPorttrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
