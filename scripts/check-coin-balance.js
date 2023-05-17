
const hre = require("hardhat");

async function main() {

  const COIN_ADDRESS = process.env.COIN_ADDRESS;

  const buyerAdd = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
  let buyer = await hre.ethers.getSigner(buyerAdd);

  console.log("Checking  balance of account:", buyer.address);

  const Coin = await hre.ethers.getContractAt("iViewCoin", COIN_ADDRESS);
  const coinBalance = await Coin.balanceOf(buyer.address);

  console.log(
    `Account iViewCoin Balance is ${hre.ethers.utils.formatUnits(coinBalance)}`
  );

  const balance0ETH = await hre.ethers.provider.getBalance(buyer.address);

  console.log(
    `Account ETH Balance is ${hre.ethers.utils.formatUnits(balance0ETH)}`
  );

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
