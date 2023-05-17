
const hre = require("hardhat");

async function main() {
  
  const buyerAdd = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
  const amountToBuy = 10;
  let buyer = await hre.ethers.getSigner(buyerAdd);
  
  console.log("Buying account:", buyer.address);

  const COIN_ADDRESS = process.env.COIN_ADDRESS;

  const Coin = await hre.ethers.getContractAt("iViewCoin", COIN_ADDRESS);

  const currentPrice = await Coin.getPrice();

  await Coin.connect(buyer).buyCoin(hre.ethers.utils.parseEther(String(amountToBuy)),{
        value: hre.ethers.utils.parseEther(String(currentPrice * amountToBuy))
  });

  const coinBalance = await Coin.connect(buyer).balanceOf(buyer.address);

  console.log(
    `iViewCoin coin Balance is ${hre.ethers.utils.formatUnits(coinBalance)}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
