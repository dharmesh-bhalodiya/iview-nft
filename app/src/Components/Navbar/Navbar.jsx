import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import logo from "../../Assets/iTROVE_Logo.png";
import "./Navbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

function Navbar() {
  const location = useLocation();

  const history = useNavigate();

  const address = useSelector((state) => state?.walletReducer?.walletAddress);

  if (location.pathname === "/") {
    // Don't render the Navbar on the landing page
    return null;
  }

  // console.log("add", address);
  const walletAddress = address?.toString();
  // const address = localStorage.getItem("address");
  const formattedAdd =
    walletAddress?.substr(0, 4) + "...." + walletAddress?.substr(-4);
  // console.log(walletAddress);

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

        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              paddingRight: "8px",
              fontWeight: "bold",
            }}
          >
            <i className="fa fa-wallet"></i>
            &nbsp;&nbsp;IVC Balance : 0
          </Typography>
          <Button
            sx={{
              paddingLeft: "8px",
              fontWeight: "bold",
            }}
            className="btn buymore-btn"
          >
            Buy More
          </Button>
        </div>

        <Button
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 0,
          }}
          className="walletAddress"
        >
          <span className="">
            <Typography
              sx={{
                fontWeight: "bold",
              }}
            >
              {formattedAdd}
            </Typography>
          </span>
        </Button>
      </Toolbar>
    </Container>
  );
}
export default Navbar;
