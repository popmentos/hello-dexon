# Hello DEXON

### This is a project that use minimum Contract Code with minimum Javascript Code in order to help you to get started. Within this simple smart contract, it is utilizing DEXON's unbiased randomness.

## What you can learn from this project

- The Interaction between RPC and Smart contract by running DEXON-RPC locally and to deploy smart contract on it.
- Once the contract lives on the DEXON-RPC, you would start to Web3 as a communicator between your Frontend and RPC.
- By providing Dekusan(provider) to Web3.js, a suer is able to send money, check balance, interacting with different contracts on DEXON-RPC via Dekusan Wallet.


## Requirement/Installation
1. `git clone https://github.com/dexon-foundation/hello-dexon.git`
2. `cd hello-dexon`
3. `npm install` or `yarn`
4. (Optional) Install dexon-truffle globally `npm install -g @dexon-foundation/truffle`
5. [Dekusan Extension](https://dexon.org/faucet)
6. Copy `secret.js.sample` to `secret.js`.
7. Set the `mnemonic` in `secret.js`.

## Get started
1. Run local DEXON-RPC server `yarn run rpc`
2. Deploy smart contract to DEXON-RPC `yarn run migrate:development`
3. Start WebApp `yarn run watch`

## Compile
1. `yarn run compile` or `dexon-truffle compile`

## Test
1. Run local DEXON-RPC server `yarn run rpc`
2. `yarn run test`

## Deploy contract (on DEXON testnet)
1. Copy `secret.js.sample` to `secret.js`.
2. Set the `mnemonic` in `secret.js`.
3. `yarn run migrate:testnet` or `dexon-truffle migrate --network=testnet`
