// 基本虚拟节点
// new $Element('div')
// new $Element('div','test')
// new $Element('div',['test'])
// new $Element('div',{})
// new $Element('div',{},['test'])
// new $Element('div',{},'test')
class $Element {
  constructor(tagName, attrs, children) {
    if (typeof attrs === 'string' || isElement(attrs)) {
      children = [attrs];
      attrs = {};
    } else if (Array.isArray(attrs)) {
      children = attrs;
      attrs = {};
    }

    attrs = attrs || {};
    children = children
      ? Array.isArray(children)
        ? children
        : [children]
      : [];

    this.tagName = tagName;
    //dom实例
    this.ref = null;

    //runtime optimization
    this.mark = [];
    this.attrs = attrs;
    this.children = children;
  }
}

function isElement(con) {
  return con instanceof $Element;
}

function createElement(tagName, attrs, children) {
  let con = new $Element(tagName, attrs, children);
  return con;
}

//柯里化
const TAG = window.Proxy
  ? new Proxy(
      {},
      {
        get(obj, prop) {
          if (!obj.hasOwnProperty(prop)) {
            obj[prop] = function (attrs, children) {
              return new $Element(prop, attrs, children);
            };
          }
          return obj[prop];
        },
      }
    )
  : (function () {
      const contain = {};
      const htmlTag = (
        'html,body,base,head,link,meta,style,title,' +
        'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
        'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
        'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
        's,samp,small,span,strong,sub,sup,time,u,let,wbr,area,audio,map,track,video,' +
        'embed,object,param,source,canvas,script,noscript,del,ins,' +
        'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
        'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
        'output,progress,select,textarea,' +
        'details,dialog,menu,menuitem,summary,' +
        'content,element,shadow,template,blockquote,iframe,tfoot'
      ).split(',');
      htmlTag.forEach((tagName) => {
        contain[
          tagName.slice(0, 1).toUpperCase() + tagName.slice(1)
        ] = function (attrs, children) {
          return new $Element(tagName, attrs, children);
        };
      });
      return contain;
    })();

const [warn, error, log] = [
  'warn',
  'error',
  'info',
  'log',
].map((v) => (...arg) => console[v](...arg));

//合并函数为一个函数
function compose(...fns) {
  return function (...arg) {
    fns.forEach((fn) => fn.call(this, ...arg));
  };
}

function memoize(fn) {
  var memoize = function (...args) {
    var cache = memoize.cache;
    var address = args.join(',');
    if (!Object.hasOwnProperty.call(cache, address)) {
      cache[address] = fn.apply(this, args);
    }
    return cache[address];
  };
  memoize.cache = {};
  return memoize;
}

function testFuntion(a, msg) {
  if (!isFunction(a)) {
    throw new TypeError(msg || 'Parameter must be a function.');
  }
}

function isFunction(f) {
  return typeof f === 'function';
}

//extends $Element
//keep Component and $Element(name | attrs | children) the same behavior
class Component extends $Element {
  constructor(tagName, props, slot, $const) {
    super(tagName, props, slot);

    //外层逻辑函数
    this.const = $const;
    //内层虚拟节点模板函数
    this.templet = null;
    this.vNode = null;
    this.parentNode = null;

    //data getter
    this.getter = null;

    //lifecycle
    this.mouted = null;
    this.update = null;
    this.unMouted = null;
    //....
  }
}

function composeArgs(...args) {
  //These component belong to one type.
  const name = Symbol('Component');
  return function (props, slot) {
    return new Component(name, props, slot, ...args);
  };
}

function isComponent(con) {
  return con instanceof Component;
}

function createComponent(f) {
  testFuntion(f);
  return composeArgs(f);
}

// 组件间的数据通信,只管运输,不管储存
// 是一个仓库一对多组件的形式
// 只能有一个提供者,但可以有多个接收者
// 提供者也可以作为接受者
class Store {
  constructor(request, response) {
    testFuntion(request);

    this.request = request;
    this.response = response;
    this.wants = new Set();
  }

  //主动发送给所有的组件
  emit() {
    this.wants.forEach((want) => want());
  }

  //解绑
  unbind(want) {
    if (this.wants.has(want)) {
      this.wants.delete(want);
    }
  }

  //创建want|send
  createBranch(receiver) {
    testFuntion(receiver);

    //want
    const want = () => {
      this.request(orign, orign.from);
    };

    //send
    const send = (data) => {
      if (this.response) {
        this.response(data, orign.from);
      } else {
        warn('The store has no function to receive this parameter');
      }
    };

    //传递给request函数的参数
    function orign(data) {
      receiver(data);
    }

    //监控来源
    orign.from = function () {
      return { receiver, want, send };
    };

    this.wants.add(want);
    return [want, send];
  }
}

function createStore(...args) {
  return new Store(...args);
}

//createRef
function createRef() {
  // 
  return function f(ref) {
    f.current = ref;
  };
}

function ref (element, attrValue) {
  testFuntion(attrValue, 'The ref parameter must be a function');
  //执行传入的函数
  attrValue(element.ref);
}

function className (element, value) {
  var ref = element.ref;
  let type = typeof value;
  if (type === 'string') {
    ref.classList = value;
  } else {
    let list = [];
    if (Array.isArray(value)) {
      list = value;
    } else {
      for (let i in value) {
        if (value[i]) {
          list.push(i);
        }
      }
    }

    ref.classList = list.join(' ');
  }
}

function on (element, value) {
  let ref = element.ref;
  for (let i in value) {
    ref.addEventListener(i, value[i]);
  }
}

/**
 * element的属性处理
 *
 */

const tagReg = new Map();

//字母类属性值
tagReg.set(/[a-zA-Z]+/, {
  ref,
  on,
  class: className,
});

const getHandler = memoize(function (tagName, attrName) {
  for (let [reg, value] of tagReg.entries()) {
    //正则匹配
    if (reg.test(tagName) && value[attrName]) {
      return value[attrName];
    }
  }
  return false;
});

function testAttribute (element, attrName, attrValue) {
  const tagName = element.tagName;
  let handler = getHandler(tagName, attrName);
  if (handler) {
    handler(element, attrValue) === false;
    return true;
  } else {
    return false;
  }
}

//当前的活动组件
const current_node = {
  current: null,
};

//获取当前的活动组件
function getInstance(errorMessage) {
  let current = current_node.current;
  if (!current) {
    throw new Error(errorMessage || 'hooks must be called inside Component');
  }
  return current;
}

/*
 * render queen
 * type = Array<{timestamp: number, component: Component, skip: boolean}>
 */
const renderQueen = [];

/**
 *
 * @param {Component} component
 */
function addQueen(component) {
  if (
    renderQueen.push({
      timestamp: +new Date(),
      component,
    }) === 1
  ) {
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

function updateComponet({ timestamp, component }) {
  // TODO 加入diff | filber
  let oldVnode = component.vNode;
  let newVnode = getVNode(component);
  let el = elementRender.call(newVnode);
  component.vNode = newVnode;

  component.parentNode.replaceChild(el, component.ref);
  component.ref = el;
  //卸载触发
  triggerEvents(oldVnode, 'unMouted');
  //当前组件更新
  triggerEventsFloor(component, 'update');
  //子组件全部触发mouted
  triggerEvents(newVnode, 'mouted');
}

//递归触发event
function triggerEvents(node, eventName) {
  let children = null;
  if (isComponent(node)) {
    children = [node.vNode];
    isFunction(node[eventName]) && node[eventName]();
  } else {
    children = node.children;
  }

  children.forEach((cNode) => {
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
    throw new Error(`The root element must mount the component.`);
  }
}

/**
 * vnode => element
 */
function elementRender(parentNode) {
  let { tagName, attrs, children } = this;
  const ref = (this.ref = document.createElement(tagName));

  for (let key in attrs) {
    const value = attrs[key];
    //属性匹配/设置函数
    if (testAttribute(this, key, value)) {
      continue;
    }
    //boolean值直接赋值readOnly等
    if (typeof value === 'boolean') {
      ref[key] = value;
    }
    //事件 value为函数
    else if (/on[A-Z][a-zA-Z]+/.test(key)) {
      testFuntion(value);
      ref[key.toLowerCase()] = attrs[key];
    }
    //其他类型
    else {
      ref.setAttribute(key, value);
    }
  }

  /**
   * 子元素渲染
   */
  for (let node of children) {
    if (typeof node === 'function') {
      node = node();
    }

    //把这些值排除在外就可以方便的在数组里使用表达式
    if (node === undefined || node === null || node === '') {
      continue;
    }
    //由于继承关系有可能是element,也可能是component
    if (isElement(node)) {
      if (isComponent(node)) {
        componentRender.call(node, ref);
      } else {
        elementRender.call(node, ref);
      }
    } else {
      //为本节点
      let textNode = document.createTextNode(String(node));
      ref.appendChild(textNode);
    }
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
  this.parentNode = parentNode;

  //vnode模板函数为空时,执行
  if (this.templet === null) {
    //设置当前的节点为活动节点
    current_node.current = this;
    //组件的props和slot
    let renderData = {
      props: this.attrs,
      slot: this.children,
    };
    //const指的传入createComponent的函数,里面使用的hooks就可以指向当前的节点
    let templet = (this.templet = this.const(renderData));
    testFuntion(
      templet,
      'Creating a component must return a function that returns the virtual node'
    );
    //清空当前节点
    current_node.current = null;
  }

  //执行vnode模板获取虚拟节点
  let vNode = (this.vNode = getVNode(this));

  if (!isElement(vNode)) {
    error(
      'Creating a component must return a function that returns the virtual node'
    );
    return;
  }

  this.ref = elementRender.call(vNode, parentNode);

  //生命周期--挂载
  triggerEventsFloor(this, 'mouted');
}

//TODO 通过proxy收集依赖
function getVNode(component) {
  if (component.templet) {
    if (component.getter) {
      return component.templet(component.getter());
    } else {
      return component.templet();
    }
  }
}

//数据hooks
function useChapter(chapter) {
  //获取当前active的虚拟节点
  let current = getInstance();
  //局部变量保存值
  let currentData = chapter;

  //getter
  function getter() {
    return currentData;
  }

  //setter
  function setter(value) {
    //缓存新值
    currentData = value;
    //添加至渲染队列
    addQueen(current);
  }

  if (current.getter) {
    warn(
      'This component has registered the useChapter method,' +
        ' which will cause the previous method to be invalid.'
    );
  }
  current.getter = getter;
  return [getter, setter];
}

function useMouted(callback) {
  testFuntion(callback);
  let current = getInstance();
  current.mouted = current.mouted
    ? compose(current.mouted, callback)
    : callback;
}

function useUpdate(callback) {
  testFuntion(callback);
  let current = getInstance();
  current.update = current.update
    ? compose(current.update, callback)
    : callback;
}

function useUnMouted(callback) {
  testFuntion(callback);
  let current = getInstance();
  current.unMouted = current.unMouted
    ? compose(current.unMouted, callback)
    : callback;
}

export { TAG, createComponent, createElement, createRef, createStore, renderDOM, useChapter, useMouted, useUnMouted, useUpdate };
//# sourceMappingURL=index.esm.js.map
