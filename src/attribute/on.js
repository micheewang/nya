export default function (element, value) {
  let ref = element.ref;
  for (let i in value) {
    ref.addEventListener(i, value[i]);
  }
}
