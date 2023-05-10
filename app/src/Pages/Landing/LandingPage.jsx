import logo from "../../Assets/logo.png";
import "./LandingPage.css";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { walletAction } from "../../Components/Reducer/walletAction";

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
              onClick={() => connectWallet()}
            >
              Connect Wallet
            </Button>
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
