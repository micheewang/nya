import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

// rollup.config.js
function getConfig(format) {
  return {
    input: 'src/index.js',
    output: {
      file: `./dist/index.${format}.js`,
      // sourcemap: true,
      format,
      name: 'nya',
    },
    plugins: [
      babel({
        exclude: 'node_modules/**', // 只编译我们的源代码
      }),
      terser(),
    ],
  };
}

export default getConfig(process.env.TARGET);
