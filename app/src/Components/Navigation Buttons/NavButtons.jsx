import * as React from "react";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NavButtons() {
  const history = useNavigate();
  const explore = () => {
    history("/Explore");
  };
  const ownedNft = () => {
    history("/Ownednft");
  };
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "fit-content",
          borderRadius: 1,
          bgcolor: "background.paper",
          color: "text.secondary",
          "& svg": {
            m: 1.5,
          },
          "& hr": {
            mx: 0.5,
          },
        }}
      >
        <Button
          variant="outlined"
          href="#contained-buttons"
          color="error"
          onClick={explore}
        >
          Explore
        </Button>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Button
          variant="outlined"
          href="#contained-buttons"
          color="error"
          onClick={ownedNft}
        >
          Owned NFT
        </Button>
      </Box>
    </Container>
  );
}
