const readline = require('readline')

module.exports = function ask (query = '', opts = {}) {
  return new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    let answer = null

    rl._writeToOutput = function (stringToWrite) {
      if (typeof stringToWrite !== 'string') throw new Error('Invalid arg type')
      if (this.output === null || this.output === undefined) return

      if (opts.oninput) {
        const value = stringToWrite.trim()

        if (opts.oninput(value)) {
          answer = value
          rl.close()
        }

        return
      }

      const end = stringToWrite === '\r\n' || stringToWrite === '\n'

      if (!opts.muted || end) {
        this.output.write(stringToWrite)
        return
      }

      const clear = '\x1B[2K\x1B[200D'
      // const typing = (rl.line.length % 2 === 0) ? '-' : '+'

      this.output.write(clear + query /* + typing */)
    }

    rl.question(query, function ($answer) {
      answer = $answer
      rl.close()
    })

    rl.once('close', function () {
      if (opts.clear) clearLine(answer === null)
      else if (answer === null) process.stdout.write('\r\n')

      if (opts.muted) rl.history = [] // rl.history.slice(1)

      resolve(answer)
    })
  })
}

function clearLine (sameLine) {
  if (sameLine) {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
  } else {
    process.stdout.cursorTo(0)
    process.stdout.moveCursor(0, -1)
    process.stdout.clearLine(1)
  }
}
