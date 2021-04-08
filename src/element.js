'use strict';

// 基本虚拟节点
// new $Element('div')
// new $Element('div','test')
// new $Element('div',['test'])
// new $Element('div',{})
// new $Element('div',{},['test'])
// new $Element('div',{},'test')
export class $Element {
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

export function isElement(con) {
  return con instanceof $Element;
}

export function createElement(tagName, attrs, children) {
  let con = new $Element(tagName, attrs, children);
  return con;
}

//柯里化
export const TAG = window.Proxy
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
