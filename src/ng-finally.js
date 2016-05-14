import {renderDOM, removeDOM, stopEvent} from './common';

const ngFinally = ($animate, $window)=> {
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
        $attr: $attr,
        $transclude,
        $animate,
        $window,
        block: null,
        childScope: null,
        previousElements: null,
        directive: 'ngFinally'
      };
      $scope.$on('ngPromise', (e, status) => {
        let a = status !== -1 ? renderDOM(ops) : removeDOM(ops);
        stopEvent(e, a);
      });
    }
  };
};

ngFinally.$inject = ['$animate', '$window'];

export default ngFinally;