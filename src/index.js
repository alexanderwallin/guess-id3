import fs from 'fs'
import path from 'path'
import glob from 'glob-all'
import ID3Writer from 'browser-id3-writer'

const defaultOpts = {
  dry: false,
  verbose: false,
}

export default function guessId3(filenamePattern, options) {
  const mergedOpts = Object.assign(defaultOpts, options)
  const files = glob.sync(filenamePattern)

  if (mergedOpts.verbose === true) {
    console.log('Matched files:', files)
  }

  return Promise.all(
    files.map(filename => {
      return new Promise((resolve, reject) => {
        const { artist, title } = extractSongInfoFromFilename(filename)

        if (mergedOpts.dry === true) {
          console.log(filename, '->', { artist, title })
        } else {
          const fileContents = fs.readFileSync(filename)

          if (mergedOpts.verbose === true) {
            console.log('Writing follow tag to', filename, ':')
            console.log('  TIT2 (song title):', title)
            console.log('  TPE2 (artist name):', artist)
          }

          const writer = new ID3Writer(fileContents)
          writer.setFrame('TIT2', title)
          writer.setFrame('TPE2', artist)
          writer.setFrame('TPE1', [artist])
          writer.addTag()

          const taggedSongBuffer = Buffer.from(writer.arrayBuffer)
          fs.writeFileSync(filename, taggedSongBuffer)
        }

        resolve()
      })
    })
  )
}

function extractSongInfoFromFilename(filename) {
  const [artist, ...titleParts] = path
    .basename(filename)
    .replace(/\.\w+$/, '')
    .split(/\s-\s/)
  const title = titleParts.join(' - ')

  return { artist, title }
}
