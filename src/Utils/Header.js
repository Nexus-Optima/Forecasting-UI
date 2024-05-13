import React from "react";
import { Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Header = () => {
  const handleHomeClick = () => {
    window.location.href = `${process.env.REACT_APP_HOME}/dashboard`;
  };

  return (
    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Box sx={{ padding: "0 10px" }} onClick={handleHomeClick}>
          <HomeIcon sx={{ fontSize: 60 }} />
        </Box>
        <Box sx={{ padding: "0 10px" }}>
          <NotificationsIcon sx={{ fontSize: 60 }} />
        </Box>
      </Box>
    </>
  );
};

export default Header;
