async function main() {
    const COIN_ADDRESS = process.env.COIN_ADDRESS;

    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying NFT contract with the account:", deployer.address);

    const NFT = await hre.ethers.getContractFactory("iViewNFT");
  
    const nft = await NFT.deploy(COIN_ADDRESS);
  
    await nft.deployed();
  
    console.log("NFT deployed to:", nft.address);
   
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });