const MODULE_NAME = 'ngPromise';

import ngPromise from './src/ng-promise';
import ngPending from './src/ng-pending';
import ngResolve from './src/ng-resolve';
import ngReject from './src/ng-reject';
import ngFinally from './src/ng-finally';

angular.module(MODULE_NAME, [])
  .directive('ngPromise', ngPromise)
  .directive('ngPending', ngPending)
  .directive('ngResolve', ngResolve)
  .directive('ngReject', ngReject)
  .directive('ngFinally', ngFinally);

export default MODULE_NAME;