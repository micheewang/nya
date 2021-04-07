# 数据驱动简单实现

## 设计思路

- **最小单元** DOM 节点是 Documente 文档树能够操作的最小单元,要想实现一个完全由数据驱动的框架,首先要有一个能够描述真实节点的数据结构,最简单的想法就是用虚拟节点构建一颗与真实 DOM 节点有映射关系的树,然后通过一个渲染方法渲染为真实节点.

- **最简实现**

  ```javascript
  //创建虚拟节点并返回
  const h = (name, children) => {
    /***/
  };

  //创建响应式数据
  const data = {
    value: 'hello, world!',
    get text() {
      return this.value;
    },
    set text(value) {
      this.value = value;
      render();
    },
  };

  //创建树的方法
  const tree = () => h('div', [Component(data.text)]);

  //组件
  const Component = (text) => h('span', [text]);

  //虚拟节点 => 真实DOM 的渲染方法
  const renderDOM = (tree, root) => {
    /***/
  };

  const render = () => {
    //渲染为DOM结构
    renderDOM(tree(), document.getElementById('root'));
  };
  ```

- **高阶组件** 虽然由虚拟节点构成的 tree 已经可以实现响应式和简单的组件化,但数据改变后需要通过创建一颗完整的树从开头开始渲染(或 diff),这无疑是一种浪费.此时我们可以引入高阶组件,保存每个组件的状态,状态改变时就可以从这个组件开始重渲染.

  ```javascript
  /**
   *这个函数不能直接在 tree 中使用,需要在外部包装一层高阶函数.
   *高阶函数的作用是返回一个能函数,这个函数可以返回虚拟节点,
   *并保留初始函数内部的作用域上下文
   */
  function vueComponent() {
    //这里只会执行一次.

    //这里data是响应式数据
    const data = reactive({ text: 'hello, world' });
    //返回一个函数
    return () => h('div', [h('span', [data.text])]);
  }

  function reactComponent() {
    //这个函数会执行多次,

    /**
     * 因为作用域的原因,需要将数据保存起来,并每次执行时返回.
     */
    const [value, setValue] = useEffect('hello, world');
    //直接返回一个虚拟节点树
    return h('div', [h('span', [value])]);
  }

  /**
   * 用于数据改变后组件的更新
   */
  function update() {
    /***/
  }

  /*
   * 执行一次,并保留组件的作用域上下文
   */
  function renderDOM() {
    /***/
  }
  ```

- **hooks 的实现** 在高阶组件内部执行时,hooks 需要获得当前执行组件的实例.在组件执行前存储当前的组件上下文,并在结束后删除,这样便能够让组件和 hooks 关联起来.

## Why not

### 为什么要引入虚拟 DOM

- **性能优势**虚拟 DOM 和真实 DOM 是一一对应的关系。由于传统修改 DOM 代价昂贵，虚拟 DOM 引入后， 可以比较内存中新旧虚拟节点，找出最小更新，以减少操作 DOM 引起重排、重绘的性能消耗。

  (当然如果 diff 算法+最小修改消耗的性能大于直接修改 dom 性能，这就是不成立的)

  而且修改虚拟节点并不会直接引起 DOM 修改，而是将此次修改放入重载队列，当条件满足时，引发 diff，将队列中所有的修改合并处理，这样就可以让浏览器以一次重载、重绘的代价修改 DOM。

- **跨端优势**虚拟 DOM 相当于一层映射。在不同平台同一套代码，通过使用使用不同的渲染策略，就可以在不同平台上适配。比如 React 中虚拟 DOM 最终会映射为浏览器 DOM 树，而 RN 中虚拟 DOM 会通过 JavaScriptCore 映射为原生控件树.

### hooks/composition 优缺点

- **react hooks**: 破坏函数式编程不依赖外部状态的思想、需要保证 hook 的调用顺序、反人类的第二参数、状态不同步(闭包)、相对的换来的时相对清爽的代码风格和更少的代码量
- **vue composition**:相对更深的嵌套关系、响应式数据,只能在使用时获取、只执行一次 setup,减少心智负担
