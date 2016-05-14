import {renderDOM, removeDOM, stopEvent} from './common';

let ngResolve = ($animate, $window, $parse)=> {
  return {
    multiElement: true,
    transclude: 'element',
    priority: 999,
    terminal: true,
    restrict: 'A',
    require: '^ngPromise',
    link($scope, $element, $attr, ctrl, $transclude) {
      var ops = {
        $scope,
        $element,
        $attr,
        ctrl,
        $transclude,
        $animate,
        $window,
        $parse,
        block: null,
        childScope: null,
        previousElements: null,
        directive: 'ngResolve',
        watcher: null
      };
      $scope.$on('ngPromise', (e, status) => {
        let a = status === 1 ? renderDOM(ops) : removeDOM(ops);
        stopEvent(e, a);
      });
    }
  };
};

ngResolve.$inject = ['$animate', '$window', '$parse'];

export default ngResolve;