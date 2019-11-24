import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
// import { uglify } from "rollup-plugin-uglify"


export default {
  input: 'web/frontend.js',
  output: {
    file: 'static/frontend.js',
    format: 'iife',
    name: 'main'
  },
  plugins: [
    replace({
        "process.env.NODE_ENV": JSON.stringify('development')
      }),
    babel({
        exclude: "node_modules/**"
      }),
    resolve(),
    commonjs({
      include: 'node_modules/**',
      // left-hand side can be an absolute path, a path
      // relative to the current directory, or the name
      // of a module in node_modules
      namedExports: {
        'node_modules/react/index.js': [
          'Children',
          'cloneElement',
          'Component',
          'createContext',
          'createElement',
          'isValidElement',
        ],
        'node_modules/react-dom/index.js': ['render', 'hydrate'],
        'node_modules/react-is/index.js': [
          'ForwardRef',
          'isElement',
          'isValidElementType',
        ]
      }
    }),
//    uglify()
  ]
};
