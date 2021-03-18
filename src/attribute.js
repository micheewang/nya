/**
 * element的属性处理
 */

import { testFuntion } from './tool';

const tagReg = new Map();

const allAttribute = {};
//字母类属性值
tagReg.set(/[a-zA-Z]+/, allAttribute);

//ref特殊处理
allAttribute.ref = function (element, attrValue) {
  testFuntion(attrValue, 'The ref parameter must be a function');
  //执行传入的函数
  attrValue(element.ref);
};

export function testAttribute(element, attrName, attrValue) {
  for (let [reg, value] of tagReg.entries()) {
    //正则匹配
    if (reg.test(element.tagName) && value[attrName]) {
      value[attrName](element, attrValue);
      return true;
    }
  }
  return false;
}
