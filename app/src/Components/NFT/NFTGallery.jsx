import React from "react";
import styles from "../NFT/NftGallery.module.css";
import { useMotionValue, useTransform, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { nftInfo } from "../../Components/Reducer/walletAction";
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function NFTGallery({ nfts }) {
  const [scrollBar, setscrollBar] = useState(100);
  const [loading, setloading] = useState(false);
  const [NFTDisplay, setNFTDisplay] = useState(4);

  const override = {
    position: "sticky",
    left: "50%",
    top: "70%",
    right: "0",
    bottom: "0",
    margin: "auto",
  };

  useEffect(() => {
    function displayProduct() {
      if (window.scrollY >= scrollBar) {
        setloading(true);
        setTimeout(() => {
          setNFTDisplay(NFTDisplay + 4);
          setloading(false);
        }, 1000);
        setscrollBar(
          document.documentElement.getBoundingClientRect().height - 500
        );
      }
    }

    window.addEventListener("scroll", displayProduct);

    return () => {
      window.removeEventListener("scroll", displayProduct);
    };
  }, [NFTDisplay, scrollBar]);

  return (
    <div className={styles.nft_gallery_page}>
      <div className={styles.nft_gallery}>
        <div className={styles.nfts_display}>
          {nfts.map((nft, index) =>
            index < NFTDisplay ? <NftCard key={index} nft={nft} /> : ""
          )}
        </div>
        <ClipLoader
          color={"#264653"}
          loading={loading}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}
function NftCard({ nft }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 500], [30, -30]);
  const rotateY = useTransform(x, [100, -500], [-30, 30]);
  const dispatch = useDispatch();
  const history = useNavigate();

  const location = useLocation();

  const handleNftInfo = () => {
    dispatch(nftInfo(nft));
    history(`${location.pathname}/nftInfo/${nft.ownedBy}`);
    // console.log("current loaction", location);
  };

  return (
    <motion.div
      style={{ x, y, rotateX, rotateY, z: 100 }}
      whileHover={{ scale: 1.1 }}
      drag
      dragElastic={0.18}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      whileTap={{ cursor: "grabbing" }}
      className={styles.card_container}
      onClick={handleNftInfo}
    >
      <div className={styles.image_container}>
        {nft.format === "mp4" ? (
          <video src={nft.media} controls>
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={nft.media} alt=""></img>
        )}
      </div>
      <div className={styles.info_container}>
        <div className={styles.title_container}>
          <h3>{nft.ownedBy}</h3>
        </div>
        <hr />
        <div className={styles.symbol_contract_container}>
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
            <p className={styles.contract_container}>
              {nft.contract?.slice(0, 6)}...
              {nft.contract?.slice(38)}
            </p>
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
        </div>

        <div className={styles.description_container}>
          <p>{nft.description}</p>
        </div>
      </div>
    </motion.div>
  );
}
