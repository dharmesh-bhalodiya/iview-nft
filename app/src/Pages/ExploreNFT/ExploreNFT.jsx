import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import NFTCard from "../../Components/NFT/NFTGallery";

function ExploreNFT() {
  const [allNfts, setAllNfts] = useState([]);

  const fetchAllNfts = async () => {
    const result = await axios.get("http://localhost:3005/nfts");
    setAllNfts(result.data);
    // console.log(result.data);
  };

  useEffect(() => {
    fetchAllNfts();
  }, []);

  return (
    <div>
      <NFTCard nfts={allNfts} />
    </div>
  );
}

export default ExploreNFT;
