# guess-id3

Extracts artist name and song title from filenames and writes them as ID3 v2.3 to those files.


## Installation

```sh
# For use in JavaScript
npm install guess-id3

# For use from the command line
npm install -g guess-id3
```


## Usage

### From the command line

```sh
$ guess-id3 [--dry] [--verbose] 'music/**/*.mp3'
```

### In JavaScript

```js
import guessId3 from 'guess-id3'

guessId3('music/**/*.mp3', { dry: false, verbose: false }).then(() => {
  console.log('Done!')
})
```


## API

### `guessId3(glob, options)`

Overwrites all files matched by `glob` with a buffer that contains ID3 metadata. The data is extracted from a file's name using [`guess-metadata`](https://www.npmjs.com/package/guess-metadata).  As an example, the filename `Artist Name - Song Title.mp3` gives `{ artist: 'Artist Name', title: 'Song Title' }`.

* `glob` - A glob accepted by [`glob-all`](https://www.npmjs.com/package/glob-all).
* `options`
  * `options.dry` - A boolean indicating whether just to tell what would have been done instead of doing it. Default is `false`.
  * `options.verbose` - Adds some console.log() statements. Default is `false`.


## License

UNLICENSED
