import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { ethers } from "ethers";
import NavButtons from "../../Components/Navigation Buttons/NavButtons";
import Background from "../../Components/Background/Background";
import { useSelector } from "react-redux";
function Header() {
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(provider);
    }
  }, []);

  const address = useSelector((state) => state?.walletAddress);
  console.log(address);

  return (
    <div>
      <Background />

      <Box sx={{ minHeight: "100vh" }}>
        <Typography
          variant="h3"
          sx={{
            margin: "1rem",
            marginBottom: "2rem",
            textAlign: "center",
            fontFamily: "Archive",
          }}
        >
          Welcome to <span style={{ color: "#b92526" }}>iTROVE</span>
        </Typography>
        <NavButtons />
      </Box>
    </div>
  );
}

export default Header;
