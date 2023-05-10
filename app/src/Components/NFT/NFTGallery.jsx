import React from "react";
import styles from "../NFT/NftGallery.module.css";

export default function NFTGallery({ nfts }) {
  return (
    <div className={styles.nft_gallery_page}>
      <div className={styles.nft_gallery}>
        <div className={styles.nfts_display}>
          {nfts?.length ? (
            nfts.map((nft, index) => {
              return <NftCard key={index} nft={nft} />;
            })
          ) : (
            <div className={styles.loading_box}>
              <p>No NFTs found for the selected address</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
function NftCard({ nft }) {
  return (
    <div className={styles.card_container}>
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
          <h3>{nft.title}</h3>
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
            />
          </div>
        </div>

        <div className={styles.description_container}>
          <p>{nft.description}</p>
        </div>
      </div>
    </div>
  );
}
