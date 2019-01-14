const Hello = artifacts.require("Hello");

contract('Hello Contract With Web3', async function(accounts) {
  const Web3 = require('web3');
  const testRPCEndpoint = 'http://127.0.0.1:8545';
  
  const [,secondAccount] = accounts;
  const deployedHelloContract = await Hello.deployed()
  const web3 = new Web3(new Web3.providers.HttpProvider(testRPCEndpoint));
  const helloContract = new web3.eth.Contract(
    deployedHelloContract.abi,
    deployedHelloContract.address,
  )

  it("web3 should have 0 as default value", async function() {
    const number = await helloContract.methods.get().call();
    assert.equal(number.toString(), '0');
  });

  it("web3 should update random number without error", async function() {
    await helloContract.methods.update().send({
      from: secondAccount,
    });
  });

  it("should return generated random number", async function() {
    const number = await helloContract.methods.get().call();
    assert.notEqual(number.toString(), '0');
  });

});

contract('Hello Contract', async function(accounts) {
  let HelloContract;
  let oldRandValue;

  it("should deploys Hello contract", async function() {
    HelloContract = await Hello.new();
  });

  it("should have 0 as default value", async function() {
    const number = await HelloContract.get();
    assert.equal(number.toString(), '0');
  });

  it("should update random number without error", async function() {
    await HelloContract.update();
  });
  
});
