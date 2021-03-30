//TODO
// 0. 在渲染前收集数据依赖
// 1. 根据前后数据diff,来判断是否diff某节点
// 2. 判断是否为

//数据的diff,用于值改变后通过对比依赖来获取需要改变的节点
export function getDiff(obj1, obj2, path = []) {
  let diff = [];
  if (isNotObject(obj1) || isNotObject(obj2)) {
    if (obj1 !== obj2) {
      diff.push(path);
    }
  } else {
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      obj1.forEach((value, index) => {
        let _path = path.concat(index);
        let _diff = getDiff(value, obj2[index], _path);
        diff = Array.prototype.concat.apply(_diff, diff);
      });
    } else {
      for (const key in obj1) {
        let _path = path.concat(key);
        let _diff = getDiff(obj1[key], obj2[key], _path);
        diff = Array.prototype.concat.apply(_diff, diff);
      }
    }
  }
  return diff;
}