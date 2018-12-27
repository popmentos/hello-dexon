# Hello DEXON

### This is a project that use minimum Contract Code with minimum Javascript Code in order to help you to get started. Within this simple Smart contract, it utilizes DEXON's unbiased on-chain randomness.

## What You Can Learn From This Project

- Interaction between RPC node and Smart contract by running DEXON-RPC locally and to deploy Smart contract on it.
- Once the contract lives on the DEXON-RPC, you would start to use Web3.js as a communicator between frontend and RPC.
- By providing DekuSan(provider) to Web3.js, an user is able to send DXN token, check balance and interact with different contracts on DEXON-RPC via DekuSan wallet.


## Requirement/Installation
1. `git clone https://github.com/dexon-foundation/hello-dexon.git`
2. `cd hello-dexon`
3. `npm install` or `yarn`
4. (Optional) Install dexon-truffle globally `npm install -g @dexon-foundation/truffle`
5. [DekuSan Extension](https://dexon.org/faucet)
6. Copy `secret.js.sample` to `secret.js`.
7. Set the `mnemonic` in `secret.js`.

## Getting Started
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
