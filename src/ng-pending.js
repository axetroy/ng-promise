import {renderDOM, removeDOM, stopEvent} from './common';

const ngPending = ($animate, $window)=> {
  return {
    multiElement: true,
    transclude: 'element',
    priority: 999,
    terminal: true,
    restrict: 'A',
    require: '^ngPromise',
    link: function ($scope, $element, $attr, ctrl, $transclude) {
      var ops = {
        $scope,
        $element,
        $attr,
        $transclude,
        $animate,
        $window,
        block: null,
        childScope: null,
        previousElements: null,
        directive: 'ngPending'
      };
      $scope.$on('ngPromise', (e, status) => {
        let a = status === -1 ? renderDOM(ops) : removeDOM(ops);
        stopEvent(e, a);
      });

    }
  };
};

ngPending.$inject = ['$animate', '$window'];

export default ngPending;