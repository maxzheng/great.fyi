import babel from 'rollup-plugin-babel'
import builtins from 'rollup-plugin-node-builtins'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
// import { uglify } from "rollup-plugin-uglify"


export default {
  input: 'web/app.js',
  output: {
    file: 'static/webapp.js',
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
    resolve({preferBuiltins: true}),
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
          'PureComponent',
        ],
        'node_modules/react-dom/index.js': ['render', 'hydrate'],
        'node_modules/react-is/index.js': [
          'ForwardRef',
          'isElement',
          'isValidElementType',
        ],
        'node_modules/prop-types/index.js': [
          'elementType',
        ]
      }
    }),
    builtins(),
//    uglify()
  ]
};
