'use strict';

describe('Service: Agenda', function () {

  // load the service's module
  beforeEach(module('hStationApp'));

  // instantiate service
  var Agenda;
  beforeEach(inject(function (_Agenda_) {
    Agenda = _Agenda_;
  }));

  it('should do something', function () {
    expect(!!Agenda).toBe(true);
  });

});
