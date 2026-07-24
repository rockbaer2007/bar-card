import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import serve from 'rollup-plugin-serve';

const dev = process.env.ROLLUP_WATCH;

const serveopts = {
  contentBase: ['./dist'],
  host: '0.0.0.0',
  port: 5000,
  allowCrossOrigin: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

const plugins = [
  nodeResolve({ browser: true }),
  commonjs(),
  typescript(),
  json(),
  dev && serve(serveopts),
  !dev && terser(),
];

export default [
  {
    input: 'src/bar-card.ts',
    output: {
      file: 'dist/bar-card.js',
      format: 'es',
      sourcemap: dev ? 'inline' : false,
    },
    plugins: [...plugins],
  },
];
