'use strict';

describe('Service: pressure', function () {

  // load the service's module
  beforeEach(module('hStationApp'));

  // instantiate service
  var pressure;
  beforeEach(inject(function (_humidity_) {
    pressure = _humidity_;
  }));

  it('should do something', function () {
    expect(!!humidity).toBe(true);
  });

});
