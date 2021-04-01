import babel from 'rollup-plugin-babel';

// rollup.config.js
export default {
  input: 'src/index.js',
  output: {
    file: './dist/index.js',
    name: 'nya',
  },
  plugins:[
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    })
  ]
};
