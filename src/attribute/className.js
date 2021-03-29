export default function (element, value) {
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
