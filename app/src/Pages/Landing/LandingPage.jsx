import React, { useState } from "react";
import logo from "../../Assets/logo.png";
import "./LandingPage.css";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

function LandingPage() {
  const history = useNavigate();
  const [walletAddress, setWalletAddress] = useState("");

  const requestAccount = async () => {
    if (window.ethereum) {
      console.log("detected");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
        // localStorage.setItem("address", accounts[0]);
        history("/Main");
      } catch (error) {
        console.log("error connecting....");
      }
    } else {
      alert("Meta mask not detected");
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(provider);
    }
  };

  return (
    <div className="landing-page">
      <Grid container>
        <Grid item xs={6} sx={{}}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h3" sx={{ paddingLeft: "3rem" }}>
              Your gateway to the crypto world.
            </Typography>
            <Typography
              fontWeight="bold"
              sx={{ margin: "1rem", color: "#808080" }}
            >
              Join the digital revolution and start trading today.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              href="#contained-buttons"
              className="btn-bg"
              onClick={connectWallet}
            >
              Connect Wallet
            </Button>
            <h4>{walletAddress}</h4>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ textAlign: "center" }}>
            <img src={logo} alt="" className="landing-page-logo" />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default LandingPage;
