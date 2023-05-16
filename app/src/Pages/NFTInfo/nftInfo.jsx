import React from "react";
import Background from "../../Components/Background/Background";
import { useSelector } from "react-redux";
// import styles from "../../Components/NFT/NftGallery.module.css";
import { Container, Grid } from "@mui/material";
import "./nftInfo.css";

function NftInfo() {
  const nft = useSelector((state) => state.walletReducer.nftDetail);
  return (
    <div>
      <Background />
      <Container className="nft-info">
        <Grid
          container
          item
          xs={6}
          className="left"
          flexDirection={"column"}
          justifyContent={"start"}
        >
          <h3>{nft.title}</h3>
          <div className="user-name">
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
          <div className="user-address">
            <p>{nft.contract}</p>
            <img
              src={
                "https://etherscan.io/images/brandassets/etherscan-logo-circle.svg"
              }
              width="15px"
              height="15px"
              alt=""
            />
          </div>
          <p>{nft.description}</p>
        </Grid>
        <Grid container item xs={6} className="right" justifyContent={"end"}>
          {nft.format === "mp4" ? (
            <video src={nft.media} controls className="nft-img">
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={nft.media} alt="" className="nft-img"></img>
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default NftInfo;
