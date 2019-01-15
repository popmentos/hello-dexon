const Hello = artifacts.require("Hello")

contract('Hello Contract', (accounts) => {
  let helloContract

  before(async () => {
    helloContract = await Hello.deployed().then(instance => instance.contract)
  })

  it("web3 should have 0 as default value", async function() {
    const number = await helloContract.methods.get().call()
    assert.equal(number.toString(), '0')
  })

  it("web3 should update random number without error", async function() {
    await helloContract.methods.update().send({
      from: accounts[0],
    })
  })

  it("should return generated random number", async function() {
    const number = await helloContract.methods.get().call()
    assert.notEqual(number.toString(), '0')
  })

})
