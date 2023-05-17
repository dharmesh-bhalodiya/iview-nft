
const hre = require("hardhat");

async function main() {

  const COIN_ADDRESS = process.env.COIN_ADDRESS;

  console.log("Checking  balance of the contract account:", COIN_ADDRESS);

  const Coin = await hre.ethers.getContractAt("iViewCoin", COIN_ADDRESS);
  const coinBalance = await Coin.balanceOf(COIN_ADDRESS);

  console.log(
    `Contract iViewCoin Balance is ${hre.ethers.utils.formatUnits(coinBalance)}`
  );

  const balance0ETH = await hre.ethers.provider.getBalance(COIN_ADDRESS);

  console.log(
    `Contract ETH Balance is ${hre.ethers.utils.formatUnits(balance0ETH)}`
  );

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
