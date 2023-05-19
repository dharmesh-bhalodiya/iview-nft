import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Button, Container } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./NavButtons.css";
import AddNFT from "./AddNFT";

export default function NavButtons() {
  const history = useNavigate();

  const btnActiveExplore = true;
  const btnActiveOwned = true;
  let location = useLocation();

  const explore = () => {
    history("/Explore");
  };
  const ownedNft = () => {
    history("/Ownednft");
  };

  const theme = createTheme({
    palette: {
      customColor: {
        main: "#d2d3d4", // Replace with your desired hexadecimal color
      },
    },
  });

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "fit-content",
            borderRadius: 1,
            marginBottom: "2rem",

            // bgcolor: "background.paper",
            color: "text.secondary",
            "& svg": {
              m: 1.5,
            },
            "& hr": {
              mx: 0.5,
            },
          }}
        >
          <ThemeProvider theme={theme}>
            <Button
              variant="outlined"
              href="#contained-buttons"
              color="customColor"
              onClick={() => {
                explore();
              }}
              className={
                btnActiveExplore && location.pathname === "/Explore"
                  ? "btnActive"
                  : "btnNotActive"
              }
            >
              Explore
            </Button>
          </ThemeProvider>
          <Divider orientation="vertical" variant="middle" flexItem />
          <ThemeProvider theme={theme}>
            <Button
              variant="outlined"
              href="#contained-buttons"
              color="customColor"
              onClick={() => {
                ownedNft();
              }}
              className={
                btnActiveOwned && location.pathname === "/Ownednft"
                  ? "btnActive"
                  : "btnNotActive"
              }
            >
              My NFT
            </Button>
          </ThemeProvider>
        </Box>
        <Box sx={{ marginTop: "-2em" }}>
          {location.pathname === "/Ownednft" && <AddNFT />}
        </Box>
      </Box>
    </Container>
  );
}
