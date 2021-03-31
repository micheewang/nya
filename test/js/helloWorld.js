const { renderDOM, TAG } = nya;
const { H1 } = TAG;

renderDOM(H1('Hello, world!'), document.getElementById('root'));
