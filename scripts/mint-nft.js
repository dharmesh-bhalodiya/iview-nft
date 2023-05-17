async function main() {
    const NFT_ADDRESS = process.env.NFT_ADDRESS;

    const NFT = await hre.ethers.getContractAt("iViewNFT", NFT_ADDRESS);

    const nftPrice = hre.ethers.utils.parseEther("1");
    const nftURI = "ipfs://QmTJQHdakVxHTRhVAgTVq2cEM9rYdPKXcm4co9E6VZZByP";

    const creatorAdd = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    let creator = await hre.ethers.getSigner(creatorAdd);

    console.log(`NFT Minted started by : ${creatorAdd}`);
    
    // update the IPFS CID to be your metadata CID
    const newNFT = await NFT.connect(creator).mintNFT(nftURI, nftPrice);
    
    const newNFTResponse = await newNFT.wait();
    
    const [newNFTEvent] = newNFTResponse.events;
    const { tokenId } = newNFTEvent.args;

    console.log(`NFT Minted with ID : ${tokenId}`);
    
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });