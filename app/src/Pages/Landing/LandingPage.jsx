import React from "react";
import logo from "../../Assets/Logo22.png";
import "./LandingPage.css";
import { Box, Button, Typography } from "@mui/material";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const history = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-page-desc">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={logo} alt="" className="landing-page-logo" />
          <Typography variant="h3" sx={{ margin: "1rem" }}>
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
            onClick={async () => {
              if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                try {
                  // Request account access if needed
                  await window.ethereum.enable();
                  // Acccounts now exposed
                  history("/Main");
                  return web3;
                } catch (error) {
                  console.error(error);
                }
              }
            }}
          >
            Connect Wallet
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default LandingPage;
