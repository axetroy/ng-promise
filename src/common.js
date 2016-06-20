/**
 * Created by axetroy on 16-5-14.
 */

const jqLite = angular.element || window.$ || window.jQuery;

const isPromise = function (p, undefined) {
  return p === undefined || !p ? false : !!(angular.isDefined(p) && p.then && angular.isFunction(p.then));
};

const stopEvent = function (e) {
  angular.isFunction(e.preventDefault) && e.preventDefault();
  angular.isFunction(e.stopPropagation) && e.stopPropagation();
};

const getBlockNodes = function (nodes) {
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

const renderDOM = (ops)=> {
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

const removeDOM = (ops)=> {
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

export {isPromise, renderDOM, removeDOM, stopEvent};