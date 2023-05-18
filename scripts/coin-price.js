
const hre = require("hardhat");

async function main() {
  
  const [deployer] = await hre.ethers.getSigners();

  
  const COIN_ADDRESS = process.env.COIN_ADDRESS;

  const Coin = await hre.ethers.getContractAt("iViewCoin", COIN_ADDRESS);
  const price = await Coin.getPrice();

  console.log(
    `iViewCoin current price : ${price} ETH`
  );


  // await Coin.updatePrice(hre.ethers.utils.parseEther("2"));

  // const price1 = await Coin.getPrice();

  // console.log(
  //   `iViewCoin current price : ${price1} ETH`
  // );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
