
const hre = require("hardhat");

async function main() {
  
  const NFT_ADDRESS = process.env.NFT_ADDRESS;
  const COIN_ADDRESS = process.env.COIN_ADDRESS;
  
  const NFT = await hre.ethers.getContractAt("iViewNFT", NFT_ADDRESS);
  const Coin = await hre.ethers.getContractAt("iViewCoin", COIN_ADDRESS);

  const sellerAddr = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  let seller = await hre.ethers.getSigner(sellerAddr);
  const buyerAddr = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
  let buyer = await hre.ethers.getSigner(buyerAddr);
  const tokenId = 0;
  

  // seller section
  const nftBalance = await NFT.balanceOf(seller.address);
  console.log(
    `NFT Balance of seller : ${nftBalance}`
  );

  const sellerCoinBalance1 = await Coin.balanceOf(seller.address);
  console.log(
    `Seller Coin Balance Before : ${sellerCoinBalance1}`
  );

  
  const nftSaleCheck1 = await NFT.getNFTSale(tokenId);
  if(!nftSaleCheck1){
    console.log(
      `NFT with ID : ${tokenId} is available for Buy? : ${nftSaleCheck1}`
    );
    await NFT.enableNFTSale(tokenId);
    const nftSaleCheck2 = await NFT.getNFTSale(tokenId);
    console.log(
      `NFT with ID : ${tokenId} is available for Buy? : ${nftSaleCheck2}`
    );
  }
  else{
    console.log(
      `NFT with ID : ${tokenId} is available for Buy? : ${nftSaleCheck1}`
    );
  }


  // started buyer section
  const buyerBalance = await NFT.connect(buyer).balanceOf(buyer.address);
  console.log(
    `Buyer NFT Balance : ${buyerBalance}`
  );

  const buyerCoinBalance = await Coin.connect(buyer).balanceOf(buyer.address);
  console.log(
    `Buyer Coin Balance : ${buyerCoinBalance}`
  );


  const nftPrice = await NFT.connect(buyer).getNFTPrice(tokenId);
  console.log(
    `NFT Cost : ${nftPrice}`
  );

  await Coin.connect(buyer).approve(NFT_ADDRESS, nftPrice);

  const contractAllowance = await NFT.connect(buyer).GetCoinAllowance();
  console.log(
    `NFT Contract Coin Allowance by Buyer : ${contractAllowance}`
  );


  await NFT.connect(buyer).buyNFT(tokenId);


  const nftBal = await NFT.GetContractCoinBalance();
  console.log(
    `NFT Contract Coin Balance : ${nftBal}`
  );

  const sellerCoinBalance2 = await Coin.balanceOf(seller.address);
  console.log(
    `Seller Coin Balance After : ${sellerCoinBalance2}`
  );

  const buyerBalance1 = await NFT.connect(buyer).balanceOf(buyer.address);
  console.log(
    `Buyer NFT Balance : ${buyerBalance1}`
  );

 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
