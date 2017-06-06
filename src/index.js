import fs from 'fs'
import path from 'path'
import glob from 'glob-all'
import ID3Writer from 'browser-id3-writer'

export default function guessId3(filenamePattern) {
  const files = glob.sync(filenamePattern)

  return Promise.all(
    files.map(filename => {
      return new Promise((resolve, reject) => {
        const { artist, title } = extractSongInfoFromFilename(filename)

        const fileContents = fs.readFileSync(filename)

        const writer = new ID3Writer(fileContents)
        writer.setFrame('TIT2', title)
        writer.setFrame('TPE2', artist)
        writer.addTag()

        const taggedSongBuffer = Buffer.from(writer.arrayBuffer)
        fs.writeFileSync(filename, taggedSongBuffer)

        resolve()
      })
    })
  )
}

function extractSongInfoFromFilename(filename) {
  const [artist, title] = path
    .basename(filename)
    .replace(/\.\w+$/, '')
    .split(/\s-\s/)
  return { artist, title }
}
