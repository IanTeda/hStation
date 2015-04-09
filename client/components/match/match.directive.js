'use strict';

angular.module('hStationApp')
  .directive('passwordMatch', function () {
    return {
      // element must have ng-model attribute.
      require: 'ngModel',

      // scope = the parent scope
      // elem = the element the directive is on
      // attr = a dictionary of attributes on the element
      // ctrl = the controller for ngModel.
      link: function (scope, elem, attrs, ctrl) {

        // Create password object
        var firstPassword = '#' + attrs.ngMatch;

        // Each time the input element recieves a key press check for validation match
        elem.add(firstPassword).on('keyup', function () {
          scope.$apply(function () {
            var v = elem.val() === $(firstPassword).val();
            // Set error if v doesn't match
            ctrl.$setValidity('pwmatch', v);
          });
        });
      }
    };
  });