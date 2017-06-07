import parseArgs from 'minimist'

import guessId3 from './index.js'

const args = parseArgs(process.argv.slice(2), {
  boolean: ['dry', 'verbose'],
})
const globs = args._

if (args.help || args.h) {
  console.log('guess-id3 [--dry] [--verbose] <pattern> [<pattern> ...]')
  process.exit(0)
}

const options = {
  dry: args.dry === true,
  verbose: args.verbose === true,
}

guessId3(globs, options)
  .then(() => console.log('Done.'))
  .catch(err => console.error(err))
