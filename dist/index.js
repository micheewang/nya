function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

var $Element = function $Element(tagName, attrs, children) {
  _classCallCheck(this, $Element);

  if (typeof attrs === 'string' || isElement(attrs)) {
    children = [attrs];
    attrs = {};
  } else if (Array.isArray(attrs)) {
    children = attrs;
    attrs = {};
  }

  attrs = attrs || {};
  children = children ? Array.isArray(children) ? children : [children] : [];
  this.tagName = tagName; //dom实例

  this.ref = null; //runtime optimization

  this.mark = [];
  this.attrs = attrs;
  this.children = children;
};
function isElement(con) {
  return con instanceof $Element;
}
function createElement(tagName, attrs, children) {
  var con = new $Element(tagName, attrs, children);
  return con;
} //柯里化

var TAG = Proxy ? new Proxy({}, {
  get: function get(obj, prop) {
    if (!obj.hasOwnProperty(prop)) {
      obj[prop] = function (attrs, children) {
        return new $Element(prop, attrs, children);
      };
    }

    return obj[prop];
  }
}) : function () {
  var contain = {};
  var htmlTag = ('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,let,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot').split(',');
  htmlTag.forEach(function (tagName) {
    contain[tagName.slice(0, 1).toUpperCase() + tagName.slice(1)] = function (attrs, children) {
      return new $Element(tagName, attrs, children);
    };
  });
  return contain;
}();

var _map = ['warn', 'error', 'info', 'log'].map(function (v) {
  return function () {
    var _console;

    return (_console = console)[v].apply(_console, arguments);
  };
}),
    _map2 = _slicedToArray(_map, 3),
    warn = _map2[0];
    _map2[1];
    _map2[2]; //合并函数为一个函数
function compose() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function () {
    var _this = this;

    for (var _len2 = arguments.length, arg = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      arg[_key2] = arguments[_key2];
    }

    fns.forEach(function (fn) {
      return fn.call.apply(fn, [_this].concat(arg));
    });
  };
}
function memoize(fn) {
  var memoize = function memoize() {
    var cache = memoize.cache;

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    var address = args.join(',');

    if (!Object.hasOwnProperty.call(cache, address)) {
      cache[address] = fn.apply(this, args);
    }

    return cache[address];
  };

  memoize.cache = {};
  return memoize;
}
function noop() {}
function testFuntion(a, msg) {
  if (!isFunction(a)) {
    throw new TypeError(msg || 'Parameter must be a function.');
  }
}
function isFunction(f) {
  return typeof f === 'function';
}

//keep Component and $Element(name | attrs | children) the same behavior

var Component = /*#__PURE__*/function (_$Element) {
  _inherits(Component, _$Element);

  var _super = _createSuper(Component);

  function Component(tagName, props, slot, $const) {
    var _this;

    _classCallCheck(this, Component);

    _this = _super.call(this, tagName, props, slot); //外层逻辑函数

    _this["const"] = $const; //内层虚拟节点模板函数

    _this.templet = null;
    _this.vNode = null;
    _this.parentNode = null; //data getter

    _this.getter = null; //lifecycle

    _this.mouted = null;
    _this.update = null;
    _this.unMouted = null; //....

    return _this;
  }

  return Component;
}($Element);

function composeArgs() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  //These component belong to one type.
  var name = Symbol('Component');
  return function (props, slot) {
    return _construct(Component, [name, props, slot].concat(args));
  };
}

function isComponent(con) {
  return con instanceof Component;
}
function createComponent(f) {
  testFuntion(f);
  return composeArgs(f);
}

// 是一个仓库一对多组件的形式
// 只能有一个提供者,但可以有多个接收者
// 提供者也可以作为接受者

var Store = /*#__PURE__*/function () {
  function Store(responder, recipient) {
    _classCallCheck(this, Store);

    testFuntion(responder);
    this.responder = responder;
    this.recipient = recipient || noop;
    this.wants = new Set();
  } //主动发送给所有的组件


  _createClass(Store, [{
    key: "emit",
    value: function emit() {
      this.wants.forEach(function (d) {
        return d();
      });
    } //解绑

  }, {
    key: "unbind",
    value: function unbind(want) {
      if (this.wants.has(want)) {
        this.wants["delete"](want);
      }
    } //创建want|send

  }, {
    key: "createTruck",
    value: function createTruck(receiver) {
      var _this = this;

      testFuntion(receiver); //want

      var want = function want() {
        for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
          arg[_key] = arguments[_key];
        }

        _this.responder.apply(_this, [function (data) {
          receiver(data);
        }].concat(arg));
      };

      var send = function send(data) {
        return _this.recipient(data);
      };

      this.wants.add(want);
      return [want, send];
    }
  }]);

  return Store;
}();
function createStore() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return _construct(Store, args);
}

//createRef
function createRef() {
  // 
  return function f(ref) {
    f.current = ref;
  };
}

function ref (element, attrValue) {
  testFuntion(attrValue, 'The ref parameter must be a function'); //执行传入的函数

  attrValue(element.ref);
}

function className (element, value) {
  var ref = element.ref;

  var type = _typeof(value);

  if (type === 'string') {
    ref.classList = value;
  } else {
    var list = [];

    if (Array.isArray(value)) {
      list = value;
    } else {
      for (var i in value) {
        if (value[i]) {
          list.push(i);
        }
      }
    }

    ref.classList = list.join(' ');
  }
}

function on (element, value) {
  var ref = element.ref;

  for (var i in value) {
    ref.addEventListener(i, value[i]);
  }
}

var tagReg = new Map(); //字母类属性值

tagReg.set(/[a-zA-Z]+/, {
  ref: ref,
  on: on,
  "class": className
});
var getHandler = memoize(function (tagName, attrName) {
  var _iterator = _createForOfIteratorHelper(tagReg.entries()),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
          reg = _step$value[0],
          value = _step$value[1];

      //正则匹配
      if (reg.test(tagName) && value[attrName]) {
        return value[attrName];
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return false;
});
function testAttribute (element, attrName, attrValue) {
  var tagName = element.tagName;
  var handler = getHandler(tagName, attrName);

  if (handler) {
    handler(element, attrValue) === false;
    return true;
  } else {
    return false;
  }
}

//当前的活动组件
var current_node = {
  current: null
}; //获取当前的活动组件

function getInstance(errorMessage) {
  var current = current_node.current;

  if (!current) {
    throw new Error(errorMessage || 'hooks must be called inside Component');
  }

  return current;
}

/*
 * render queen
 * type = Array<{timestamp: number, component: Component, skip: boolean}>
 */

var renderQueen = [];
/**
 *
 * @param {Component} component
 */

function addQueen(component) {
  if (renderQueen.push({
    timestamp: +new Date(),
    component: component
  }) === 1) {
    //合并渲染
    //notes:  运行在后台标签页或者隐藏的<iframe>里时，会被暂停调用以提升性能和电池寿命。
    //https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame
    requestAnimationFrame(function () {
      while (renderQueen.length) {
        updateComponet(renderQueen.shift());
      }
    });
  }
}

function updateComponet(_ref) {
  _ref.timestamp;
      var component = _ref.component;
  // TODO 加入diff | filber
  var oldVnode = component.vNode;
  var newVnode = getVNode(component);
  var el = elementRender.call(newVnode);
  component.vNode = newVnode;
  component.parentNode.replaceChild(el, component.ref);
  component.ref = el; //卸载触发

  triggerEvents(oldVnode, 'unMouted'); //当前组件更新

  triggerEventsFloor(component, 'update'); //子组件全部触发mouted

  triggerEvents(newVnode, 'mouted');
} //递归触发event


function triggerEvents(node, eventName) {
  var children = null;

  if (isComponent(node)) {
    children = [node.vNode];
    isFunction(node[eventName]) && node[eventName]();
  } else {
    children = node.children;
  }

  children.forEach(function (cNode) {
    if (isElement(cNode)) {
      triggerEvents(cNode, eventName);
    }
  });
}

function triggerEventsFloor(node, eventName) {
  if (isComponent(node)) {
    isFunction(node[eventName]) && node[eventName]();
  }
}
/**
 * main function
 * @param {$Element | Component} element
 */


function renderDOM(element, root) {
  if (isComponent(element)) {
    componentRender.call(element, root);
  } else if (isElement(element)) {
    elementRender.call(element, root);
  } else {
    throw new Error("The root element must mount the component.");
  }
}
/**
 * vnode => element
 */

function elementRender(parentNode) {
  var tagName = this.tagName,
      attrs = this.attrs,
      children = this.children;
  var ref = this.ref = document.createElement(tagName);

  for (var key in attrs) {
    var value = attrs[key]; //属性匹配/设置函数

    if (testAttribute(this, key, value)) {
      continue;
    } //boolean值直接赋值readOnly等


    if (typeof value === 'boolean') {
      ref[key] = value;
    } //事件 value为函数
    else if (/on[A-Z][a-zA-Z]+/.test(key)) {
        testFuntion(value);
        ref[key.toLowerCase()] = attrs[key];
      } //其他类型
      else {
          ref.setAttribute(key, value);
        }
  }
  /**
   * 子元素渲染
   */


  var _iterator = _createForOfIteratorHelper(children),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var node = _step.value;

      if (typeof node === 'function') {
        node = node();
      } //把这些值排除在外就可以方便的在数组里使用表达式


      if (node === undefined || node === null || node === '') {
        continue;
      } //由于继承关系有可能是element,也可能是component


      if (isElement(node)) {
        if (isComponent(node)) {
          componentRender.call(node, ref);
        } else {
          elementRender.call(node, ref);
        }
      } else {
        //为本节点
        var textNode = document.createTextNode(String(node));
        ref.appendChild(textNode);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if (parentNode) {
    parentNode.appendChild(ref);
  }

  return ref;
}
/**
 * vnode组件渲染
 */


function componentRender(parentNode) {
  //不传parentNode就可以使用上次的保存的值
  this.parentNode = parentNode; //vnode模板函数为空时,执行

  if (this.templet === null) {
    //设置当前的节点为活动节点
    current_node.current = this; //组件的props和slot

    var renderData = {
      props: this.attrs,
      slot: this.children
    }; //const指的传入createComponent的函数,里面使用的hooks就可以指向当前的节点

    var templet = this.templet = this["const"](renderData);
    testFuntion(templet, 'Creating a component must return a function that returns the virtual node'); //清空当前节点

    current_node.current = null;
  } //执行vnode模板获取虚拟节点


  var vNode = this.vNode = getVNode(this);
  this.ref = elementRender.call(vNode, parentNode); //生命周期--挂载

  triggerEventsFloor(this, 'mouted');
}

function getVNode(component) {
  if (component.templet) {
    if (component.getter) {
      return component.templet(component.getter());
    } else {
      return component.templet();
    }
  }
}

function useChapter(chapter) {
  //获取当前active的虚拟节点
  var current = getInstance(); //局部变量保存值

  var currentData = chapter; //getter

  function getter() {
    return currentData;
  } //setter


  function setter(value) {
    //缓存新值
    currentData = value; //添加至渲染队列

    addQueen(current);
  }

  if (current.getter) {
    warn('This component has registered the useChapter method,' + ' which will cause the previous method to be invalid.');
  }

  current.getter = getter;
  return [getter, setter];
}

function useMouted(callback) {
  testFuntion(callback);
  var current = getInstance();
  current.mouted = current.mouted ? compose(current.mouted, callback) : callback;
}

function useUpdate(callback) {
  testFuntion(callback);
  var current = getInstance();
  current.update = current.update ? compose(current.update, callback) : callback;
}

function useUnMouted(callback) {
  testFuntion(callback);
  var current = getInstance();
  current.unMouted = current.unMouted ? compose(current.unMouted, callback) : callback;
}

export { TAG, createComponent, createElement, createRef, createStore, renderDOM, useChapter, useMouted, useUnMouted, useUpdate };
