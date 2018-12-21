const Web3 = require('web3')
const contractHelloJSON = require('../build/contracts/Hello.json')
const { networks } = require('../truffle')
const {
  network_id,
} = networks[process.env.network]

const socketEndpoint = 'ws://127.0.0.1:8545'


function modifyDomElement({ id, content }) {
  document.getElementById(id).innerHTML = content
}

function render() {
  const newDiv = document.createElement('div')
  const newContent = document.createTextNode('Hello DEXON') 
  const divWithContent = newDiv.appendChild(newContent)
  document.body.appendChild(divWithContent)
}

const initWeb3InstanceWithProvider = async (provider) => {
  document.getElementById('dekusan').remove()
  await provider.enable()
  const web3 = new Web3(provider)
  let activeAccount = ''
  const helloContract = new web3.eth.Contract(
    contractHelloJSON.abi,
    contractHelloJSON.networks[network_id].address
  )
  
  setInterval(() => {
    web3.eth.getAccounts()
    .then(([account]) => account)
    .then(account =>
      web3.eth.getBalance(account).then(amount => ({
        amount,
        account,
      }))
    )
    .then(x => {
      activeAccount = x.account

      modifyDomElement({ id: 'wallet-address', content: `Wallet: ${x.account}` })
      modifyDomElement({ id: 'wallet-balance', content: `Balance ${x.amount}` })
      helloContract
        .methods
        .value()
        .call((error, value) => {
          modifyDomElement({ id: 'current-value', content: `current value ${value}` })
        })
    })
  }, 1000)

  document
    .getElementById('update-button')
    .addEventListener('click', () => {
      helloContract
        .methods
        .update()
        .send({ from: activeAccount })
    })
  
}

const initWeb3SocketInstanceWithSocketEndpoint = (endpoint) => {
  const web3 = new Web3(endpoint)
  const helloContractWs = new web3.eth.Contract(
    contractHelloJSON.abi,
    contractHelloJSON.networks[network_id].address,
  )

  helloContractWs
    .getPastEvents('updateNumber', { fromBlock: 0, toBlock: 'latest' })
    .then(data => console.log('all past emitted event', '\n',data))
  
  helloContractWs
    .events
    .updateNumber({}, (err, { returnValues }) => {
      console.log('value from socket', '\n',returnValues[0])
    })
}

window.addEventListener('load', function(){
  render()
  if(window.dexon) {
    initWeb3InstanceWithProvider(window.dexon)
    initWeb3SocketInstanceWithSocketEndpoint(socketEndpoint)
  }    
})

