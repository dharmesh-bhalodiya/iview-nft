
const hre = require("hardhat");

async function main() {
  
  const [deployer] = await hre.ethers.getSigners();
  let buyer = "";

  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    if(account.address != deployer.address)
    {
        buyer = account;
        break;
    }
  }

  console.log("Buying account:", buyer.address);

  const COIN_ADDRESS = process.env.COIN_ADDRESS;

  const Coin = await hre.ethers.getContractAt("iViewCoin", COIN_ADDRESS);

  await Coin.approve(buyer.address, hre.ethers.utils.parseEther("10"));

  await Coin.connect(buyer).buyCoin(hre.ethers.utils.parseEther("10"),{
        value: hre.ethers.utils.parseEther("11")
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
