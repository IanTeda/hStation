'use strict';

angular.module('hStationApp')
  .factory('PasswordModal', function ($rootScope, $modal) {
    /**
     * Opens a modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $modal.open() returns
     */
    function openModal(scope, modalClass) {
      var modalScope = $rootScope.$new();
      scope = scope || {};
      modalClass = modalClass || 'modal-default';

      angular.extend(modalScope, scope);

      // Predefine scope for select inputs
      modalScope.user = {
        'role' : 'User',
        'isActive' : 'Active'
      };

      return $modal.open({
        templateUrl: 'app/account/details/password/password.html',
        controller: 'PasswordCtrl',
        windowClass: modalClass,
        scope: modalScope,
        backdrop: true,
        backdropClick: true,
        dialogFade: true,
        keyboard: true
      });
    }

    // Public API here
    return {

      /**
       * Create a function to open the new user modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
       * @param  {Function} callback - callback, ran when delete is confirmed
       * @return {Function}     - the function to open the modal (ex. myModalFn)
       */
      update: function (callback) {
        callback = callback || angular.noop;

        /**
         * Open a delete confirmation modal
         * @param  {String} name   - name or info to show on modal
         * @param  {All}           - any additional args are passed straight to del callback
         */
        return function () {
          var args = Array.prototype.slice.call(arguments),
            name = args.shift(),
            modalObject;

          modalObject = openModal({
            modal: {
              dismissable: true
            }
          }, 'modal-dialog');


          modalObject.result.then(function (userForm) {
            console.log('result ' + JSON.stringify(userForm));
            callback = userForm;
          });
        };
      }
    };
  });
