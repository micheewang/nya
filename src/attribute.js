const tagReg = new Map();

const allAttribute = {};
tagReg.set(/[a-zA-Z]+/, allAttribute);

allAttribute.ref = function (element, attrValue) {
  attrValue(element.ref);
};

export function testAttribute(element, attrName, attrValue) {
  for (let [reg, value] of tagReg.entries()) {
    if (reg.test(element.tagName) && value[attrName]) {
      value[attrName](element, attrValue);
      return true;
    }
  }
  return false;
}
