/**
 *
 */

import {isPromise, renderDOM} from './common';

let ngPromise = ($animate, $parse, $timeout, $window)=> {
  return {
    multiElement: true,
    transclude: 'element',
    priority: 999,
    terminal: true,
    restrict: 'A',
    controller(){
    },
    link($scope, $element, $attr, $ctrl, $transclude){
      let $promise = $parse($attr.ngPromise)($scope);
      let ops = {
        $scope,
        $element,
        $attr,
        $transclude,
        $animate,
        $window,
        $parse,
        block: null,
        childScope: null,
        directive: 'ngPromise'
      };
      let loadPromise = (promise)=> {
        if (isPromise(promise)) {
          // init data
          let state = -1;
          $scope.$broadcast('ngPromise', state);
          promise
            .then(()=> {
              state = 1;
            }, ()=> {
              state = 0;
            })
            .finally(function () {
              if (state === -1) {
                state = !promise.$$state ? 0 : promise.$$state.status === 1 ? 1 : 0;
              }
              $scope.$broadcast('ngPromise', state);
            });
        }
      };

      let init = ()=> {
        renderDOM(ops);
        loadPromise($promise);
      };

      /**
       * 监听promise的变化
       * 如果有新的promise覆盖旧的promise
       * 则重新运行指令，根据新的promise，重新渲染视图
       */
      var promiseWatcher;
      let promiseWatchFn = function () {
        promiseWatcher = $scope.$watch($attr.ngPromise, function (newPromise, oldPromise) {
          if (newPromise === oldPromise || !newPromise) return;
          if (isPromise(newPromise)) {
            loadPromise(newPromise);
          }
        });
      };

      $timeout(()=> {
        init();
        promiseWatchFn();
      });

      $scope.$on('$destroy', function () {
        promiseWatcher && angular.isFunction(promiseWatcher) && promiseWatcher();
      });

    }
  }
};

ngPromise.$inject = ['$animate', '$parse', '$timeout', '$window'];

export default ngPromise;