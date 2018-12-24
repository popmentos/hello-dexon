const ganache = require("@dexon-foundation/ganache-cli")
const truffleConfig = require('./truffle')
const secret = require('./secret')
const mnemonic = secret.mnemonic
const {
  PORT = 8545,
  NETWORK_ID = 5777,
} = process.env

const server = ganache.server({
  network_id: NETWORK_ID,
  hdPath: "m/44'/237'/0'/0/",
  mnemonic,
})

server.listen(PORT, function(err, blockchain) {
  console.log(`RPC running on port ${PORT}`)
})
