'use strict';

describe('Service: humidity', function () {

  // load the service's module
  beforeEach(module('hStationApp'));

  // instantiate service
  var humidity;
  beforeEach(inject(function (_humidity_) {
    humidity = _humidity_;
  }));

  it('should do something', function () {
    expect(!!humidity).toBe(true);
  });

});
