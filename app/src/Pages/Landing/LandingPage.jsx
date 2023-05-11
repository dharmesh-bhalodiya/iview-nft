import logo from "../../Assets/logo3.png";
import "./LandingPage.css";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { walletAction } from "../../Components/Reducer/walletAction";
import Background from "../../Components/Background/Background";

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

        <Grid container spacing={3} sx={{ position: "absolute" }}>
          <Grid item xs={3} sx={{ marginLeft: "13rem" }}>
            <Typography
              variant="h3"
              sx={{ paddingLeft: "3rem" }}
              style={{
                fontFamily: "Archive",
                // textTransform: "uppercase",
                // fontWeight: 700,
              }}
            >
              Your gateway to the crypto world.
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ marginLeft: "22rem", paddingLeft: "3rem" }}>
            <Typography
              id="text"
              fontWeight="bold"
              sx={{}}
              style={{
                fontFamily: "Archive",
              }}
            >
              Join the digital revolution and start trading today.
            </Typography>

            <Button
              variant="contained"
              href="#contained-buttons"
              className="btn-bg"
              onClick={() => connectWallet()}
            >
              Connect Wallet
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default LandingPage;
