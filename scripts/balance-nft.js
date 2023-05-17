
const hre = require("hardhat");

async function main() {
  
  const NFT_ADDRESS = process.env.NFT_ADDRESS;
  const COIN_ADDRESS = process.env.COIN_ADDRESS;
  
  const NFT = await hre.ethers.getContractAt("iViewNFT", NFT_ADDRESS);
  const Coin = await hre.ethers.getContractAt("iViewCoin", COIN_ADDRESS);

  const nftBal1 = await NFT.GetContractCoinBalance();
  console.log(
    `NFT Contract Coin Balance : ${hre.ethers.utils.formatUnits(nftBal1)}`
  );
 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
