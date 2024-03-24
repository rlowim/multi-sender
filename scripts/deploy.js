const { ethers } = require("hardhat");

async function main() {
  const [ signer ] = await ethers.getSigners();

  const MultiSenderFactory = await ethers.getContractFactory("MultiSender");
  const multiSender = await MultiSenderFactory.deploy();
  await multiSender.waitForDeployment();

  console.log("Contract address: ", await multiSender.getAddress());
  console.log("Contract signer address: ", signer.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });