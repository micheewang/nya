/**
 * element的属性处理
 *
 */
import { memoize } from '../tool';
import ref from './ref';
import className from './className';
import on from './on';

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

export default function (element, attrName, attrValue) {
  const tagName = element.tagName;
  let handler = getHandler(tagName, attrName);
  if (handler) {
    handler(element, attrValue) === false;
    return true;
  } else {
    return false;
  }
}
