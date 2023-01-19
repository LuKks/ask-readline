const ask = require('./index.js')

main()

async function main () {
  const username = await ask('Input username (clear): ', { clear: true })
  const password = await ask('Input password (clear and muted): ', { clear: true, muted: true })
  const twoFactorAuth = await ask('Input 2fa (keep but muted): ', { clear: false, muted: true })
  const alias = await ask('Input alias (default): ')

  console.log({ username, password, twoFactorAuth, alias })
}
