# ask-readline

Ask a question for CLI using readline, supports muted input

```
npm i ask-readline
```

## Usage
```javascript
const ask = require('ask-readline')

main()

async function main () {
  const username = await ask('Input your username (clear): ', { clear: true })
  const password = await ask('Input your password (clear and muted): ', { clear: true, muted: true })
  const twoFactorAuth = await ask('Input your 2fa (keep but muted): ', { clear: false, muted: true })
  const alias = await ask('Input your alias (default): ')

  console.log({ username, password, twoFactorAuth, alias })
}
```

## API

#### `const answer = await ask(question, [options])`

`answer` is a string or `null`.\
If user does `CTRL+C` then answer is `null`.

Available `options`:
```js
{
  clear: false,
  muted: false
}
```

`clear` removes the line where the question was printed.\
`muted` ensures that input is hidden, and not written to `stdout`.

## License
MIT
