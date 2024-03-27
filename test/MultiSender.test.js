const { ethers } = require("hardhat");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("MultiSender contract", function() {
  async function deployMultiSenderFixture() {
    const [ signer, acc1, acc2, acc3 ] = await ethers.getSigners();
    const contract = await ethers.deployContract("MultiSender");
    return { contract, signer, acc1, acc2, acc3 };
  }
  describe("Deployment", function() {
    it("Shoud be deployed on a address", async function() {
      const { contract } = await loadFixture(deployMultiSenderFixture);
      expect(await contract.getAddress()).to.not.be.null;
      expect(await contract.getAddress()).to.be.properAddress;
    });
  });
  describe("Transactions", function() {
    it("Sending the correct transaction should complete without an error", async function() {
      const { contract, acc1, acc2 } = await loadFixture(deployMultiSenderFixture);
      await expect(contract.multiSend(100000, [acc1, acc2], {value: 1000000})).to.not.be.reverted;
    });
    it("Sending the correct transaction should emit Transfer events", async function() {
      const { contract, signer, acc1, acc2 } = await loadFixture(deployMultiSenderFixture);
      await expect(contract.multiSend(100000, [acc1, acc2], {value: 1000000})).to.emit(contract, "Transfer").withArgs(signer, acc1, 100000);
      await expect(contract.multiSend(100000, [acc1, acc2], {value: 1000000})).to.emit(contract, "Transfer").withArgs(signer, acc2, 100000);
    });
    it("Sending the correct transaction should decrease/increase the balance of accounts", async function() {
      const { contract, signer, acc1, acc2 } = await loadFixture(deployMultiSenderFixture);
      await expect(contract.multiSend(100000, [acc1, acc2], {value: 1000000})).to.changeEtherBalance(signer, "-200000");
      await expect(contract.multiSend(100000, [acc1, acc2], {value: 1000000})).to.changeEtherBalance(acc1, "100000");
      await expect(contract.multiSend(100000, [acc1, acc2], {value: 1000000})).to.changeEtherBalance(acc2, "100000");
    });
    it("Should revert with the right error if if not enough funds were sent", async function() {
      const { contract, acc1, acc2 } = await loadFixture(deployMultiSenderFixture);
      await expect(contract.multiSend(100000, [acc1, acc2], {value: 1000})).to.be.revertedWith("Not enough funds");
    });
    it("Should be possible to send ethers from any account", async function() {
      const { contract, signer, acc1, acc2, acc3 } = await loadFixture(deployMultiSenderFixture);
      await expect(contract.connect(acc1).multiSend(100000, [acc2, acc3], {value: 1000000})).to.not.be.reverted;
      await expect(contract.connect(acc2).multiSend(100000, [signer, acc3], {value: 1000000})).to.not.be.reverted;
    });
  });
});