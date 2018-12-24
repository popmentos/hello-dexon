const Web3 = require('web3')
const contractHelloJSON = require('../build/contracts/Hello.json')

function modifyDomElement({ id, content }) {
  document.getElementById(id).innerHTML = content
}

const startInteractingWithWeb3 = (web3) => {
  let activeAccount = ''
  let netId = ''
  
  /*
  * To Fetch Wallet Information
  *
  * In order to make things as readable as possible,
  * we will be using polling here.
  */
  setInterval(() => {
    /* Update Wallet Address */
    web3
      .eth
      .getAccounts()
      .then(([account]) => {
        activeAccount = account
        modifyDomElement({ id: 'wallet-address', content: `Wallet: ${activeAccount}` })
      })

    if(activeAccount) {
      /* Update Wallet Balance */
      web3
        .eth
        .getBalance(activeAccount).then(amount =>
          modifyDomElement({ id: 'wallet-balance', content: `Balance ${amount}` })
        )
    }


  }, 1000)

  /* To Use web3 to communicate with RPC */
  web3
    .eth
    .net
    .getId()
    .then(network_id => {
      const contractHandlerHelloWorld = new web3.eth.Contract(
        contractHelloJSON.abi,
        contractHelloJSON.networks[network_id].address
      )
      
      /* Update Contract Data with polling */
      setInterval(() => {
        contractHandlerHelloWorld
          .methods
          .value()
          .call((error, value) => {
            modifyDomElement({ id: 'contract-value', content: `Contract Value ${value}` })
          })  
      }, 1000);

      /*
      * If the contract contains the logic of "emit events"
      * You can
      * 1. "getPastEvents" to get all the emitted event in the past
      * 2. "WebsocketProvider" listening event that is emitted
      */
      
      /*
      * "getPastEvents" to get all the emitted event in the past
      */
      contractHandlerHelloWorld
        .getPastEvents('UpdateNumber', { fromBlock: 0, toBlock: 'latest' })
        .then(data => console.log('all past emitted event', '\n',data))

      /*
      * add WebsocketProvider to web3
      * start listening to different event
      */
      const websocketEndpointMapping = (netId) => ({
        238: 'ws://testnet.dexon.org:8546',
        5777: 'ws://localhost:8545'
      })[netId || 5777]
      const wsEndpoint = websocketEndpointMapping(network_id)
      const wsWeb3 = new Web3(new Web3.providers.WebsocketProvider(wsEndpoint))
      const contractWsHandlerHelloWorld = new wsWeb3.eth.Contract(
        contractHelloJSON.abi,
        contractHelloJSON.networks[network_id].address
      )
      
      contractWsHandlerHelloWorld
        .events
        .UpdateNumber({}, (err, { returnValues }) => {
          console.log('value from socket', '\n',returnValues[0])
        })

      /* Change the state of the contract */
      document
        .getElementById('update-button')
        .addEventListener('click', () => {
          contractHandlerHelloWorld
            .methods
            .update()
            .send({ from: activeAccount })
        })
    })
}

window.addEventListener('load', async() =>{
  if(window.dexon) {
    const provider = window.dexon

    /* Ask User's permission with a popup */
    await provider.enable()
    
    /*
    * Initiate a web3 instance with provider.
    * In this case, we are using `window.dexon`
    * window.dexon as a provider is injected 
    * when you enable Dekusan wallet as extension
    */
    const web3 = new Web3()
    web3.setProvider(window.dexon)
    startInteractingWithWeb3(web3)

  }    
})

