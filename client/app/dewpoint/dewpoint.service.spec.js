'use strict';

describe('Service: dewpoint', function () {

  // load the service's module
  beforeEach(module('hStationApp'));

  // instantiate service
  var dewpoint;
  beforeEach(inject(function (_dewpoint_) {
    dewpoint = _dewpoint_;
  }));

  it('should do something', function () {
    expect(!!dewpoint).toBe(true);
  });

});
