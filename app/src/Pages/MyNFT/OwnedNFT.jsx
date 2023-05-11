import React from "react";
import NFTCard from "../../Components/NFT/NFTGallery";
import { Box, Typography } from "@mui/material";
import NavButtons from "../../Components/Navigation Buttons/NavButtons";
import Background from "../../Components/Background/Background";

function OwnedNFT() {
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
        "https://nft-cdn.alchemy.com/eth-mainnet/68e88751dbebf9d5fbd20ebbe5781db5",
      title: "Cool Oliens #117",
      symbol: "COOLIEN",
      contract: "0x2F218d79673DEBBf713b3a531CB2Aa2948c25b2a",
      description: "An NFT collection for royal Oliens holders.",
      verified: "verified",
    },
    {
      media:
        "https://nft-cdn.alchemy.com/eth-mainnet/f065afd5cf799f4ab1252111f8f3d38c",
      title: "Cool Oliens #117",
      symbol: "COOLIEN",
      contract: "0x2F218d79673DEBBf713b3a531CB2Aa2948c25b2a",
      description: "An NFT collection for royal Oliens holders.",
      verified: "verified",
    },
    {
      media:
        "https://nft-cdn.alchemy.com/eth-mainnet/8de383bc7c157a4a2651ff0bceee18c6",
      title: "Cool Oliens #117",
      symbol: "COOLIEN",
      contract: "0x2F218d79673DEBBf713b3a531CB2Aa2948c25b2a",
      description: "An NFT collection for royal Oliens holders.",
      verified: "verified",
    },
  ];

  return (
    <>
      <Background />
      <Box sx={{ minHeight: "100vh" }}>
        <Typography variant="h3" sx={{ margin: "1rem", textAlign: "center" }}>
          Owned NFT's
        </Typography>
        <NavButtons />
        <NFTCard nfts={nfts} />
      </Box>
    </>
  );
}

export default OwnedNFT;