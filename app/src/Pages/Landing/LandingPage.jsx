import logo from "../../Assets/landingpage-logo.png";
import logo1 from "../../Assets/iTROVE_Logo.png";
import "./LandingPage.css";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { walletAction } from "../../Components/Reducer/walletAction";
import Background from "../../Components/Background/Background";
import { motion } from "framer-motion";
import { useEffect } from "react";

function LandingPage() {
  const dispatch = useDispatch();
  const history = useNavigate();

  const requestAccount = async () => {
    if (window.ethereum && window.ethereum.isConnected()) {
      console.log("detected");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        await dispatch(walletAction(accounts[0]));
        console.log(accounts[0]);

        history("/Explore");
      } catch (error) {
        console.log("error connecting....");
      }
    } else {
      console.log("Meta mask not detected");
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
    <>
      <Background />
      <img src={logo1} alt="" className="landingpagelogo" />

      <div className="landing-page">
        <img src={logo} alt="" className="landing-page-logo" />

        <Grid
          container
          spacing={3}
          sx={{ position: "absolute" }}
          className="grid-container"
        >
          <Grid item xs={3} className="left">
            <Typography
              variant="h3"
              style={{
                fontFamily: "Archive",
                transform: "",
              }}
              className="glitch"
            >
              <motion.div
                animate={{ x: 800 }}
                transition={{ delay: 1 }}
                className="left-text"
              >
                Your gateway to the crypto world
              </motion.div>
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              // marginLeft: "22rem",
              // paddingLeft: "3rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "start",
            }}
            className="right"
          >
            <Typography
              id="text"
              fontWeight="bold"
              sx={{}}
              style={{
                fontFamily: "Archive",
              }}
              className="glitch"
            >
              <motion.div
                animate={{ x: -800 }}
                transition={{ delay: 1.5 }}
                className="right-text"
              >
                Join the digital revolution and start trading today
              </motion.div>
            </Typography>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          className="btn landingbtn"
          onClick={() => connectWallet()}
        >
          Connect Wallet
        </Button>
      </div>
    </>
  );
}

export default LandingPage;
