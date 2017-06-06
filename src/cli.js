import parseArgs from 'minimist'

import guessId3 from './index.js'

const args = parseArgs(process.argv.slice(2))
const globs = args._

guessId3(globs)
  .then(() => console.log('Done.'))
  .catch(err => console.error(err))
