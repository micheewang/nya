import babel from 'rollup-plugin-babel';

// rollup.config.js
function getConfig(format) {
  return {
    input: 'src/index.js',
    output: {
      file: `./dist/index.${format}.js`,
      format,
      name: 'nya',
    },
    plugins: [
      babel({
        exclude: 'node_modules/**', // 只编译我们的源代码
      }),
    ],
  };
}

export default getConfig(process.env.TARGET);