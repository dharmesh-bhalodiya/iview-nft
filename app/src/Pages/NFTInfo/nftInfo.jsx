import React from "react";
import Background from "../../Components/Background/Background";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import "./nftInfo.css";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { useState } from "react";
import axios from "axios";

function NftInfo() {
  const nft = useSelector((state) => state.walletReducer.nftDetail);
  const [isChecked, setIsChecked] = useState();
  const { page } = useParams();

  const handleClick = async (e) => {
    setIsChecked(e.target.checked);
    const res = await axios.put(`http://localhost:3004/ownednfts/${nft.id}`, {
      media: nft.media,
      ownedBy: nft.ownedBy,
      hashNumber: nft.hashNumber,
      symbol: nft.symbol,
      contract: nft.contract,
      description: nft.description,
      verified: nft.verified,
      current_price: nft.currentPrice,
      availableForSale: e.target.checked,
    });

    const nftContract = res.data.contract;
    handleAllNftAvailable(nftContract, res.data);
    console.log(res.data);
  };

  const handleAllNftAvailable = async (nftContract, res) => {
    const responseData = await axios.get("http://localhost:3005/nfts");

    const dataToUpdate = responseData.data.find(
      (item) => item.contract === nftContract
    );

    const response = await axios.put(
      `http://localhost:3005/nfts/${dataToUpdate.id}`,
      {
        media: nft.media,
        ownedBy: nft.ownedBy,
        hashNumber: nft.hashNumber,
        symbol: nft.symbol,
        contract: nft.contract,
        description: nft.description,
        verified: nft.verified,
        current_price: nft.currentPrice,
        availableForSale: res.availableForSale,
      }
    );
    console.log(response.data);
  };

  const handleBuyNft = () => {
    console.log("Clicked!!!");
  };

  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    "& .MuiSwitch-track": {
      borderRadius: 22 / 2,
      "&:before, &:after": {
        content: '""',
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: 16,
        height: 16,
      },
      "&:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      "&:after": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "none",
      width: 16,
      height: 16,
      margin: 2,
    },
  }));

  return (
    <>
      <Background />
      <Container className="nft-info">
        <Grid
          container
          item
          xs={12}
          className="left"
          flexDirection={"column"}
          alignItems={"start"}
        >
          <Box className="user-name nft-text">
            <Typography variant="h4">{nft.symbol}</Typography>

            {nft.verified === "verified" ? (
              <img
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/2048px-Twitter_Verified_Badge.svg.png"
                }
                width="40px"
                height="40px"
                alt=""
                className="symbol"
              />
            ) : null}
          </Box>
          <Typography className="nft-text">{nft.hashNumber}</Typography>
          <Typography className="nft-text">
            Owned by{" "}
            <Link
              style={{
                color: "#179cf0",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              {nft.ownedBy}
            </Link>
          </Typography>
          <Typography className="nft-text">
            Current Price <b>{nft.current_price}</b>
          </Typography>
          <Box className="user-address nft-text">
            <Typography>{nft.contract}</Typography>
            <img
              src={
                "https://etherscan.io/images/brandassets/etherscan-logo-circle.svg"
              }
              width="15px"
              height="15px"
              alt=""
              className="symbol"
            />
          </Box>
          <Typography>{nft.description}</Typography>
          {!!page ? (
            <FormControlLabel
              control={
                <Android12Switch
                  onChange={(e) => {
                    handleClick(e);
                  }}
                  defaultChecked={nft.availableForSale}
                  checked={isChecked}
                />
              }
              label="Available for Sale"
            />
          ) : (
            <Button
              sx={{
                paddingLeft: "8px",
                fontWeight: "bold",
              }}
              className="btn buymore-btn"
              disabled={!nft.availableForSale}
              onClick={handleBuyNft}
            >
              Buy Now
            </Button>
          )}
        </Grid>
        <Grid container item xs={12} className="right" justifyContent={"end"}>
          <>
            {nft.format === "mp4" ? (
              <video src={nft.media} controls className="nft-img">
                Your browser does not support the video tag.
              </video>
            ) : (
              <img src={nft.media} alt="" className="nft-img" />
            )}
          </>
        </Grid>
      </Container>
    </>
  );
}

export default NftInfo;
