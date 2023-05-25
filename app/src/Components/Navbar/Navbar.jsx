import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import logo from "../../Assets/iTROVE_Logo.png";
import "./Navbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import DialogBox from "./Buy More/DialogBox";

function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const history = useNavigate();

  const address = useSelector((state) => state?.walletReducer?.walletAddress);

  if (location.pathname === "/") {
    // Don't render the Navbar on the landing page
    return null;
  }

  const walletAddress = address?.toString();
  const formattedAdd =
    walletAddress?.substr(0, 4) + "...." + walletAddress?.substr(-4);

  const handleClick = () => {
    history("/");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDisconnect = () => {
    try {
      console.log("handle Disconnect");
      window.ethereum.disconnect();
      // Refresh the page or update the state to reflect the disconnection
    } catch (error) {
      // Handle the error if disconnecting fails
    }
  };

  return (
    <div>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ marginTop: "1em", justifyContent: "space-between" }}
        >
          <img
            src={logo}
            alt=""
            style={{ height: "3em", cursor: "pointer" }}
            onClick={handleClick}
          />

          <Box
            sx={{ display: { xs: "none", md: "flex", alignItems: "center" } }}
          >
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
              onClick={handleClickOpen}
            >
              Buy More
            </Button>
            {open && <DialogBox open={open} setOpen={setOpen} />}
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              sx={{
                alignItems: "center",
                flexGrow: 0,
              }}
              className="walletAddress"
              onClick={handleDisconnect}
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
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "end",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "flex", md: "none" },
              }}
            >
              <MenuItem
                sx={{
                  flexDirection: { xs: "column" },
                  alignItems: "start",
                }}
                onClick={handleCloseNavMenu}
              >
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
                  onClick={handleClickOpen}
                >
                  Buy More
                </Button>
                {open && <DialogBox open={open} setOpen={setOpen} />}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </div>
  );
}
export default Navbar;
