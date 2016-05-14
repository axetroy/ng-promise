import {renderDOM, removeDOM, stopEvent} from './common';

const ngReject = ($animate, $window)=> {
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
        $transclude,
        $animate,
        $window,
        block: null,
        childScope: null,
        previousElements: null,
        directive: 'ngReject'
      };

      $scope.$on('ngPromise', (e, status) => {
        let a = status === 0 ? renderDOM(ops) : removeDOM(ops);
        stopEvent(e, a);
      });

    }
  };
};

ngReject.$inject = ['$animate', '$window'];

export default ngReject;