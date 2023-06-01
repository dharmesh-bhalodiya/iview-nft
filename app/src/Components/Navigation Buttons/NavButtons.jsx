import * as React from "react";
import Box from "@mui/material/Box";
import { Container, Tab } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import "./NavButtons.css";
import { useState, useEffect } from "react";
import OwnedNFT from "../../Pages/MyNFT/OwnedNFT";
import MintNFTAccess from "./Mint NFT/MintNFTAccess";
import NftCreator from "../AddNFT/NFTCreator";
import ExploreNFT from "../../Pages/ExploreNFT/ExploreNFT";

export default function NavButtons() {
  const location = useLocation();
  const history = useNavigate();

  const [value, setValue] = useState("1");
  const { id } = useParams();

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [permission, setPermission] = useState(false);

  const theme = createTheme({
    palette: {
      customColor: {
        main: "#d2d3d4", // Replace with your desired hexadecimal color
      },
    },
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (newValue === "1") {
      history("/Explore");
    } else if (newValue === "2") {
      history("/Explore/MyNFT");
    } else if (newValue === "3") {
      history("/Explore/NFTCreator");
    }
  };

  const openDialogBox = () => {
    setOpen(true);
    setIsButtonDisabled(true);
  };

  useEffect(() => {
    id === "MyNFT" && setValue("2");
  }, [value, id]);

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                textColor="customColor"
              >
                <Tab label="Explore" value="1" />
                <Tab label="My NFT" value="2" />
              </TabList>
            </Box>
            <Box
              sx={{ borderBottom: 1, borderColor: "divider" }}
              display={"flex"}
              justifyContent={"end"}
              marginTop={"-3em"}
            >
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                textColor="customColor"
                style={{ alignItems: "center" }}
              >
                {location.pathname === "/Explore/MyNFT" && !permission ? (
                  <span
                    style={{
                      fontSize: "24px",
                      color: "#d2d3d4",
                      cursor: "pointer",
                    }}
                    onClick={openDialogBox}
                  >
                    <i className="fa fa-info-circle" />
                  </span>
                ) : location.pathname === "/Explore/MyNFT" && permission ? (
                  <Tab label="Mint NFT" value="3" />
                ) : location.pathname === "/Explore/NFTCreator" ? (
                  <Tab label="Mint NFT" value="3" />
                ) : null}
                {open && (
                  <MintNFTAccess
                    open={open}
                    setOpen={setOpen}
                    setIsButtonDisabled={setIsButtonDisabled}
                    setPermission={setPermission}
                  />
                )}
              </TabList>
              {console.log("Permission", permission)}
            </Box>
            <TabPanel value="1">
              <ExploreNFT />
            </TabPanel>
            <TabPanel value="2">
              <OwnedNFT />
            </TabPanel>
            <TabPanel value="3">
              {console.log("Is Button Disable", isButtonDisabled)}
              <NftCreator />
            </TabPanel>
          </TabContext>
        </Box>
      </ThemeProvider>
    </Container>
  );
}
