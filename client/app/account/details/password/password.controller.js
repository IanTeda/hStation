'use strict';

angular.module('hStationApp')
  .controller('PasswordCtrl', function ($scope, $modalInstance, Auth) {

    $scope.form = {};
    $scope.errors = {};

    $scope.save = function(form) {

      if(form.$valid) {
        Auth.changePassword( $scope.form.oldPassword, $scope.form.newPassword )
          .then( function() {
            $scope.message = 'Password successfully changed.';
            $modalInstance.close();
          })
          .catch( function() {

            // Catch errors
            //form.oldPassword.$setValidity('mongoose', false);
            $scope.errors.other = 'Incorrect password';
            //$scope.form.oldPassword.$setValidity(true);
          });
      }
    };

    // On cancel button clicked, dismiss modal
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
