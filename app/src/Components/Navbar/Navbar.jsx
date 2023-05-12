import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import logo from "../../Assets/navbar-logo.png";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const history = useNavigate();
  const address = useSelector((state) => state.walletAddress.walletAddress);
  console.log("add", address);
  const walletAddress = address.toString();
  // const address = localStorage.getItem("address");
  const formattedAdd =
    walletAddress.substr(0, 4) + "...." + walletAddress.substr(-4);
  console.log(walletAddress);

  const handleClick = () => {
    history("/");
  };

  return (
    <Container maxWidth="xl">
      <Toolbar
        disableGutters
        sx={{ marginTop: "1rem", justifyContent: "space-between" }}
      >
        <img
          src={logo}
          alt=""
          style={{ height: "70px", cursor: "pointer" }}
          onClick={handleClick}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 0,
          }}
        >
          <i className="fa fa-wallet"></i>
          <Typography sx={{ paddingLeft: "8px" }}>{formattedAdd}</Typography>
        </Box>
      </Toolbar>
    </Container>
  );
}
export default Navbar;
