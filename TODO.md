# TODO

- runtime 优化

  1. 通过 proxy 代理 data 来收集依赖

  ```javascript
  createComponet(() => {
    //这里的data被替换为proxy|getter
    return (data) => Div(data.value);
  });
  ```

  2. 通过占位符占位 element 中的实际值来获取依赖

  ```javascript
  createComponet(() => {
    //这里的data内的值被替换为占位符
    return (data) => Div(data.value);
  });
  ```

  用收集的依赖用于 (diff?) 或 (set + mapping? + get )

- other hooks

- ~~webpack compile => rollup compile~~

- for phone | native
