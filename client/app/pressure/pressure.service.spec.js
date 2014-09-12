'use strict';

describe('Service: pressure', function () {

  // load the service's module
  beforeEach(module('hStationApp'));

  // instantiate service
  var pressure;
  beforeEach(inject(function (_pressure_) {
    pressure = _pressure_;
  }));

  it('should do something', function () {
    expect(!!pressure).toBe(true);
  });

});
