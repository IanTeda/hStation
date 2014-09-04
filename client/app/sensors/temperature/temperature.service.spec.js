'use strict';

describe('Service: Temperature', function () {

  // load the service's module
  beforeEach(module('hStationApp'));

  // instantiate service
  var Temperature;
  beforeEach(inject(function (_Temperature_) {
    Temperature = _Temperature_;
  }));

  it('should do something', function () {
    expect(!!Temperature).toBe(true);
  });

});
