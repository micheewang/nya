import plugBabel from 'rollup-plugin-babel';
import { terser as plugTerser } from 'rollup-plugin-terser';

const babel = plugBabel({ exclude: 'node_modules/**' });
const terser = plugTerser();

const config = {
  esmw: ['esm', [], true],
  esm: ['esm', [terser], false],
  umd: ['umd', [babel, terser], false],
  cjs: ['cjs', [babel, terser], false],
};

function getRollupConfig(format, plugins, sourcemap) {
  return {
    input: 'src/index.js',
    output: {
      file: `./dist/index.${format}.js`,
      sourcemap,
      format,
      name: 'nya',
    },
    plugins,
  };
}

export default getRollupConfig(...config[process.env.TARGET]);
