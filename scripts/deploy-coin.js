
const hre = require("hardhat");

async function main() {
  
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying Coin contract with the account:", deployer.address);

  const Coin = await hre.ethers.getContractFactory("iViewCoin");
  const coin = await Coin.deploy();

  await coin.deployed();

  console.log(
    `iViewCoin deployed to ${coin.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
