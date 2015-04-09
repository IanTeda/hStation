'use strict';

describe('Controller: PasswordCtrl', function () {

  // load the controller's module
  beforeEach(module('hStationApp'));

  var PasswordCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PasswordCtrl = $controller('PasswordCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
