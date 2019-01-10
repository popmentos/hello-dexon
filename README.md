# Hello World DEXON

[![Join the chat at https://gitter.im/dexon-foundation/DApp](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/dexon-foundation/DApp)


This is a project that use minimum Contract Code with minimum Javascript Code in order to help you to get started. Within this simple Smart contract, it utilizes DEXON's unbiased on-chain randomness.


- Interaction between RPC node and Smart contract by running DEXON-RPC locally and to deploy Smart contract on it.
- Once the contract lives on the DEXON-RPC, you would start to use Web3.js as a communicator between frontend and RPC.
- By providing DekuSan(provider) to Web3.js, an user is able to send DXN token, check balance and interact with different contracts on DEXON-RPC via DekuSan wallet.


## Requirement/Installation

- Check List
  - [ ] Node Installed
  - [ ] Node Version: ^8.10.0 

1. `git clone https://github.com/dexon-foundation/hello-dexon.git`
2. `cd hello-dexon`
3. `npm install` or `yarn`
4. (Optional) Install dexon-truffle globally `npm install -g @dexon-foundation/truffle`
5. [DekuSan Extension](https://dexon.org/faucet)
6. Copy `secret.js.sample` to `secret.js`.
7. Set the `mnemonic` in `secret.js`.

## Getting Started
1. Run local DEXON-RPC server `npm run rpc`
2. Deploy smart contract to DEXON-RPC `npm run migrate:development`
3. Start WebApp `npm run watch`

## Compile
1. `npm run compile` or `dexon-truffle compile`

## Test
1. Run local DEXON-RPC server `npm run rpc`
2. `npm run test`

## Deploy contract (on DEXON testnet)
1. Copy `secret.js.sample` to `secret.js`.
2. Set the `mnemonic` in `secret.js`.
3. `npm run migrate:testnet` or `dexon-truffle migrate --network=testnet`
