import logo from "../../Assets/landingpage-logo.png";
import "./LandingPage.css";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { walletAction } from "../../Components/Reducer/walletAction";
import Background from "../../Components/Background/Background";
import { motion } from "framer-motion";

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
        dispatch(walletAction(accounts[0]));
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
      <div className="landing-page">
        <img src={logo} alt="" className="landing-page-logo" />

        <Grid
          container
          spacing={3}
          sx={{ position: "absolute" }}
          className="grid-container"
        >
          <Grid
            item
            xs={3}
            sx={{
              marginLeft: "13rem",
            }}
            className="left"
          >
            <Typography
              variant="h3"
              sx={{ paddingLeft: "3rem" }}
              style={{
                fontFamily: "Archive",
                transform: "",
              }}
              className="glitch"
            >
              <motion.div animate={{ x: 600 }} transition={{ delay: 1 }}>
                Your gateway to the crypto world
              </motion.div>
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              marginLeft: "22rem",
              paddingLeft: "3rem",
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
              <motion.div animate={{ x: -600 }} transition={{ delay: 1.5 }}>
                Join the digital revolution and start trading today.
              </motion.div>
            </Typography>

            <motion.div animate={{ x: -600 }} transition={{ delay: 2 }}>
              <Button
                variant="contained"
                href="#contained-buttons"
                sx={{ position: "relative", top: "10%" }}
                className="btn landingbtn"
                onClick={() => connectWallet()}
              >
                Connect Wallet
              </Button>
            </motion.div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default LandingPage;
