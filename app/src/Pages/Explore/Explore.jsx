import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { ethers } from "ethers";
import NFTCard from "../../Components/NFT/NFTGallery";
import NavButtons from "../../Components/Navigation Buttons/NavButtons";
import Background from "../../Components/Background/Background";

function Explore() {
  const nfts = [
    {
      media:
        "https://nft-cdn.alchemy.com/eth-mainnet/45ec950099b8af25a8fef5bae54d0dd6",
      title: "Cool Oliens #117",
      symbol: "COOLIEN",
      contract: "0x2F218d79673DEBBf713b3a531CB2Aa2948c25b2a",
      description: "An NFT collection for royal Oliens holders.",
      verified: "verified",
    },
    {
      media:
        "https://nft-cdn.alchemy.com/eth-mainnet/856176a70abd08f061024a0d40ca9da0",
      title: "Cool Oliens #117",
      symbol: "COOLIEN",
      contract: "0x2F218d79673DEBBf713b3a531CB2Aa2948c25b2a",
      description: "An NFT collection for royal Oliens holders.",
      verified: "verified",
    },
    {
      media:
        "https://nft-cdn.alchemy.com/eth-mainnet/e3669112e8c5cfb4cf7638702283dca0",
      title: "Cool Oliens #117",
      symbol: "COOLIEN",
      contract: "0x2F218d79673DEBBf713b3a531CB2Aa2948c25b2a",
      description: "An NFT collection for royal Oliens holders.",
      verified: "verified",
    },
    {
      media:
        "https://nft-cdn.alchemy.com/eth-mainnet/68e88751dbebf9d5fbd20ebbe5781db5",
      title: "Cool Oliens #117",
      symbol: "COOLIEN",
      contract: "0x2F218d79673DEBBf713b3a531CB2Aa2948c25b2a",
      description: "An NFT collection for royal Oliens holders.",
      verified: "verified",
    },

    {
      media:
        "https://nft-cdn.alchemy.com/eth-mainnet/68e88751dbebf9d5fbd20ebbe5781db5",
      title: "Cool Oliens #117",
      symbol: "COOLIEN",
      contract: "0x2F218d79673DEBBf713b3a531CB2Aa2948c25b2a",
      description: "An NFT collection for royal Oliens holders.",
      verified: "verified",
    },
    {
      media:
        "https://nft-cdn.alchemy.com/eth-mainnet/45ec950099b8af25a8fef5bae54d0dd6",
      title: "Cool Oliens #117",
      symbol: "COOLIEN",
      contract: "0x2F218d79673DEBBf713b3a531CB2Aa2948c25b2a",
      description: "An NFT collection for royal Oliens holders.",
      verified: "verified",
    },
    {
      media:
        "https://nft-cdn.alchemy.com/eth-mainnet/856176a70abd08f061024a0d40ca9da0",
      title: "Cool Oliens #117",
      symbol: "COOLIEN",
      contract: "0x2F218d79673DEBBf713b3a531CB2Aa2948c25b2a",
      description: "An NFT collection for royal Oliens holders.",
      verified: "verified",
    },
    {
      media:
        "https://nft-cdn.alchemy.com/eth-mainnet/e3669112e8c5cfb4cf7638702283dca0",
      title: "Cool Oliens #117",
      symbol: "COOLIEN",
      contract: "0x2F218d79673DEBBf713b3a531CB2Aa2948c25b2a",
      description: "An NFT collection for royal Oliens holders.",
      verified: "verified",
    },
  ];
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(provider);
    }
  }, []);
  return (
    <>
      <Background />
      <Box sx={{ minHeight: "100vh" }}>
        <Typography variant="h3" sx={{ margin: "1rem", textAlign: "center" }}>
          Welcome to iViewART.
        </Typography>
        <NavButtons />
        <NFTCard nfts={nfts} />
      </Box>
    </>
  );
}

export default Explore;
