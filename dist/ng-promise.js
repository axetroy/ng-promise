/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ngPromise = __webpack_require__(2);
	
	var _ngPromise2 = _interopRequireDefault(_ngPromise);
	
	var _ngPending = __webpack_require__(4);
	
	var _ngPending2 = _interopRequireDefault(_ngPending);
	
	var _ngResolve = __webpack_require__(5);
	
	var _ngResolve2 = _interopRequireDefault(_ngResolve);
	
	var _ngReject = __webpack_require__(6);
	
	var _ngReject2 = _interopRequireDefault(_ngReject);
	
	var _ngFinally = __webpack_require__(7);
	
	var _ngFinally2 = _interopRequireDefault(_ngFinally);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var MODULE_NAME = 'ngPromise';
	
	angular.module(MODULE_NAME, []).directive('ngPromise', _ngPromise2.default).directive('ngPending', _ngPending2.default).directive('ngResolve', _ngResolve2.default).directive('ngReject', _ngReject2.default).directive('ngFinally', _ngFinally2.default);
	
	exports.default = MODULE_NAME;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _common = __webpack_require__(3);
	
	var ngPromise = function ngPromise($animate, $parse, $timeout, $window) {
	  return {
	    multiElement: true,
	    transclude: 'element',
	    priority: 999,
	    terminal: true,
	    restrict: 'A',
	    controller: function controller() {},
	    link: function link($scope, $element, $attr, $ctrl, $transclude) {
	      var $promise = $parse($attr.ngPromise)($scope);
	      var ops = {
	        $scope: $scope,
	        $element: $element,
	        $attr: $attr,
	        $transclude: $transclude,
	        $animate: $animate,
	        $window: $window,
	        $parse: $parse,
	        block: null,
	        childScope: null,
	        directive: 'ngPromise'
	      };
	      var loadPromise = function loadPromise(promise) {
	        if ((0, _common.isPromise)(promise)) {
	          (function () {
	            // init data
	            var state = -1;
	            $scope.$broadcast('ngPromise', state);
	            promise.then(function () {
	              state = 1;
	            }, function () {
	              state = 0;
	            }).finally(function () {
	              if (state === -1) {
	                state = !promise.$$state ? 0 : promise.$$state.status === 1 ? 1 : 0;
	              }
	              $scope.$broadcast('ngPromise', state);
	            });
	          })();
	        }
	      };
	
	      var init = function init() {
	        (0, _common.renderDOM)(ops);
	        loadPromise($promise);
	      };
	
	      /**
	       * 监听promise的变化
	       * 如果有新的promise覆盖旧的promise
	       * 则重新运行指令，根据新的promise，重新渲染视图
	       */
	      var promiseWatcher;
	      var promiseWatchFn = function promiseWatchFn() {
	        promiseWatcher = $scope.$watch($attr.ngPromise, function (newPromise, oldPromise) {
	          if (newPromise === oldPromise || !newPromise) return;
	          if ((0, _common.isPromise)(newPromise)) {
	            loadPromise(newPromise);
	          }
	        });
	      };
	
	      $timeout(function () {
	        init();
	        promiseWatchFn();
	      });
	
	      $scope.$on('$destroy', function () {
	        promiseWatcher && angular.isFunction(promiseWatcher) && promiseWatcher();
	      });
	    }
	  };
	}; /**
	    *
	    */
	
	ngPromise.$inject = ['$animate', '$parse', '$timeout', '$window'];
	
	exports.default = ngPromise;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Created by axetroy on 16-5-14.
	 */
	
	var jqLite = angular.element || window.$ || window.jQuery;
	
	var isPromise = function isPromise(p, undefined) {
	  return p === undefined || !p ? false : !!(angular.isDefined(p) && p.then && angular.isFunction(p.then));
	};
	
	var stopEvent = function stopEvent(e) {
	  angular.isFunction(e.preventDefault) && e.preventDefault();
	  angular.isFunction(e.stopPropagation) && e.stopPropagation();
	};
	
	var getBlockNodes = function getBlockNodes(nodes) {
	  var node = nodes[0];
	  var endNode = nodes[nodes.length - 1];
	  var blockNodes;
	
	  for (var i = 1; node !== endNode && (node = node.nextSibling); i++) {
	    if (blockNodes || nodes[i] !== node) {
	      if (!blockNodes) {
	        blockNodes = jqLite(Array.slice.call(nodes, 0, i));
	      }
	      blockNodes.push(node);
	    }
	  }
	
	  return blockNodes || nodes;
	};
	
	var renderDOM = function renderDOM(ops) {
	  if (!ops.childScope) {
	    ops.$transclude(function (clone, newScope) {
	      ops.childScope = newScope;
	      clone[clone.length++] = ops.$window.document.createComment(' end ' + ops.directive + ': ' + ops.$attr[ops.directive] + ' ');
	      ops.block = {
	        clone: clone
	      };
	      ops.$animate.enter(clone, ops.$element.parent(), ops.$element);
	    });
	  }
	};
	
	var removeDOM = function removeDOM(ops) {
	  if (ops.previousElements) {
	    ops.previousElements.remove();
	    ops.previousElements = null;
	  }
	  if (ops.childScope) {
	    ops.childScope.$destroy();
	    ops.childScope = null;
	  }
	  if (ops.block) {
	    ops.previousElements = getBlockNodes(ops.block.clone);
	    ops.$animate.leave(ops.previousElements).then(function () {
	      ops.previousElements = null;
	    });
	    ops.block = null;
	  }
	};
	
	exports.isPromise = isPromise;
	exports.renderDOM = renderDOM;
	exports.removeDOM = removeDOM;
	exports.stopEvent = stopEvent;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _common = __webpack_require__(3);
	
	var ngPending = function ngPending($animate, $window) {
	  return {
	    multiElement: true,
	    transclude: 'element',
	    priority: 999,
	    terminal: true,
	    restrict: 'A',
	    require: '^ngPromise',
	    link: function link($scope, $element, $attr, ctrl, $transclude) {
	      var ops = {
	        $scope: $scope,
	        $element: $element,
	        $attr: $attr,
	        $transclude: $transclude,
	        $animate: $animate,
	        $window: $window,
	        block: null,
	        childScope: null,
	        previousElements: null,
	        directive: 'ngPending'
	      };
	      $scope.$on('ngPromise', function (e, status) {
	        var a = status === -1 ? (0, _common.renderDOM)(ops) : (0, _common.removeDOM)(ops);
	        (0, _common.stopEvent)(e, a);
	      });
	    }
	  };
	};
	
	ngPending.$inject = ['$animate', '$window'];
	
	exports.default = ngPending;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _common = __webpack_require__(3);
	
	var ngResolve = function ngResolve($animate, $window, $parse) {
	  return {
	    multiElement: true,
	    transclude: 'element',
	    priority: 999,
	    terminal: true,
	    restrict: 'A',
	    require: '^ngPromise',
	    link: function link($scope, $element, $attr, ctrl, $transclude) {
	      var ops = {
	        $scope: $scope,
	        $element: $element,
	        $attr: $attr,
	        ctrl: ctrl,
	        $transclude: $transclude,
	        $animate: $animate,
	        $window: $window,
	        $parse: $parse,
	        block: null,
	        childScope: null,
	        previousElements: null,
	        directive: 'ngResolve',
	        watcher: null
	      };
	      $scope.$on('ngPromise', function (e, status) {
	        var a = status === 1 ? (0, _common.renderDOM)(ops) : (0, _common.removeDOM)(ops);
	        (0, _common.stopEvent)(e, a);
	      });
	    }
	  };
	};
	
	ngResolve.$inject = ['$animate', '$window', '$parse'];
	
	exports.default = ngResolve;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _common = __webpack_require__(3);
	
	var ngReject = function ngReject($animate, $window) {
	  return {
	    multiElement: true,
	    transclude: 'element',
	    priority: 999,
	    terminal: true,
	    restrict: 'A',
	    require: '^ngPromise',
	    link: function link($scope, $element, $attr, ctrl, $transclude) {
	
	      var ops = {
	        $scope: $scope,
	        $element: $element,
	        $attr: $attr,
	        $transclude: $transclude,
	        $animate: $animate,
	        $window: $window,
	        block: null,
	        childScope: null,
	        previousElements: null,
	        directive: 'ngReject'
	      };
	
	      $scope.$on('ngPromise', function (e, status) {
	        var a = status === 0 ? (0, _common.renderDOM)(ops) : (0, _common.removeDOM)(ops);
	        (0, _common.stopEvent)(e, a);
	      });
	    }
	  };
	};
	
	ngReject.$inject = ['$animate', '$window'];
	
	exports.default = ngReject;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _common = __webpack_require__(3);
	
	var ngFinally = function ngFinally($animate, $window) {
	  return {
	    multiElement: true,
	    transclude: 'element',
	    priority: 999,
	    terminal: true,
	    restrict: 'A',
	    require: '^ngPromise',
	    link: function link($scope, $element, $attr, ctrl, $transclude) {
	      var ops = {
	        $scope: $scope,
	        $element: $element,
	        $attr: $attr,
	        $transclude: $transclude,
	        $animate: $animate,
	        $window: $window,
	        block: null,
	        childScope: null,
	        previousElements: null,
	        directive: 'ngFinally'
	      };
	      $scope.$on('ngPromise', function (e, status) {
	        var a = status !== -1 ? (0, _common.renderDOM)(ops) : (0, _common.removeDOM)(ops);
	        (0, _common.stopEvent)(e, a);
	      });
	    }
	  };
	};
	
	ngFinally.$inject = ['$animate', '$window'];
	
	exports.default = ngFinally;

/***/ }
/******/ ]);