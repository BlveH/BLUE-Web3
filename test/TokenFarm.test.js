const { assert } = require("chai");

/* eslint-disable no-undef */
const DaiToken = artifacts.require("DaiToken");
const DappToken = artifacts.require("DappToken");
const TokenFarm = artifacts.require("TokenFarm");

require("chai")
  .use(require("chai-as-promised"))
  .should();

const tokens = (n) => {
  return web3.utils.toWei(n, "ether");
};

contract("TokenFarm", ([owner, investor]) => {
  let daiToken, dappToken, tokenFarm;

  before(async () => {
    daiToken = await DaiToken.new();
    dappToken = await DappToken.new();
    tokenFarm = await TokenFarm.new(daiToken.address, dappToken.address);

    //Transfer all Dapp tokens to farm (1 million)
    await dappToken.transfer(tokenFarm.address, tokens("1000000"));

    //Send tokens to investor
    await daiToken.transfer(investor, tokens("100"), { from: owner });
  });

  describe("Mock DAI deployment", async () => {
    it("has a name", async () => {
      const name = await daiToken.name();
      assert.equal(name, "Mock DAI Token");
    });
  });

  describe("Dapp Token deployment", async () => {
    it("has a name", async () => {
      const name = await dappToken.name();
      assert.equal(name, "DApp Token");
    });
  });

  describe("Token Farm deployment", async () => {
    it("has a name", async () => {
      const name = await tokenFarm.name();
      assert.equal(name, "DApp Token Farm");
    });
  });

  describe("contract has tokens", async () => {
    it("has a name", async () => {
      const balance = await dappToken.balanceOf(tokenFarm.address);
      assert.equal(balance.toString(), tokens("1000000"));
    });
  });
});
