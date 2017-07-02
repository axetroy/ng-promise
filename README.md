# ng-promise

[![Greenkeeper badge](https://badges.greenkeeper.io/axetroy/ng-promise.svg)](https://greenkeeper.io/)

**Angular1.x**的promise指令

根据promise的结果，渲染不同的视图

当promise更新时(新的promise覆盖旧的promise)，指令会重新根据新的promise渲染视图。

前身: [at-promise](https://github.com/axetroy/at-promise)

## 指令

#### ng-promise

```html
<div ng-promise="asyncAction">
</div>
```


#### ng-resolve

```html
<div ng-promise="asyncAction">
  <div ng-resolve>
    if promise resolve, then render this div element
  </div>
</div>
```

#### ng-reject

```html
<div ng-promise="asyncAction">
  <div ng-reject>
    if promise reject, then render this div element
  </div>
</div>
```

#### ng-pending

```html
<div ng-promise="asyncAction">
  <div ng-pending>
    if promise are pending(not resolve & not reject), then render this div element
  </div>
</div>
```

#### ng-finally

```html
<div ng-promise="asyncAction">
  <div ng-finally>
    once promise resolve or reject, then render this div element
  </div>
</div>
```

### Example

```html
<div ng-promise="asyncAction">
  <div ng-pending>
    loading...
  </div>
  <div ng-resolve>
    you have got data
  </div>
  <div ng-reject>
    <button type="button" ngClick="reload()">reload data</button>
  </div>
  <div ng-finally>
    promise done
  </div>
</div>
```
