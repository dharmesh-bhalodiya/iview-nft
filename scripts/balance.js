
const hre = require("hardhat");

async function main() {
  
  const [deployer] = await hre.ethers.getSigners();

  console.log("Checking  balance of the account:", deployer.address);

  const COIN_ADDRESS = process.env.COIN_ADDRESS;

  const Coin = await hre.ethers.getContractAt("iViewCoin", COIN_ADDRESS);
  const coinBalance = await Coin.balanceOf(deployer.address);

  console.log(
    `iViewCoin coin Balance to ${hre.ethers.utils.formatUnits(coinBalance)}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
