import { Box, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MintNFTAccess from "./MintNFTAccess";

function AddNFT() {
  const btnActiveAddNFT = true;
  let location = useLocation();
  const history = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [open, setOpen] = useState(false);

  const theme = createTheme({
    palette: {
      customColor: {
        main: "#d2d3d4 !important", // Replace with your desired hexadecimal color
      },
    },
  });

  const handleClick = () => {
    history("/nftCreator");
  };

  const openDialogBox = () => {
    setOpen(true);
  };

  return (
    <Box display={"flex"} justifyContent={"end"}>
      <ThemeProvider theme={theme}>
        {location.pathname === "/nftCreator" ? (
          ""
        ) : (
          <Button
            style={{ fontSize: "24px", color: "#d2d3d4" }}
            onClick={openDialogBox}
          >
            <i className="fa fa-info-circle"></i>
          </Button>
        )}
        {open && (
          <MintNFTAccess
            open={open}
            setOpen={setOpen}
            setIsButtonDisabled={setIsButtonDisabled}
          />
        )}
        <Button
          variant="outlined"
          color="customColor"
          sx={{ textAlign: "end" }}
          className={
            btnActiveAddNFT && location.pathname === "/nftCreator"
              ? "btnActive"
              : "btnNotActive"
          }
          onClick={handleClick}
          disabled={isButtonDisabled}
        >
          <i style={{ fontSize: "12px" }} className="fa">
            &#xf067;
          </i>
          &nbsp; Mint NFT
        </Button>
      </ThemeProvider>
    </Box>
  );
}

export default AddNFT;

// import { Box, Button, Tab } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

// import React from "react";
// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import MintNFTAccess from "./MintNFTAccess";
// import TabContext from "@mui/lab/TabContext/TabContext";
// import TabList from "@mui/lab/TabList/TabList";
// import TabPanel from "@mui/lab/TabPanel/TabPanel";
// import NftCreator from "../../AddNFT/NFTCreator";

// function AddNFT({ isButtonDisabled }) {
//   const btnActiveAddNFT = true;
//   let location = useLocation();
//   const history = useNavigate();
//   // const [isButtonDisabled, setIsButtonDisabled] = useState(true);
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState("1");

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const theme = createTheme({
//     palette: {
//       customColor: {
//         main: "#d2d3d4 !important", // Replace with your desired hexadecimal color
//       },
//     },
//   });

//   const handleClick = () => {
//     history("/Explore/nftCreator");
//   };

//   const openDialogBox = () => {
//     setOpen(true);
//   };

//   // console.log("diable", isButtonDisabled);

//   return (
//     <ThemeProvider theme={theme}>
//       <Box
//         sx={{ width: "100%", typography: "body1", marginTop: "-4em" }}
//         display={"flex"}
//         justifyContent={"end"}
//       >
//         <TabContext value={value}>
//           <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//             <TabList
//               onChange={handleChange}
//               aria-label="lab API tabs example"
//               textColor="customColor"
//             >
//               <Tab
//                 color="customColor"
//                 sx={{ textAlign: "end" }}
//                 disabled={false}
//                 onClick={handleClick}
//                 value="1"
//                 label="Mint NFT"
//               ></Tab>
//             </TabList>
//           </Box>
//           <TabPanel value="1">
//             <NftCreator />
//           </TabPanel>
//         </TabContext>
//       </Box>
//     </ThemeProvider>
//   );
// }

// export default AddNFT;
