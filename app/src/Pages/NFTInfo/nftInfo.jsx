import React from "react";
import Background from "../../Components/Background/Background";
import { useSelector } from "react-redux";
// import styles from "../../Components/NFT/NftGallery.module.css";
import { Container, Grid } from "@mui/material";
import "./nftInfo.css";
import { useMotionValue, useTransform, motion } from "framer-motion";

function NftInfo() {
  const nft = useSelector((state) => state.walletReducer.nftDetail);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [500, -300], [50, -50]);
  const rotateY = useTransform(x, [-100, 500], [-50, 50]);

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
          <h3 className="nft-text">{nft.title}</h3>
          <div className="user-name nft-text">
            <p>{nft.symbol}</p>

            {nft.verified === "verified" ? (
              <img
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/2048px-Twitter_Verified_Badge.svg.png"
                }
                width="20px"
                height="20px"
                alt=""
                className="symbol"
              />
            ) : null}
          </div>
          <div className="user-address nft-text">
            <p>{nft.contract}</p>
            <img
              src={
                "https://etherscan.io/images/brandassets/etherscan-logo-circle.svg"
              }
              width="15px"
              height="15px"
              alt=""
              className="symbol"
            />
          </div>
          <p>{nft.description}</p>
        </Grid>
        <Grid container item xs={6} className="right" justifyContent={"end"}>
          <motion.div style={{ x, y, rotateX, rotateY, z: 100 }}>
            {nft.format === "mp4" ? (
              <video src={nft.media} controls className="nft-img">
                Your browser does not support the video tag.
              </video>
            ) : (
              <img src={nft.media} alt="" className="nft-img"></img>
            )}
          </motion.div>
        </Grid>
      </Container>
    </div>
  );
}

export default NftInfo;
