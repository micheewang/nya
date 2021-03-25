/**
 * element的属性处理
 *
 */
import { memoize, testFuntion } from './tool';

const tagReg = new Map();

const allAttribute = {};
//字母类属性值
tagReg.set(/[a-zA-Z]+/, allAttribute);

const getHandler = memoize(function (tagName, attrName) {
  for (let [reg, value] of tagReg.entries()) {
    //正则匹配
    if (reg.test(tagName) && value[attrName]) {
      return value[attrName];
    }
  }
  return false;
});

//
allAttribute.ref = function (element, attrValue) {
  testFuntion(attrValue, 'The ref parameter must be a function');
  //执行传入的函数
  attrValue(element.ref);
};

export function testAttribute(element, attrName, attrValue) {
  const tagName = element.tagName;
  let handler = getHandler(tagName, attrName);
  if (handler) {
    handler(element, attrValue);
    return true;
  } else {
    return false;
  }
}
