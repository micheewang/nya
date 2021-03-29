import { testFuntion } from "../tool";

export default function (element, attrValue) {
  testFuntion(attrValue, 'The ref parameter must be a function');
  //执行传入的函数
  attrValue(element.ref);
}
