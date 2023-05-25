import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import NFTCard from "../../Components/NFT/NFTGallery";

function OwnedNFT() {
  const [ownedNfts, setOwnedNfts] = useState([]);

  const fetchOwnedNfts = async () => {
    const result = await axios.get("http://localhost:3004/ownednfts");
    setOwnedNfts(result.data);
    // console.log(result.data);
  };

  useEffect(() => {
    fetchOwnedNfts();
  }, []);

  return (
    <>
      <NFTCard nfts={ownedNfts} />
    </>
  );
}

export default OwnedNFT;
