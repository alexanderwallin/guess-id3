import commonJS from 'rollup-plugin-commonjs'

const externalModules = [
  'fs',
  'path',
  'glob-all',
  'browser-id3-writer',
  'minimist',
]

export default [
  {
    entry: 'src/index.js',
    format: 'cjs',
    plugins: [commonJS()],
    dest: 'dist/index.js',
    external: externalModules,
  },
  {
    entry: 'src/cli.js',
    format: 'cjs',
    plugins: [commonJS()],
    dest: 'dist/cli.js',
    banner: '#!/usr/bin/env node',
    external: externalModules,
  },
]
