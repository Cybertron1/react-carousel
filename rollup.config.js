import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import scss from 'rollup-plugin-scss'
import minify from 'rollup-plugin-babel-minify';
import { eslint } from 'rollup-plugin-eslint';

// @ts-ignore
import pkg from './package.json';

const config = [
  {
    input: 'src/index.js',
    output: {
      file: pkg.module,
      sourcemap: true,
      format: 'esm',
    },
    external: [
      'react'
    ],
    plugins: [
      resolve(
        {
          extensions: ['.js', '.jsx']
        }),
      commonjs({
        include: /node_modules/
      }),
      eslint({
        exclude: ["**/*.scss", "node_modules/**"]
      }),
      babel({
        babelrc: true,
        exclude: './node_modules/**/*'
      }),
      scss(),
      minify({ comments: false })
    ]
  }
];

module.exports = config;



