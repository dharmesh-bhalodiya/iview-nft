import * as React from "react";
import Box from "@mui/material/Box";
import { Container, Tab } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import "./NavButtons.css";
import NFTCard from "../../Components/NFT/NFTGallery";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import OwnedNFT from "../../Pages/MyNFT/OwnedNFT";
import MintNFTAccess from "./Mint NFT/MintNFTAccess";
import NftCreator from "../AddNFT/NFTCreator";
import ClipLoader from "react-spinners/ClipLoader";

export default function NavButtons() {
  const location = useLocation();
  const history = useNavigate();
  const [loading, setloading] = useState(false);

  const theme = createTheme({
    palette: {
      customColor: {
        main: "#d2d3d4", // Replace with your desired hexadecimal color
      },
    },
  });
  const override = {
    position: "sticky",
    left: "50%",
    top: "70%",
    right: "0",
    bottom: "0",
    margin: "auto",
  };

  const [value, setValue] = useState("1");
  const [allNfts, setAllNfts] = useState([]);
  const { id } = useParams();

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [open, setOpen] = useState(false);

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

  const fetchAllNfts = async () => {
    const result = await axios.get("http://localhost:3005/nfts");
    setAllNfts(result.data);
    // console.log(result.data);
  };

  useEffect(() => {
    fetchAllNfts();
  }, []);

  const openDialogBox = () => {
    setOpen(true);
    setIsButtonDisabled(true);
  };

  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 1000);
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
              >
                {location.pathname === "/Explore/MyNFT" ? (
                  <Tab
                    style={{ fontSize: "24px", color: "#d2d3d4" }}
                    onClick={openDialogBox}
                    label={<i className="fa fa-info-circle"></i>}
                    value="3"
                  ></Tab>
                ) : location.pathname === "/Explore/NFTCreator" ? (
                  <Tab
                    style={{ fontSize: "24px", color: "#d2d3d4" }}
                    onClick={openDialogBox}
                    label={<i className="fa fa-info-circle"></i>}
                    value="3"
                    disabled
                  ></Tab>
                ) : (
                  ""
                )}
                {open && (
                  <MintNFTAccess
                    open={open}
                    setOpen={setOpen}
                    setIsButtonDisabled={setIsButtonDisabled}
                  />
                )}
              </TabList>
            </Box>
            <TabPanel value="1">
              <NFTCard nfts={allNfts} />
            </TabPanel>
            <TabPanel value="2">
              <OwnedNFT />
            </TabPanel>
            <TabPanel value="3">
              {console.log(isButtonDisabled)}
              {!isButtonDisabled && <NftCreator />}
            </TabPanel>
          </TabContext>
          <ClipLoader
            color={"#264653"}
            loading={loading}
            cssOverride={override}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Box>
      </ThemeProvider>
    </Container>
  );
}
