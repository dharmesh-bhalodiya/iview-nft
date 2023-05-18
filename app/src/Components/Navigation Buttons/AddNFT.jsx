import { Box, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AddNFT() {
  const btnActiveAddNFT = true;
  let location = useLocation();
  const history = useNavigate();

  const theme = createTheme({
    palette: {
      customColor: {
        main: "#d2d3d4", // Replace with your desired hexadecimal color
      },
    },
  });

  const handleClick = () => {
    history("/nftCreator");
  };

  return (
    <Box display={"flex"} justifyContent={"end"}>
      <ThemeProvider theme={theme}>
        <Button
          variant="outlined"
          href="#contained-buttons"
          color="customColor"
          sx={{ textAlign: "end" }}
          className={
            btnActiveAddNFT && location.pathname === "/nftCreator"
              ? "btnActive"
              : "btnNotActive"
          }
          onClick={handleClick}
        >
          Add NFT
        </Button>
      </ThemeProvider>
    </Box>
  );
}

export default AddNFT;
