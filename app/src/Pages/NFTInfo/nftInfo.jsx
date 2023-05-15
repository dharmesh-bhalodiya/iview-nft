import React from "react";
import Background from "../../Components/Background/Background";
import { useSelector } from "react-redux";
import styles from "../../Components/NFT/NftGallery.module.css";
import { Grid } from "@mui/material";
import "./nftInfo.css";
import NavButtons from "../../Components/Navigation Buttons/NavButtons";

function NftInfo() {
  const nft = useSelector((state) => state.nftDetail.nftDetail);
  return (
    <div>
      {console.log(nft)}
      <Background />
      <NavButtons />
      <Grid container spacing={3} className="nft-info">
        <Grid item xs={6} className="left">
          <h3>{nft.title}</h3>
          <div className={styles.symbol_container}>
            <p>{nft.symbol}</p>

            {nft.verified === "verified" ? (
              <img
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/2048px-Twitter_Verified_Badge.svg.png"
                }
                width="20px"
                height="20px"
                alt=""
              />
            ) : null}
          </div>
          <div className={styles.contract_container}>
            <p className={styles.contract_container}>{nft.contract}</p>
            <img
              src={
                "https://etherscan.io/images/brandassets/etherscan-logo-circle.svg"
              }
              width="15px"
              height="15px"
              alt=""
              className={styles.etherium_logo}
            />
          </div>
          <p>{nft.description}</p>
        </Grid>
        <Grid item xs={6} className="right">
          {nft.format === "mp4" ? (
            <video src={nft.media} controls className="nft-img">
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={nft.media} alt="" className="nft-img"></img>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default NftInfo;
