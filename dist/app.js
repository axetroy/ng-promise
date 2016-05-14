/**
 * Created by axetroy on 16-5-14.
 */
angular.module('app', ['ngPromise'])
  .config(function () {

  })
  .run(function () {
    console.info('angular run');
  })
  .controller('default', function ($scope, $q, $timeout) {
    var $ctrl = this;

    $ctrl.defer = $q.defer();

    $ctrl.updateDefer = function () {
      $ctrl.defer = $q.defer();
      init();
    };

    var init = function () {
      $timeout(function () {
        var random = Math.random();
        if (random > 0.5) {
          $ctrl.defer.resolve();
        }else{
          $ctrl.defer.reject();
        }
      }, 1000);
    };

    init();

  });